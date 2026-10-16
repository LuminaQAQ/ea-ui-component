import { main } from "./program";

main(process.argv.slice(2)).then(code => {
  process.exitCode = code;
});
