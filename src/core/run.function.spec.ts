import { convert } from "../support/convert/convert.function";
import { run } from "./run.function";

const clearArgs = () => {
  process.argv = process.argv.filter(
    (arg) =>
      !arg.includes("--from") &&
      !arg.includes("--to") &&
      !arg.includes("--folder")
  );
};

jest.mock("../support/convert/convert.function");

describe("run.function", () => {
  beforeEach(() => {
    (<jest.Mock>convert).mockReturnValue(true);
  });

  it("convert file with arguments", async () => {
    process.argv.push(
      "--from=avi",
      "--to=mp4",
      '--folder="/path/folder/example"'
    );

    await run();

    expect(convert).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "avi",
        to: "mp4",
        folder: "/path/folder/example",
      })
    );

    clearArgs();
  });
});
