# Exercise 02: Code Review

## Your Mission

Review a PR in 5 minutes.

You are given a small React project and a PR diff. Use Claude Code or any other AI coding agent to review the PR for regressions, anti-patterns, security issues, inconsistent conventions, and missing tests.

## Starter Project

```text
exercises/02-code-review/starter-react
```

Run it:

```bash
cd exercises/02-code-review/starter-react
npm install
npm run dev
```

## PR To Review

```text
exercises/02-code-review/pr/description.md
exercises/02-code-review/pr/review-target.diff
```

## How To Go About It

Install the [Superpowers code-review skill](https://www.skills.sh/obra/superpowers/requesting-code-review) and use it to review the PR. Rank the issues it surfaces by severity.

## Expected Output

Add a file named `CODE_REVIEW.md` in this exercise folder.

Your review should include:

- Severity-ranked findings.
- File references.
- Why each issue matters.
- Suggested fixes.
- Tests that should be added.
