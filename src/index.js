const core = require("@actions/core");
const createRelease = require("./create-release");
const input = require("./input");

async function run() {
  try {
    const data = input();
    if(!data) {
      return;
    }
    const { releaseId, htmlUrl, uploadUrl } = await createRelease(data);
    core.setOutput("id", releaseId);
    core.setOutput("html_url", htmlUrl);
    core.setOutput("upload_url", uploadUrl);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
