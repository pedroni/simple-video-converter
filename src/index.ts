import { extractArguments } from "./support/extract-arguments.function";
import { convert } from "./support/convert";

export const run = async () => {
  const args = await extractArguments();

  if (!args.from || !args.to || !args.folder) {
    return;
  }

  // npm run convert -- --from=avi --to=mp4 --folder=nice
  convert({
    from: args.from,
    to: args.to,
    folder: args.folder,
  });
};

run();
