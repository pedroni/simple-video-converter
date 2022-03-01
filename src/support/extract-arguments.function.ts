import yargs from "yargs";

export const extractArguments = async () => {
  const args = yargs(process.argv)
    .options({
      from: { type: "string", demandOption: true },
      to: { type: "string", demandOption: true },
      folder: { type: "string", demandOption: true },
    })
    .parseSync();

  return {
    from: args.from,
    to: args.to,
    folder: args.folder,
  };
};
