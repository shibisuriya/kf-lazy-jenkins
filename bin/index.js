#!/usr/bin/env node

import "../loadEnv.js";

import axios from "axios";
import chalk from "chalk";

import { capitalizeFirstLetter } from "../src/utils.js";
import inquire from "../src/inquire.js";
import { SERVICES } from "../src/constants.js";

const answers = await inquire();

const url = `https://seaeagle.zingworks.com/view/dev-kf4/job/dev/job/kf4/job/${
  SERVICES[answers.service]
}/build`;

const payload = {
  parameter: [
    { name: "deploy_to", value: "pegasi" },
    { name: "cluster", value: "pegasi-gcp-gke-cluster-p001" },
    { name: "repository", value: answers.github },
    { name: "branch", value: answers.branch },
    { name: "zone", value: "us-central1-b" },
    { name: "namespace", value: answers.environment },
    { name: "project", value: "kf-dev-workload-p001" },
    { name: "secret_env", value: capitalizeFirstLetter(answers.environment) },
    { name: "agent", value: "" },
    { name: "static_bucket", value: "pegasi-cs-static-p001" },
    { name: "run_test_cases", value: answers.runTestCases },
    { name: "notify_failure", value: answers.notifyFailure },
    { name: "clear_cache", value: answers.clearCache },
    { name: "run_analysis", value: answers.runAnalysis },
    { name: "run_translation", value: answers.runTranslation },
    { name: "run_asset_versioning", value: answers.runAssetVersioning },
    { name: "run_pwa", value: answers.runPwa },
    { name: "run_web", value: answers.runWeb },
    { name: "image_registry", value: "us-docker.pkg.dev" },
    { name: "__AWS_SM_REGION_NAME", value: "us-west-2" },
    { name: "kind", value: "all" },
    { name: "service", value: "" },
  ],
  statusCode: "303",
  redirectTo: ".",
};

try {
  const response = await axios.post(
    url,
    new URLSearchParams([["json", JSON.stringify(payload)]]),
    {
      params: {
        delay: "0sec",
      },
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      },
      auth: {
        username: process.env.USERNAME,
        password: process.env.API_TOKEN,
      },
    }
  );

  const { status } = response;

  if (status === 304) {
    console.log(chalk.green("Deploying!!"));
  }
} catch (e) {
  console.log(chalk.red("Unable to deploy..."));
}
