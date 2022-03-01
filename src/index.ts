import { extractArguments } from "./support/extract-arguments.function";
import { convert } from "./support/convert/convert.function";

export const run = async () => {
  try {
    const args = await extractArguments();
    convert({
      from: args.from,
      to: args.to,
      folder: args.folder,
    });
  } catch (e) {
    
  }

  // if (!args.from || !args.to || !args.folder) {
  //   return;
  // }

  // npm run convert -- --from=avi --to=mp4 --folder=nice
 
};

// run();
