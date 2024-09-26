import inquirer from "inquirer";

import { GITHUB_USERNAMES, ENVIRONMENTS, SERVICES } from "../src/constants.js";

import inquirerSearchCheckbox from "inquirer-search-checkbox";
import inquirerSearchList from "inquirer-search-list";

import { getCurrentGitBranch } from "./utils.js";

const currentGitBranch = await getCurrentGitBranch();

inquirer.registerPrompt("search-list", inquirerSearchList);
inquirer.registerPrompt("search-checkbox", inquirerSearchCheckbox);

async function inquire() {
  const questions = [
    {
      type: "input",
      name: "branch",
      message: "Branch: ",
      default: currentGitBranch,
    },
    {
      type: "search-list",
      name: "github",
      message: "Github username: ",
      choices: GITHUB_USERNAMES,
    },
    {
      type: "search-list",
      name: "environment",
      message: "Environment: ",
      choices: ENVIRONMENTS,
    },
    {
      type: "search-list",
      name: "service",
      message: "Service: ",
      choices: Object.keys(SERVICES),
    },
    {
      type: "confirm",
      name: "runTestCases",
      message: "Run test cases? ",
      default: false, // or true, depending on your default preference
    },
    {
      type: "confirm",
      name: "notifyFailure",
      message: "Notify failure? ",
      default: false, // or true, depending on your default preference
    },
    {
      type: "confirm",
      name: "runAnalysis",
      message: "Run analysis?",
      default: false, // or true, depending on your default preference
    },
    {
      type: "confirm",
      name: "clearCache",
      message: "Clear cache?",
      default: false, // or true, depending on your default preference
    },

    {
      type: "confirm",
      name: "runTranslation",
      message: "Run translation?",
      default: false, // or true, depending on your default preference
    },
    {
      type: "confirm",
      name: "runAssetVersioning",
      message: "Run asset versioning?",
      default: true, // or true, depending on your default preference
    },

    {
      type: "confirm",
      name: "runPwa",
      message: "Run PWA?",
      default: false, // or true, depending on your default preference
    },

    {
      type: "confirm",
      name: "runWeb",
      message: "Run Web?",
      default: true, // or true, depending on your default preference
    },
  ];

  const answers = await inquirer.prompt(questions);

  return answers;
}

export default inquire;
