const github = require("@actions/github");

/**
 *
 * @param {*} input
 *              tagName
 *              owner
 *              repo
 *              releaseName
 *              draft
 *              prerelease
 *              commitish
 *              token
 * @returns
 *              htmlUrl
 *              releaseId
 *              uploadUrl
 */
async function createRelease(input) {
  const tag = input.tagName;
  const owner = input.owner;
  const repo = input.repo;
  const releaseName = input.releaseName;
  const draft = input.draft;
  const prerelease = input.prerelease;
  const commitish = input.commitish;


  const body = "Changes in this Release";

  const octokit = github.getOctokit(process.env.GITHUB_TOKEN)

  const createReleaseResponse = await octokit.rest.repos.createRelease({
    owner,
    repo,
    tag_name: tag,
    name: releaseName,
    body: body,
    draft,
    prerelease,
    target_commitish: commitish,
  });

  const {
    data: { id: releaseId, html_url: htmlUrl, upload_url: uploadUrl },
  } = createReleaseResponse;
  return {
    releaseId,
    htmlUrl,
    uploadUrl,
  };
}

module.exports = createRelease;
