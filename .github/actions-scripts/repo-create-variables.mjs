#!/usr/bin/env node

import { getOctokit } from "@actions/github";
import { setOutput } from "@actions/core";

console.assert(process.env.GHA_TOKEN, "GHA_TOKEN not present");
console.assert(process.env.REPO_OWNER, "REPO_OWNER not present");
console.assert(process.env.REPO_NAME, "REPO_NAME not present");
console.assert(process.env.REPO_VARS, "REPO_VARS not present");

const octokit = getOctokit(process.env.GHA_TOKEN);

main();

async function createRepoVariables() {
    const items = JSON.parse(process.env.REPO_VARS);
    console.log(items)
    for (const { name, value } of items) {
        const { status:varCreated } = await octokit.rest.actions.createRepoVariable({
            owner: process.env.REPO_OWNER,
            repo: process.env.REPO_NAME,
            name: name,
            value: value,
        });
        console.log( varCreated );
    }
    return true;
}

async function main() {
    console.log(process.env.REPO_VARS)
    const result = await createRepoVariables();
    setOutput("result", result);
};