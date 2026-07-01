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

Use the [Architect Playbook](https://github.com/CW-Codewalnut/ArchitectPlaybook) to guide the audit.

The Architect Playbook is a Claude Code slash-command playbook for auditing codebases. Install it before starting this exercise.

### Install The Playbook

```bash
git clone https://github.com/CW-Codewalnut/ArchitectPlaybook ~/architect-playbook
cd ~/architect-playbook
claude
```

In Claude Code, run:

```text
/install-architect-playbook-globally
```

Do not start by fixing code. First understand the system, risks, and missing controls.

Suggested agent prompt:

```text
Use the Architect Playbook to audit this repo for enterprise readiness.
Assess security, performance, scalability, accessibility, testing,
observability, operability, and production readiness.
Summarize the highest-risk findings with evidence and recommended fixes.
```

## Expected Output

Add a file named `NFR_XRAY.md` in this exercise folder.

Your document should include:

- What the app does.
- Whether it is enterprise-ready.
- Severity-ranked gaps.
- Evidence from the code.
- Evidence from Architect Playbook findings.
- Recommended improvements.
- Tests or checks you would add before production.
