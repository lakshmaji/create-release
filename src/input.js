const core = require("@actions/core");
const { context } = require("@actions/github");

/**
 * 
 * @returns 
 *              tagName
 *              owner
 *              repo
 *              releaseName
 *              draft
 *              prerelease
 *              commitish
 *              token
 */
function input() {
  const tagName = core.getInput("tag_name");
  const { owner: currentOwner, repo: currentRepo } = context.repo;
  const owner = core.getInput("owner", { required: false }) || currentOwner;
  const repo = core.getInput("repo", { required: false }) || currentRepo;

  // This removes the 'refs/tags' portion of the string, i.e. from 'refs/tags/v1.10.15' to 'v1.10.15'
  const tag = tagName.replace("refs/tags/", "");

  const releaseName = core
    .getInput("release_name", { required: false })
    .replace("refs/tags/", "");
  const draft = core.getInput("draft", { required: false }) === "true";
  const prerelease =
    core.getInput("prerelease", { required: false }) === "true";
  const commitish =
    core.getInput("commitish", { required: false }) || context.sha;

  const token = core.getInput("github_token", { required: false});

  return {
    tagName: tag,
    owner,
    repo,
    releaseName,
    draft,
    prerelease,
    commitish,
    token,
  };
}

module.exports = input;
