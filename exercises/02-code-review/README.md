# Exercise 02: Code Review

## Your Mission

Review a PR in 5 minutes.

You are given a small React project and a PR diff. Use an AI coding agent to review the PR for regressions, anti-patterns, security issues, inconsistent conventions, and missing tests.

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

Run the Superpowers code-review skill on the PR and read the issues it surfaces by severity.

Suggested agent prompt:

```text
Review the PR in exercises/02-code-review/pr in 5 minutes.
Prioritize regressions, anti-patterns, security issues, inconsistent code quality,
missing tests, and user-facing behavior changes. Return findings by severity.
```

## Expected Output

Add a file named `CODE_REVIEW.md` in this exercise folder.

Your review should include:

- Severity-ranked findings.
- File references.
- Why each issue matters.
- Suggested fixes.
- Tests that should be added.

