// @ts-check
const fs = require("fs");

// based on https://stackoverflow.com/a/52157450
/** @type {Array<{ name: string, value: string }>} */
const initialApps = [];

/** @param {Array<string>} folders Folders to search for apps */
const getApps = (folders) =>
  folders
    .map((folder) => fs.readdirSync(folder).map((f) => `${folder}/${f}`))
    .flat();

// based on https://github.com/jondot/hygen/issues/395#issuecomment-1335110325
const apps = getApps(["vanilla", "ssr"]).reduce((acc, dir) => {
  acc.push({ name: dir, value: dir });
  return acc;
}, initialApps);

const QUESTIONS = {
  initial: [
    {
      type: "autocomplete",
      name: "project_name",
      message: "Select project:",
      choices: apps,
    },
    {
      type: "input",
      name: "service_name",
      message: "Service name:",
    },
    { type: "input", name: "api_url", message: "API URL:" },
  ],
  server: [
    {
      type: "toggle",
      name: "with_server",
      message: "Do you want to add a server side service?",
    },
  ],
  response: [
    {
      type: "toggle",
      name: "with_parser",
      message: "Do you want to add a response parser?",
    },
    {
      type: "toggle",
      name: "check_status",
      message: "Do you want to check response status?",
    },
  ],
};

/**
 * @param {{ prompt: (questions: Array<Object>) => Promise<any> }} inquirer
 */
const getInputs = async (inquirer) => {
  let withServer = false;
  const initialAnswers = await inquirer.prompt(QUESTIONS.initial);

  const isSSR = initialAnswers.project_name.startsWith("ssr");

  initialAnswers.is_ssr = isSSR;

  if (isSSR) withServer = (await inquirer.prompt(QUESTIONS.server)).with_server;

  initialAnswers.with_server = withServer;

  const nextAnswers = await inquirer.prompt(QUESTIONS.response);

  return { ...initialAnswers, ...nextAnswers };
};

module.exports = {
  prompt: ({ inquirer }) => getInputs(inquirer),
};
