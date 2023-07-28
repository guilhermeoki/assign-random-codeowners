"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    setup: function() {
        return setup;
    },
    extractPullRequestPayload: function() {
        return extractPullRequestPayload;
    },
    extractChangedFiles: function() {
        return extractChangedFiles;
    },
    fetchTeamMembers: function() {
        return fetchTeamMembers;
    },
    selectReviewers: function() {
        return selectReviewers;
    },
    assignReviewers: function() {
        return assignReviewers;
    },
    run: function() {
        return run;
    }
});
const _core = require("@actions/core");
const _github = require("@actions/github");
const _reviewers = require("./reviewers");
const _codeowners = require("./codeowners");
const stringify = (input)=>JSON.stringify(input);
const setup = ()=>{
    const configParams = getConfigParams();
    const token = getGitHubToken();
    const octokit = (0, _github.getOctokit)(token);
    return {
        ...configParams,
        octokit
    };
};
const getConfigParams = ()=>{
    const inputReviewers = (0, _core.getInput)('reviewers-to-assign', {
        required: true
    });
    const reviewers = Number.parseInt(inputReviewers);
    const assignFromChanges = (0, _core.getInput)('assign-from-changed-files').toLowerCase() === 'true';
    const assignIndividuals = (0, _core.getInput)('assign-individuals-from-teams').toLowerCase() === 'true';
    return {
        reviewers,
        assignFromChanges,
        assignIndividuals
    };
};
const getGitHubToken = ()=>{
    const token = process.env['GITHUB_TOKEN'];
    if (!token) {
        (0, _core.error)(`Did not find a GITHUB_TOKEN in the environment.`);
        process.exit(1);
    }
    return token;
};
const extractPullRequestPayload = (context)=>{
    const { payload: { pull_request: payload }, repo: { repo, owner } } = context;
    const author = payload?.['user']?.['login'];
    const pullRequest = payload && repo && owner ? {
        number: payload.number,
        repo,
        owner,
        author
    } : undefined;
    if (!pullRequest) {
        (0, _core.error)("Pull Request payload was not found. Is the action triggered by the 'pull-request' event?");
        process.exit(1);
    }
    return pullRequest;
};
const extractChangedFiles = (assignFromChanges, pullRequest)=>async (octokit)=>{
        if (!assignFromChanges) return [];
        const { owner, repo, number: pull_number } = pullRequest;
        (0, _core.info)(`Requesting files changed in PR #${pull_number} via the GitHub API.`);
        const { data: changedFiles, status } = await octokit.rest.pulls.listFiles({
            owner,
            repo,
            pull_number
        });
        const filenames = changedFiles.map((file)=>file.filename);
        (0, _core.info)(`[${status}] Found changed PR files:`);
        (0, _core.info)(stringify(filenames));
        return filenames;
    };
