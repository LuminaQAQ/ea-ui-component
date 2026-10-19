import { handlePackageExport, handleImportChildPages } from "./pack";

const main = async (): Promise<void> => {
  await handlePackageExport();
  await handleImportChildPages();
};

main();
