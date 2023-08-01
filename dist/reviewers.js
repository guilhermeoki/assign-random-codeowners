"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "extractAssigneeCount", {
    enumerable: true,
    get: ()=>extractAssigneeCount
});
const _core = require("@actions/core");
const stringify = (input)=>JSON.stringify(input);
const extractAssigneeCount = (pullRequest)=>async (octokit)=>{
        const { owner , repo , number: pull_number  } = pullRequest;
        const requestedReviewsCount = await getRequestedReviewsCount(owner, repo, pull_number, octokit);
        return requestedReviewsCount;
    };
const getRequestedReviewsCount = async (owner, repo, pull_number, octokit)=>{
    (0, _core.info)(`Requesting current reviewers in PR #${pull_number} via the GitHub API.`);
    const { data: { teams , users  } , status  } = await octokit.rest.pulls.listRequestedReviewers({
        owner,
        repo,
        pull_number
    });
    (0, _core.info)(`[${status}] Found assigned reviewer teams:`);
    const teamNames = teams.map((team)=>team.name);
    (0, _core.info)(stringify(teamNames));
    (0, _core.info)(`[${status}] Found assigned reviewer users:`);
    const userNames = users.map((user)=>user.login);
    (0, _core.info)(stringify(userNames));
    return teams.length + users.length;
};
