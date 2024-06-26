// @ts-check
const QUESTIONS = require("./questions.cjs");

/**
 * @param {{ prompt: (questions: Array<Object>) => Promise<any> }} inquirer
 */
const getInputs = async (inquirer) => {
  let withServer = false;
  const initialAnswers = await inquirer.prompt(QUESTIONS.initial);

  const isSSR = initialAnswers.app.startsWith("ssr");

  initialAnswers.is_ssr = isSSR;

  if (isSSR) withServer = (await inquirer.prompt(QUESTIONS.server)).with_server;

  initialAnswers.with_server = withServer;

  const nextAnswers = await inquirer.prompt(QUESTIONS.response);

  return { ...initialAnswers, ...nextAnswers };
};

module.exports = getInputs;
