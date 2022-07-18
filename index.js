const core = require('@actions/core');
const github = require('@actions/github');
const superagent = require('superagent')

async function getPull()  {
    let client = github.getOctokit("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")
    let res = await client.rest.pulls.get({
        owner: "inovait",
        repo: "ci-test-proj",
        pull_number: 20
    })
    let res2 = await client.rest.pulls.listReviews({
        owner: "inovait",
        pull_number: 20,
        repo: "ci-test-proj"})

    let res3 = await client.rest.checks.listForRef({
        owner: "inovait",
        repo: "ci-test-proj",
        ref: "PM-1-still_working"
    })
    let failed = false
    for (let check of res3.data.check_runs) {
        if (check.status == "in_progress" || check.conclusion == "failure") {
            failed = true
            break
        }
    }

    

    console.log(res.data)
    res = 0
    let canMerge = res.data.requested_reviewers.size === 0 && res2.data.length > 0
}
    
getPull()