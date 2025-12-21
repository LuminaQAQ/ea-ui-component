const { handleImportModules, handlePackageExport, handleImportChildPages } = require("./pack");

const main = async () => {
  await handleImportModules();
  await handlePackageExport();
  await handleImportChildPages();
};


main();