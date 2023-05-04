# Assign Random CODEOWNERS Reviewers

A GitHub Action for randomly assigning CODEOWNERS to changes submitted in PRs.

---

It can prove difficult to [set round-robin/random PR reviewer assignment of team members](https://docs.github.com/en/organizations/organizing-members-into-teams/managing-code-review-settings-for-your-team) when a team is assigned as a PR reviewer for every team in an organization with many internal teams. 

This GitHub Action aims to solve this by automatically picking random members of teams assigned as a reviewers on PRs and assign picked team members as reviewers instead.

---

# Usage

## Inputs

| Input                           | Type    | Required | Description                                                                                                                                                                               |
| ------------------------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reviewers-to-assign`           | number  | ✅       | How many _total_ reviewers to assign to a given PR. The action will not assign more reviewers than the number given and takes already assigned reviewers into consideration when running. |
| `assign-from-changed-files`     | boolean | ❌       | Whether to assign reviewers from the files changed in a PR. If a CODEOWNER cannot be found for a file, the action will select randomly from the global CODEOWNERS.                        |
| `assign-individuals-from-teams` | boolean | ❌       | Whether to pick and assign random team members from CODEOWNER teams as reviewers.                                                                                                         |

The action requires a `GITHUB_TOKEN` to be present in the `env` with the required permissions to assign PR reviewers.

## Outputs

| Input                 | Type                                                  | Description                       |
| --------------------- | ----------------------------------------------------- | --------------------------------- |
| `assigned-codeowners` | `{ count: number, teams: string[], users: string[] }` | The reviewers assigned to the PR. |
