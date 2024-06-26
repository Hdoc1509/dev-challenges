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

module.exports = apps;
