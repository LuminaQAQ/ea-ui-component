const { handleImportModules, handlePackageExport } = require("./pack");

const main = async () => {
  await handleImportModules();
  await handlePackageExport();
};


main();