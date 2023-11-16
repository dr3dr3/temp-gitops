#!/usr/bin/env node

import { getOctokit } from "@actions/github";
import { setOutput } from "@actions/core";

console.assert(process.env.GITHUB_TOKEN, "GITHUB_TOKEN not present");
console.assert(process.env.REPO_OWNER, "REPO_OWNER not present");
console.assert(process.env.REPO_NAME, "REPO_NAME not present");

const octokit = getOctokit(process.env.GITHUB_TOKEN);

main();

const { data: results } = await octokit.rest.repos.get({
    owner: proess.env.REPO_OWNER,
    repo: process.env.REPO_NAME,
    }).archived;

console.log( results );

return results;

async function main() {
    const result = await getRepo();
    setOutput("result", result);
};