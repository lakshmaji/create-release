const createRelease = require("../src/create-release");
const github = require("@actions/github");

describe("Create release", () => {
  let ghSpy;
  let createReleaseMock;
  beforeAll(() => {
    createReleaseMock = jest.fn().mockResolvedValueOnce({
      data: {
        id: "1.0.0",
        html_url: "htmlUrl",
        upload_url: "uploadUrl",
      },
    })
    .mockRejectedValueOnce(new Error('Error creating release'));

    ghSpy = jest.spyOn(github, "getOctokit").mockImplementation(() => {
      return {
        ...github,
        rest: {
          repos: {
            createRelease: createReleaseMock,
          },
        },
      };
    });
  });

  afterAll(() => {
    createReleaseMock.mockClear();
    ghSpy.mockClear();
    jest.clearAllMocks();
  });

  it("should call createRelease", async () => {
    const result = await createRelease({
      tagName: "v1.0.0",
      owner: "owner",
      repo: "repo",
      releaseName: "myRelease",
      draft: false,
      prerelease: false,
      commitish: undefined,
      token: "secret",
    });
    expect(createReleaseMock).toHaveBeenCalledWith({
      body: "Changes in this Release",
      target_commitish: undefined,
      owner: "owner",
      repo: "repo",
      tag_name: "v1.0.0",
      name: "myRelease",
      draft: false,
      prerelease: false,
    });
    expect(result).toStrictEqual({
      releaseId: "1.0.0",
      htmlUrl: "htmlUrl",
      uploadUrl: "uploadUrl",
    });
  });

  it('should throw error when createRelease failed',  async() => {
    await expect(createRelease({
      tagName: "v1.0.0",
      owner: "owner",
      repo: "repo",
      releaseName: "myRelease",
      draft: false,
      prerelease: false,
      commitish: undefined,
      token: "secret",
    })).rejects.toThrow('Error creating release')
    expect(createReleaseMock).toHaveBeenCalled()
  })
});
