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

module.exports = [
  {
    type: "select",
    name: "project_name",
    message: "Project name:",
    choices: apps,
  },
  {
    type: "input",
    name: "service_name",
    message: "Service name:",
  },
  { type: "input", name: "api_url", message: "API URL:" },
  {
    type: "toggle",
    name: "with_server",
    message: "Do you want to add a server side service?",
  },
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
];
