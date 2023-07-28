import { info } from '@actions/core'
import { Api } from '@octokit/plugin-rest-endpoint-methods/dist-types/types'
import { PullRequestInformation } from './types'

const stringify = (input?: unknown) => JSON.stringify(input)

export const extractAssigneeCount = (pullRequest: PullRequestInformation) => async (octokit: Api) => {
  const { owner, repo, number: pull_number } = pullRequest

  const requestedReviewsCount = await getRequestedReviewsCount(owner, repo, pull_number, octokit)

  return requestedReviewsCount
}

const getRequestedReviewsCount = async (
  owner: string,
  repo: string,
  pull_number: number,
  octokit: Api,
): Promise<number> => {
  info(`Requesting current reviewers in PR #${pull_number} via the GitHub API.`)
  const {
    data: { teams, users },
    status,
  } = await octokit.rest.pulls.listRequestedReviewers({
    owner,
    repo,
    pull_number,
  })

  info(`[${status}] Found assigned reviewer teams:`)
  const teamNames = teams.map(team => team.name)
  info(stringify(teamNames))
  info(`[${status}] Found assigned reviewer users:`)
  const userNames = users.map(user => user.login)
  info(stringify(userNames))

  return teams.length + users.length
}
