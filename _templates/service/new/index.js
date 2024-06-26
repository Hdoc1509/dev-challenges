const getInputs = require("../inputs.cjs");

module.exports = {
  prompt: ({ inquirer }) => getInputs(inquirer),
};
