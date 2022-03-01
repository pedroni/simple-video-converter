import { extractArguments } from "./support/extract-arguments.function";
import { convert } from "./support/convert/convert.function";

export const run = async () => {
  const args = await extractArguments();

  convert({
    from: args.from,
    to: args.to,
    folder: args.folder,
  });
};

run();
