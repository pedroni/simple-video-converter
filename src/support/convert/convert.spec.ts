import * as convert from "./convert.function";
import fs from "fs/promises";
import fsSync from "fs";
import child_process from "child_process";

jest.mock("fs/promises");
jest.mock("fs");
jest.mock("child_process");

describe("convert", () => {
  it("converts all files inside the folder and moves to a new subfolder", async () => {
    (<jest.Mock>fs.readdir).mockResolvedValue([
      "example.png",
      ".correct.avi", // example of hidden file that should be ignore
      "correct.avi",
    ]);
    (<jest.Mock>fs.access).mockRejectedValue({});
    (<jest.Mock>fs.mkdir).mockImplementation(async () => {});
    (<jest.Mock>fsSync.existsSync).mockReturnValue(false);
    (<jest.Mock>child_process.execSync).mockImplementation(() => {});

    await convert.convert({
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

  it("doesnt convert if file already exists", async () => {
    (<jest.Mock>fs.readdir).mockResolvedValue(["file.avi"]);
    (<jest.Mock>fs.access).mockImplementation(async () => {}); // mock folder exists
    (<jest.Mock>fsSync.existsSync).mockReturnValue(true);
    (<jest.Mock>child_process.execSync).mockImplementation(() => {});

    await convert.convert({
      from: "avi",
      to: "mp4",
      folder: "/simple-video-converter/example",
    });

    expect(fs.readdir).toHaveBeenCalledWith("/simple-video-converter/example");
    expect(fs.access).toHaveBeenCalledWith(
      "/simple-video-converter/example/mp4"
    );

    expect(fsSync.existsSync).toHaveBeenCalledWith(
      "/simple-video-converter/example/mp4/file.mp4"
    );
    expect(child_process.execSync).not.toHaveBeenCalled();
  });

  it("fails silently while converting", async () => {
    (<jest.Mock>fs.readdir).mockResolvedValue(["file.avi"]);
    (<jest.Mock>fs.access).mockImplementation(async () => {}); // mock folder exists
    jest.spyOn(convert, "convertFile").mockImplementation(() => {
      throw new Error("Fail to convert MOCK");
    });

    await convert.convert({
      from: "avi",
      to: "mp4",
      folder: "/simple-video-converter/example",
    });
  });
});
