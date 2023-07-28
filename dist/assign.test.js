/* eslint-disable @typescript-eslint/no-var-requires */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _assign = require("./assign");
const _core = /*#__PURE__*/ _interop_require_wildcard(require("@actions/core"));
const _reviewers = require("./reviewers");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
beforeEach(()=>{
    process.env['INPUT_REVIEWERS-TO-ASSIGN'] = '2';
    process.env['GITHUB_TOKEN'] = 'bla';
    process.env['INPUT_ASSIGN-FROM-CHANGED-FILES'] = 'false';
    process.env['ASSIGN-INDIVIDUALS-FROM-TEAMS'] = 'false';
});
describe('Input handling', ()=>{
    beforeEach(()=>{
        jest.spyOn(process, 'exit').mockImplementation();
    });
    afterEach(()=>{
        jest.restoreAllMocks();
    });
    it('does not throw if required inputs are present', async ()=>{
        const infoMessages = [];
        jest.spyOn(process.stdout, 'write').mockImplementation((s)=>{
            infoMessages.push(s);
            return true;
        });
        process.env['INPUT_ASSIGN-FROM-CHANGED-FILES'] = 'false';
        (0, _assign.setup)();
    });
    it('can parse inputs if present', async ()=>{
        process.env['INPUT_ASSIGN-FROM-CHANGED-FILES'] = 'false';
        process.env['INPUT_ASSIGN-INDIVIDUALS-FROM-TEAMS'] = 'false';
        const result = (0, _assign.setup)();
        expect(result).not.toBeNull();
        expect(result.assignFromChanges).toEqual(false);
        expect(result.assignIndividuals).toEqual(false);
        expect(result.reviewers).toEqual(2);
        expect(result.octokit).not.toBeNull();
    });
    it('throws if GitHub token is not present', async ()=>{
        const infoMessages = [];
        jest.spyOn(process.stdout, 'write').mockImplementation((s)=>{
            infoMessages.push(s);
            return true;
        });
        delete process.env['GITHUB_TOKEN'];
        expect(()=>(0, _assign.setup)()).toThrow();
        expect(infoMessages.some((e)=>/::error::.*GITHUB_TOKEN/.test(e))).toBeTruthy();
    });
    it("throws if 'reviewers-to-assign' is not present", async ()=>{
        const infoMessages = [];
        jest.spyOn(process.stdout, 'write').mockImplementation((s)=>{
            infoMessages.push(s);
            return true;
        });
        delete process.env['INPUT_REVIEWERS-TO-ASSIGN'];
        expect(()=>(0, _assign.setup)()).toThrow();
    });
    it("does not throw if 'assign-from-changed-files' is not present", async ()=>{
        const infoMessages = [];
        jest.spyOn(process.stdout, 'write').mockImplementation((s)=>{
            infoMessages.push(s);
            return true;
        });
        delete process.env['INPUT_ASSIGN-FROM-CHANGED-FILES'];
        expect(()=>(0, _assign.setup)()).not.toThrow();
    });
    it("does not throw if 'assign-individuals-from-teams' is not present", async ()=>{
        const infoMessages = [];
        jest.spyOn(process.stdout, 'write').mockImplementation((s)=>{
            infoMessages.push(s);
            return true;
        });
        delete process.env['INPUT_ASSIGN-INDIVIDUALS-FROM-TEAMS'];
        expect(()=>(0, _assign.setup)()).not.toThrow();
    });
});
describe('Payload handling', ()=>{
    let exitMock;
    beforeEach(()=>{
        exitMock = jest.spyOn(process, 'exit').mockImplementation();
    });
    afterEach(()=>{
        jest.restoreAllMocks();
    });
    it('can extract information from pull request payloads', ()=>{
        const context = {
            payload: {
                pull_request: {
                    number: 1,
                    html_url: '',
                    body: '',
                    user: {
                        login: 'username'
                    }
                }
            },
            eventName: 'pull-request',
            sha: '1',
            ref: '1',
            workflow: 'workflow',
            action: 'action',
            actor: 'actor',
            job: 'job',
            runNumber: 1,
            runId: 1,
            apiUrl: 'https://some-url.com',
            serverUrl: 'https://some-url.com',
            graphqlUrl: 'https://some-url.com',
            issue: {
                owner: 'owner',
                repo: 'repo',
                number: 1
            },
            repo: {
                owner: 'owner',
                repo: 'repo'
            }
        };
        const result = (0, _assign.extractPullRequestPayload)(context);
        expect(result).toEqual({
            number: 1,
            owner: 'owner',
            repo: 'repo',
            author: 'username'
        });
    });
    it('exits with exit code `1` for missing pull request payloads', ()=>{
        const context = {
            payload: {
                issue: {
                    number: 1
                }
            },
            eventName: 'pull-request',
            sha: '1',
            ref: '1',
            workflow: 'workflow',
            action: 'action',
            actor: 'actor',
            job: 'job',
            runNumber: 1,
            runId: 1,
            apiUrl: 'https://some-url.com',
            serverUrl: 'https://some-url.com',
            graphqlUrl: 'https://some-url.com',
            issue: {
                owner: 'owner',
                repo: 'repo',
                number: 1
            },
            repo: {
                owner: 'owner',
                repo: 'repo'
            }
        };
        const infoMessages = [];
        jest.spyOn(process.stdout, 'write').mockImplementation((s)=>{
            infoMessages.push(s);
            return true;
        });
        (0, _assign.extractPullRequestPayload)(context);
        expect(infoMessages.some((e)=>/Pull Request payload was not found/.test(e))).toBeTruthy();
        expect(exitMock).toHaveBeenCalledWith(1);
    });
    it('exits with exit code `1` for missing repository information in payloads', ()=>{
        const context = {
            payload: {
                pull_request: {
                    number: 1
                }
            },
            repo: {
                owner: undefined,
                repo: undefined
            }
        };
        const infoMessages = [];
        jest.spyOn(process.stdout, 'write').mockImplementation((s)=>{
            infoMessages.push(s);
            return true;
        });
        (0, _assign.extractPullRequestPayload)(context);
        expect(infoMessages.some((e)=>/Pull Request payload was not found/.test(e))).toBeTruthy();
        expect(exitMock).toHaveBeenCalledWith(1);
    });
});
describe("Calling GitHub's API", ()=>{
    it('can extract assignee count from pull request payloads', async ()=>{
        const teams = [
            {
                name: 'team1'
            },
            {
                name: 'team2'
            }
        ];
        const users = [
            {
                login: 'login1'
            },
            {
                login: 'login2'
            }
        ];
        const infoMock = jest.spyOn(_core, 'info').mockImplementation();
        const mockedRequest = jest.fn(()=>({
                data: {
                    teams: teams,
                    users: users
                }
            }));
        const mockedOctokit = {
            rest: {
                pulls: {
                    listRequestedReviewers: mockedRequest
                }
            }
        };
        const pullRequest = {
            number: 1,
            owner: 'owner',
            repo: 'repo'
        };
        const result = await (0, _reviewers.extractAssigneeCount)(pullRequest)(mockedOctokit);
        expect(result).toEqual(teams.length + users.length);
        expect(infoMock).toHaveBeenCalledWith(JSON.stringify(teams.map((t)=>t.name)));
        expect(infoMock).toHaveBeenCalled();
        expect(infoMock).toHaveBeenCalledWith(JSON.stringify(users.map((t)=>t.login)));
    });
    it('handles missing data in pull request payloads', async ()=>{
        const mockedOctokit = {
            rest: {
                pulls: {
                    listRequestedReviewers: jest.fn(()=>{
                        throw Error('💥');
                    })
                }
            }
        };
        const pullRequest = {
            number: 1,
            owner: 'owner',
            repo: 'repo'
        };
        expect(()=>(0, _reviewers.extractAssigneeCount)(pullRequest)(mockedOctokit)).rejects.toBeTruthy();
    });
    it('can extract changed files if not set', async ()=>{
        const files = [
            {
                filename: 'file1'
            },
            {
                filename: 'file2'
            }
        ];
        const filenames = files.map((f)=>f.filename);
        const mockedRequest = jest.fn(()=>({
                data: files
            }));
        const mockedOctokit = {
            rest: {
                pulls: {
                    listFiles: mockedRequest
                }
            }
        };
        const pullRequest = {
            owner: 'owner',
            repo: 'repo',
            number: 1
        };
        const infoMock = jest.spyOn(_core, 'info').mockImplementation();
        const result = await (0, _assign.extractChangedFiles)(false, pullRequest)(mockedOctokit);
        expect(result).toEqual([]);
        expect(infoMock).not.toHaveBeenCalledWith(filenames);
    });
    it('handles missing data in PR file payloads', async ()=>{
        const mockedOctokit = {
            rest: {
                pulls: {
                    listFiles: async ()=>({
                            undefined
                        })
                }
            }
        };
        const pullRequest = {
            number: 1,
            owner: 'owner',
            repo: 'repo'
        };
        const result = await (0, _assign.extractChangedFiles)(false, pullRequest)(mockedOctokit);
        expect(result).toEqual([]);
    });
    it('can extract changed files if set', async ()=>{
        const files = [
            {
                filename: 'file1'
            },
            {
                filename: 'file2'
            }
        ];
        const filenames = files.map((f)=>f.filename);
        const mockedRequest = jest.fn(()=>({
                data: files
            }));
        const mockedOctokit = {
            rest: {
                pulls: {
                    listFiles: mockedRequest
                }
            }
        };
        const pullRequest = {
            owner: 'owner',
            repo: 'repo',
            number: 1
        };
        const infoMock = jest.spyOn(_core, 'info').mockImplementation();
        const result = await (0, _assign.extractChangedFiles)(true, pullRequest)(mockedOctokit);
        expect(result).toEqual(filenames);
        expect(infoMock).toHaveBeenCalledWith(JSON.stringify(filenames));
    });
    it('can assign reviewers', async ()=>{
        const users = [
            {
                login: 'login1'
            },
            {
                login: 'login2'
            }
        ];
        const userLogins = users.map((u)=>u.login);
        const teams = [
            {
                name: 'name1'
            },
            {
                name: 'name2'
            }
        ];
        const teamNames = teams.map((t)=>t.name);
        const expected = {
            count: userLogins.length + teamNames.length,
            teams: teamNames,
            users: userLogins
        };
        const assignees = {
            count: userLogins.length + teamNames.length,
            teams: teamNames,
            users: userLogins
        };
        const mockedRequest = jest.fn(()=>({
                data: {
                    requested_reviewers: users,
                    requested_teams: teams
                }
            }));
        const mockedOctokit = {
            rest: {
                pulls: {
                    requestReviewers: mockedRequest
                }
            }
        };
        const pullRequest = {
            owner: 'owner',
            repo: 'repo',
            number: 1
        };
        const infoMock = jest.spyOn(_core, 'info').mockImplementation();
        const result = await (0, _assign.assignReviewers)(pullRequest, assignees)(mockedOctokit);
        expect(result).toEqual(expected);
        expect(infoMock).toHaveBeenCalledWith(JSON.stringify(expected));
    });
    it('can extract team members from team slug', async ()=>{
        const teams = {
            team1: [
                {
                    login: 'team1Member1'
                },
                {
                    login: 'team1Member2'
                }
            ],
            team2: [
                {
                    login: 'team2Member1'
                },
                {
                    login: 'team2Member2'
                }
            ]
        };
        const mockedOctokit = {
            rest: {
                teams: {
                    listMembersInOrg: (options)=>({
                            data: teams[options.team_slug]
                        })
                }
            }
        };
        const result = await (0, _assign.fetchTeamMembers)('', [
            {
                owners: [
                    '@org/team1',
                    '@org/team2'
                ],
                pattern: '*'
            }
        ])(mockedOctokit);
        const expected = {
            '@org/team1': [
                'team1Member1',
                'team1Member2'
            ],
            '@org/team2': [
                'team2Member1',
                'team2Member2'
            ]
        };
        expect(result).not.toBeNull();
        expect(result).toEqual(expected);
        expect(result['@org/team1']).toEqual(expected['@org/team1']);
        expect(result['@org/team2']).toEqual(expected['@org/team2']);
    });
    it('handles missing data in team member payloads', async ()=>{
        const mockedOctokit = {
            rest: {
                teams: {
                    listMembersInOrg: ()=>({
                            data: []
                        })
                }
            }
        };
        const result = await (0, _assign.fetchTeamMembers)('', [])(mockedOctokit);
        expect(result).toEqual({});
    });
});
describe('Reviewer selection', ()=>{
    const maxAssignees = 4;
    const filesChanged = [
        'filename1',
        'filename2'
    ];
    const orgTeams = [
        '@org/team1',
        '@org/team2',
        '@org/team3'
    ];
    const individuals = [
        'login1',
        'login2'
    ];
    const reviewers = [
        ...orgTeams,
        ...individuals
    ];
    const merged = filesChanged.map((filename)=>({
            owners: reviewers,
            pattern: filename
        }));
    const codeowners = [
        {
            owners: [
                'globalOwner1',
                'globalOwner2'
            ],
            pattern: '*'
        },
        ...merged
    ];
    it('does not select more than specified reviewers', async ()=>{
        const assigned = 4;
        const expected = {
            count: 0,
            teams: [],
            users: []
        };
        const options = {
            assignedReviewers: assigned,
            assignIndividuals: false,
            reviewers: maxAssignees
        };
        const result = await (0, _assign.selectReviewers)(filesChanged, codeowners, {}, options);
        expect(result).not.toBeNull();
        expect(result).toEqual(expected);
    });
    it('randomly selects from changed files', async ()=>{
        const assigned = 0;
        const options = {
            assignedReviewers: assigned,
            assignIndividuals: false,
            reviewers: maxAssignees
        };
        const result = await (0, _assign.selectReviewers)(filesChanged, codeowners, {}, options);
        expect(result).not.toBeNull();
        expect(result.count).toEqual(4);
    });
    it('randomly selects from changed files until empty', async ()=>{
        const filesChanged = [
            'filename1'
        ];
        const teamNames = [
            '@org/team1',
            '@org/team2',
            '@org/team3'
        ];
        const codeowners = [
            {
                owners: teamNames,
                pattern: filesChanged[0]
            },
            {
                pattern: '*',
                owners: [
                    'globalOwner'
                ]
            }
        ];
        const assigned = 0;
        const options = {
            assignedReviewers: assigned,
            assignIndividuals: false,
            reviewers: maxAssignees
        };
        const result = await (0, _assign.selectReviewers)(filesChanged, codeowners, {}, options);
        expect(result).not.toBeNull();
        expect(result.count).toEqual(4);
        expect(result.teams.every((name)=>teamNames.map((t)=>t.replace(/@.*\//, '')).includes(name))).toBeTruthy();
        expect(result.users).toEqual([
            'globalOwner'
        ]);
    });
    it('randomly selects from global CODEOWNERS', async ()=>{
        const owners = [
            'globalOwner1',
            'globalOwner2',
            'globalOwner3'
        ];
        const filesChanged = [];
        const codeowners = [
            {
                pattern: '*',
                owners: owners
            }
        ];
        const assigned = 0;
        const options = {
            assignedReviewers: assigned,
            assignIndividuals: false,
            reviewers: maxAssignees
        };
        const result = await (0, _assign.selectReviewers)(filesChanged, codeowners, {}, options);
        expect(result).not.toBeNull();
        expect(result.count).toEqual(3);
        expect(result.users.every((name)=>owners.includes(name))).toBeTruthy();
    });
    it('does not select an author from CODEOWNERS', async ()=>{
        const owners = [
            'globalOwner1',
            'globalOwner2',
            'globalOwner3'
        ];
        const filesChanged = [];
        const codeowners = [
            {
                pattern: '*',
                owners: owners
            }
        ];
        const assigned = 0;
        const options = {
            assignedReviewers: assigned,
            assignIndividuals: false,
            reviewers: maxAssignees,
            author: 'globalOwner1'
        };
        const result = await (0, _assign.selectReviewers)(filesChanged, codeowners, {}, options);
        expect(result).not.toBeNull();
        expect(result.count).toEqual(2);
        expect(result.users.every((name)=>name !== options.author)).toBeTruthy();
    });
    it('does not select the author from CODEOWNERS individuals', async ()=>{
        const owners = [
            'globalOwner1',
            'globalOwner2',
            'globalOwner3'
        ];
        const filesChanged = [];
        const codeowners = [
            {
                pattern: '*',
                owners: owners
            }
        ];
        const assigned = 0;
        const options = {
            assignedReviewers: assigned,
            assignIndividuals: true,
            reviewers: maxAssignees,
            author: 'globalOwner1'
        };
        const result = await (0, _assign.selectReviewers)(filesChanged, codeowners, {}, options);
        expect(result).not.toBeNull();
        expect(result.count).toEqual(2);
        expect(result.users.every((name)=>name !== options.author)).toBeTruthy();
    });
    it('does not select authors from CODEOWNERS when owners are teams and is asked to assign individuals', async ()=>{
        const owners = [
            '@pleo-io/cool-team'
        ];
        const filesChanged = [];
        const codeowners = [
            {
                pattern: '*',
                owners: owners
            }
        ];
        const assigned = 0;
        const options = {
            assignedReviewers: assigned,
            assignIndividuals: true,
            reviewers: maxAssignees,
            author: 'globalOwner1'
        };
        const result = await (0, _assign.selectReviewers)(filesChanged, codeowners, {
            '@pleo-io/cool-team': [
                'globalOwner1',
                'globalOwner2',
                'globalOwner3'
            ]
        }, options);
        expect(result).not.toBeNull();
        expect(result.count).toEqual(2);
        expect(result.users.every((name)=>name !== options.author)).toBeTruthy();
    });
    it('does not select individual authors from CODEOWNERS when owners are teams', async ()=>{
        const owners = [
            '@some-org/cool-team'
        ];
        const filesChanged = [];
        const codeowners = [
            {
                pattern: '*',
                owners: owners
            }
        ];
        const assigned = 0;
        const options = {
            assignedReviewers: assigned,
            assignIndividuals: true,
            reviewers: maxAssignees,
            author: '@some-author'
        };
        const result = await (0, _assign.selectReviewers)(filesChanged, codeowners, {
            '@some-org/cool-team': [
                '@some-username'
            ]
        }, options);
        expect(result).not.toBeNull();
        expect(result.count).toEqual(1);
        expect(result.users.every((name)=>name !== options.author)).toBeTruthy();
        expect(result.users[0]).toBe('@some-username');
    });
    it('does not loop infinitely when selecting from global one-person CODEOWNER teams', async ()=>{
        const owners = [
            '@org/team'
        ];
        const filesChanged = [];
        const codeowners = [
            {
                pattern: '*',
                owners: owners
            }
        ];
        const assigned = 0;
        const options = {
            assignedReviewers: assigned,
            assignIndividuals: true,
            reviewers: maxAssignees
        };
        const result = await (0, _assign.selectReviewers)(filesChanged, codeowners, {}, options);
        expect(result).not.toBeNull();
        expect(result.count).toEqual(0);
        expect(result.teams.length).toEqual(0);
        expect(result.users.length).toEqual(0);
    });
    it('handles empty CODEOWNERS', async ()=>{
        const assigned = 0;
        const options = {
            assignedReviewers: assigned,
            assignIndividuals: false,
            reviewers: maxAssignees
        };
        const result = await (0, _assign.selectReviewers)(filesChanged, [], {}, options);
        expect(result).toEqual({
            count: 0,
            teams: [],
            users: []
        });
    });
});
