# Exercise 01: Code Review

## Goal

Use an AI coding agent to review a small React checkout dashboard. The goal is to catch regressions, anti-patterns, bad conventions, security issues, and inconsistent code quality.

## Starter Project

```text
exercises/01-code-review/starter-react
```

Run it:

```bash
cd exercises/01-code-review/starter-react
npm install
npm run dev
```

## Task

Use an agent to inspect the codebase and produce a code review. Focus on:

- Bugs in checkout totals.
- Unsafe rendering.
- State management mistakes.
- Inconsistent component quality.
- Missing empty, error, and loading states.
- Accessibility problems.

## Expected Output

Add a `CODE_REVIEW.md` file in this exercise folder.

Your review should include:

- Top issues you found.
- File references.
- Why each issue matters.
- Suggested fixes.
- Any tests you would add.

You may also fix issues in code, but the main deliverable is the review.
