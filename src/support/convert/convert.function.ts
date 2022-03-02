import fs from "fs/promises";
import fsSync from "fs";
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

export const convertFile = (args: ConvertArgs, file: string) => {
  const fileName = path.basename(file);

  // allow only files that ends with the from extension
  if (!fileName.endsWith(args.from)) {
    return;
  }

  // if hidden file dont convert it
  if (fileName.startsWith(".")) {
    return;
  }

  const newFileName = fileName.replaceAll(args.from, args.to);
  const newFilePath = path.join(args.folder, args.to, newFileName);

  // if conversion already exists don't convert it
  if (fsSync.existsSync(newFilePath)) {
    console.log("Skpping", fileName, "because it already exists");
    return;
  }

  child_process.execSync(
    `ffmpeg -i ${path.join(args.folder, fileName)} -strict -2 ${newFilePath}`
  );
};

export const convert = async (args: ConvertArgs): Promise<boolean> => {
  console.time("Starting to convert files");

  const files = await fs.readdir(args.folder);

  await createToFolder(args);

  files
    .sort((file, compareFile) => file.localeCompare(compareFile)) // sort alphabetically
    .forEach((file) => {
      console.log("-------------------");
      console.log("-------------------");
      console.log("-------------------");
      console.log("Converting", file);
      try {
        convertFile(args, file);
        console.log("Done converting", file);
      } catch {
        console.log("Failed converting", file);
      }
    });

  console.timeEnd("Starting to convert files");

  return Promise.resolve(true);
};
