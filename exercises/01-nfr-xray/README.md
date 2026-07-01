**Exercise 01**

# NFR X-Ray

## Your Mission

Check whether a codebase is Enterprise ready or not.

You are given a medium-sized React portal that looks like an internal enterprise workflow tool. Use Claude Code or any other AI coding agent to reverse engineer the repo and audit it.

## Starter Project

```text
exercises/01-nfr-xray/starter-react
```

Run it:

```bash
cd exercises/01-nfr-xray/starter-react
npm install
npm run dev
```

## How To Go About It

Use the [Architect Playbook](https://github.com/CW-Codewalnut/ArchitectPlaybook) to audit the repo across security, performance, accessibility, and testing.

## Expected Output

Add a file named `NFR_XRAY.md` in this exercise folder.

Your document should include:

- What the app does.
- Whether it is enterprise-ready.
- Severity-ranked gaps.
- Evidence from the code.
- Evidence from Architect Playbook findings.
- Recommended improvements, not code changes.
- Tests or checks you would add before production.