const randomize = (input)=>input?.sort(()=>Math.random() - 0.5);
const isTeam = (selected)=>selected ? /@.*\//.test(selected) : false;
const extractTeamSlug = (selected)=>selected.replace(/@.*\//, '');
const fetchTeamMembers = (organisation, codeowners)=>async (octokit)=>{
        // Ensure that we don't have duplicate IDs in order to fetch as little from GitHub as possible.
        const allTeamOwners = Array.from(new Set(codeowners.flatMap((entry)=>entry.owners).filter(isTeam)));
        const allTeams = await Promise.all(allTeamOwners.map(async (team)=>{
            (0, _core.info)(`Requesting team members for team '${organisation}/${team}' via the GitHub API.`);
            // Fetch members from each team since there's currently no way
            // to fetch all teams with members from a GitHub organisation.
            const { data: teamMembers, status } = await octokit.rest.teams.listMembersInOrg({
                org: organisation,
                team_slug: extractTeamSlug(team)
            });
            if (!teamMembers) {
                (0, _core.error)(`Failed to fetch team members for team '${organisation}/${team}'.`);
                process.exit(1);
            }
            const teamMemberIds = teamMembers.map((member)=>member.login);
            (0, _core.info)(`[${status}] Found team members:`);
            (0, _core.info)(stringify(teamMemberIds));
            return {
                [team]: teamMemberIds
            };
        }));
        const joined = allTeams.reduce((acc, team)=>({
                ...acc,
                ...team
            }), {});
        return joined;
    };
const selectReviewers = async (changedFiles, codeowners, teamMembers, options)=>{
    const { assignedReviewers, reviewers, assignIndividuals, author } = options;
    const selectedTeams = new Set();
    const selectedUsers = new Set();
    const assignees = ()=>selectedTeams.size + selectedUsers.size + assignedReviewers;
    const stack = JSON.parse(JSON.stringify(codeowners))//Poor man's deep clone.
    ;
    const teams = teamMembers && JSON.parse(JSON.stringify(teamMembers));
    const globalCodeowners = stack.find((owner)=>owner.pattern === '*')?.owners;
    (0, _core.info)(`Found global CODEOWNERS: ${stringify(globalCodeowners)}.`);
    while(assignees() < reviewers){
        const randomFile = randomize(changedFiles)?.[0];
        (0, _core.debug)(`Selected random file: ${randomFile}`);
        const randomFileOwner = randomize(stack.find((owner)=>owner.pattern === randomFile)?.owners)?.shift();
        (0, _core.debug)(`Selected random file owner: ${randomFileOwner}`);
        const randomGlobalCodeowners = randomize(globalCodeowners);
        const selected = randomFileOwner ?? randomGlobalCodeowners?.[0];
        if (!isTeam(selected)) randomGlobalCodeowners?.shift();
        (0, _core.debug)(`Selected: ${selected}`);
        if (author && selected === author) {
            (0, _core.debug)(`'${selected}' is the author '${author}'. Skipping.`);
            continue;
        }
        if (!selected) {
            (0, _core.debug)(`Did not find an assignee.`);
            break;
        }
        const teamSlug = extractTeamSlug(selected);
        (0, _core.debug)(`Extracted team slug: ${teamSlug}.`);
        if (isTeam(selected) && assignIndividuals) {
            (0, _core.debug)(`Assigning individuals from team: ${teamSlug}.`);
            (0, _core.debug)(`Possible teams are: ${stringify(teams)}.`);
            // If the set of all teams are exhausted we give up assigning teams.
            if (Object.keys(teams).length === 0) {
                (0, _core.debug)('Teams to assign is empty. Exiting.');
                break;
            }
            const randomTeamMember = randomize(teams?.[selected])?.shift();
            if (!randomTeamMember) {
                // Remove the team from the stack of all team members have been extracted.
                (0, _core.debug)(`Did not find random team member. Removing team ${teamSlug} from possible teams to assign.`);
                delete teams?.[selected];
                randomGlobalCodeowners?.shift();
                continue;
            }
            (0, _core.debug)(`Found random team member: ${randomTeamMember}.`);
            if (randomTeamMember === author) {
                (0, _core.debug)(`'${randomTeamMember}' is the author '${author}'. Skipping.`);
                continue;
            }
            (0, _core.info)(`Assigning '${randomTeamMember}' from assignee team '${teamSlug}'.`);
            selectedUsers.add(randomTeamMember);
        } else if (isTeam(selected)) {
            (0, _core.info)(`Assigning '${selected}' as an assignee team.`);
            selectedTeams.add(teamSlug);
        } else {
            (0, _core.info)(`Assigning '${selected}' as an assignee user.`);
            selectedUsers.add(selected);
        }
    }
    return {
        count: selectedTeams.size + selectedUsers.size,
        teams: Array.from(selectedTeams),
        users: Array.from(selectedUsers)
    };
};
const assignReviewers = (pullRequest, reviewers)=>async (octokit)=>{
        const { repo, owner, number } = pullRequest;
        const { teams, users, count } = reviewers;
        if (count === 0) {
            (0, _core.info)('No reviewers were selected. Skipping requesting reviewers.');
            return reviewers;
        }
        (0, _core.info)(`Requesting ${count} reviewers via the GitHub API.`);
        const { data: assigned, status } = await octokit.rest.pulls.requestReviewers({
            owner,
            repo,
            pull_number: number,
            team_reviewers: teams,
            reviewers: users
        });
        const requestedReviewers = assigned.requested_reviewers?.map((user)=>user.login);
        const requestedTeams = assigned.requested_teams?.map((team)=>team.name);
        if (requestedReviewers && requestedTeams) {
            const requested = {
                count: requestedReviewers.length + requestedTeams.length,
                teams: requestedTeams,
                users: requestedReviewers
            };
            (0, _core.info)(`[${status}] Assigned reviewers: `);
            (0, _core.info)(stringify(requested));
            return requested;
        }
        return reviewers;
    };
const isCITestRun = process.env['CI_TEST'];
const run = async ()=>{
    if (isCITestRun) return;
    try {
        const { reviewers, assignFromChanges, assignIndividuals, octokit } = setup();
        const pullRequest = extractPullRequestPayload(_github.context);
        const codeowners = await (0, _codeowners.getCodeowners)();
        const assignedReviewers = await (0, _reviewers.extractAssigneeCount)(pullRequest)(octokit);
        if (assignedReviewers > reviewers) {
            (0, _core.info)(`Saw ${assignedReviewers} assigned reviewers - skipping CODEOWNERS assignment.`);
            process.exit(0);
        }
        const teams = assignIndividuals ? await fetchTeamMembers(pullRequest.owner, codeowners)(octokit) : {};
        const selectionOptions = {
            assignedReviewers,
            reviewers,
            assignIndividuals,
            author: pullRequest.author
        };
        const changedFiles = await extractChangedFiles(assignFromChanges, pullRequest)(octokit);
        (0, _core.info)('Selecting reviewers for assignment.');
        const selected = await selectReviewers(changedFiles, codeowners, teams, selectionOptions);
        (0, _core.info)(`Selected additional reviewers for assignment: ${stringify(selected)}`);
        const assigned = await assignReviewers(pullRequest, selected)(octokit);
        (0, _core.setOutput)('assigned-codeowners', stringify(assigned));
        (0, _core.info)(`Assigned reviewers: ${stringify(assigned)}`);
    } catch (e) {
        const asError = e;
        (0, _core.error)(asError);
        if (asError.stack) {
            (0, _core.error)('Stacktrace:');
            (0, _core.error)(asError.stack);
        }
        (0, _core.setFailed)(asError);
    }
};
run();
