import { convert } from "./convert.function";
import fs from "fs/promises";
import child_process from "child_process";

jest.mock("fs/promises");
jest.mock("child_process");

describe("convert", () => {
  it("converts all files inside the folder and moves to a new subfolder", async () => {
    (<jest.Mock>fs.readdir).mockResolvedValue(["example.png", "correct.avi"]);
    (<jest.Mock>fs.access).mockRejectedValue({});
    (<jest.Mock>fs.mkdir).mockImplementation(async () => {});
    (<jest.Mock>child_process.execSync).mockImplementation(() => {});

    await convert({
      from: "avi",
      to: "mp4",
      folder: "/simple-video-converter/example",
    });

    expect(fs.readdir).toHaveBeenCalledWith("/simple-video-converter/example");
    expect(fs.access).toHaveBeenCalledWith(
      "/simple-video-converter/example/mp4"
    );
    expect(fs.mkdir).toHaveBeenCalledWith(
      "/simple-video-converter/example/mp4"
    );

    expect(child_process.execSync).toHaveBeenCalledTimes(1);
    expect(child_process.execSync).toHaveBeenCalledWith(
      "ffmpeg -i /simple-video-converter/example/correct.avi -strict -2 /simple-video-converter/example/mp4/correct.mp4"
    );
  });
});
