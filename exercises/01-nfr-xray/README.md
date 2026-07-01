# Exercise 01: NFR X-Ray

## Your Mission

Check whether a codebase is enterprise-ready or not.

You are given a small React portal that looks like an internal enterprise workflow tool. Use an AI coding agent to reverse engineer the repo and audit it across security, performance, scalability, accessibility, testing, and operational readiness.

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

Use the [Architect Playbook](./architect-playbook.md) to guide the audit.

Ask your agent to inspect the codebase and produce an enterprise-readiness report. Do not start by fixing code. First understand the system, risks, and missing controls.

Suggested agent prompt:

```text
Use the Architect Playbook to audit this repo for enterprise readiness.
Reverse engineer what the app does, then assess security, performance,
scalability, accessibility, testing, observability, and operability.
Rank issues by severity and suggest concrete improvements.
```

## Expected Output

Add a file named `NFR_XRAY.md` in this exercise folder.

Your document should include:

- What the app does.
- Whether it is enterprise-ready.
- Severity-ranked gaps.
- Evidence from the code.
- Recommended improvements.
- Tests or checks you would add before production.

