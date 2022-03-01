import yargs from "yargs";

export const extractArguments = async () => {
  const args = yargs(process.argv)
    .options({
      from: { type: "string" },
      to: { type: "string" },
      folder: { type: "string" },
    })
    .parseSync();

  return args;
};
