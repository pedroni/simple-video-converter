import fs from "fs/promises";
import path from "path";
import child_process from "child_process";

type ConvertArgs = {
  from: string;
  to: string;
  folder: string;
};

const createToFolder = async (args: ConvertArgs) => {
  const fullPath = path.join(args.folder, args.to);

  try {
    // tries to access folder
    await fs.access(fullPath);
  } catch {
    // if not possible to access it creates the folder
    await fs.mkdir(fullPath);
  }
};

const convertFile = (args: ConvertArgs, file: string) => {
  const fileName = path.basename(file);

  if (!fileName.endsWith(args.from)) {
    return;
  }

  const newFileName = fileName.replaceAll(args.from, args.to);

  child_process.execSync(
    `ffmpeg -i ${path.join(args.folder, fileName)} -strict -2 ${path.join(
      args.folder,
      args.to,
      newFileName
    )}`
  );
};

export const convert = async (args: ConvertArgs): Promise<boolean> => {
  console.time("Starting to convert files");

  const files = await fs.readdir(args.folder);

  await createToFolder(args);

  files.forEach((file) => {
    console.log("-------------------");
    console.log("Converting", file);
    convertFile(args, file);
    console.log("Done converting", file);
  });

  console.timeEnd("Starting to convert files");

  return Promise.resolve(true);
};
