import {
  handleImportModules,
  handlePackageExport,
  handleImportChildPages,
} from "./pack";

const main = async (): Promise<void> => {
  await handleImportModules();
  await handlePackageExport();
  await handleImportChildPages();
};

main();
