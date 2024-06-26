const apps = require("./apps.cjs");

const QUESTIONS = {
  initial: [
    {
      type: "autocomplete",
      name: "app",
      message: "Select project:",
      choices: apps,
    },
    {
      type: "input",
      name: "service",
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

module.exports = QUESTIONS;
