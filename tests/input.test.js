jest.mock("@actions/core");
jest.mock("@actions/github");
const { context } = require("@actions/github");
const core = require("@actions/core");
const input = require("../src/input");

describe("inpiut", () => {
  beforeEach(() => {
    context.repo = {
      owner: "owner",
      repo: "repo",
    };
    context.sha = "sha";
  });

  it("should return the formatted inputs", () => {
    core.getInput = jest
      .fn()
      .mockReturnValueOnce("refs/tags/tag:release-v1.0.0")
      .mockReturnValueOnce(undefined)
      .mockReturnValueOnce(undefined)
      .mockReturnValueOnce("Release Name")
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce("sha");

    expect(input()).toStrictEqual({
      commitish: "sha",
      draft: false,
      owner: "owner",
      prerelease: false,
      releaseName: "Release Name",
      repo: "repo",
      tagName: "tag:release-v1.0.0",
      token: undefined,
    });
  });
});
