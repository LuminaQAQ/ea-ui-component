import { handleImportModules, handlePackageExport, handleImportChildPages } from "./pack.js";

const main = async () => {
  await handleImportModules();
  await handlePackageExport();
  await handleImportChildPages();
};


main();
