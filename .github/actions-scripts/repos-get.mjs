#!/usr/bin/env node

import { context, getOctokit } from "@actions/github";
import { setOutput } from "@actions/core";

console.assert(process.env.GITHUB_TOKEN, "GITHUB_TOKEN not present");

const octokit = getOctokit(process.env.GITHUB_TOKEN);

main();

async function getRepo() {
    const {
        owner: { owner },
        repo: { repo },
    } = context;
    const { data: results } = await octokit.rest.repos.get({
        owner,
        repo,
    }).archived;
    console.log( results );
    return results;
}

async function main() {
    const result = await getRepo();
    setOutput("result", result);
}