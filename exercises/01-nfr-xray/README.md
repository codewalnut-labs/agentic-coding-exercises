# Exercise 01: NFR X-Ray

## Your Mission

Check whether a codebase is enterprise-ready or not.

You are given a small React portal that looks like an internal enterprise workflow tool. Use Claude Code or any other AI coding agent to reverse engineer the repo and audit it across security, performance, scalability, accessibility, testing, and operational readiness.

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

You can complete this exercise with Claude Code or any other coding agent. Use the Architect Playbook as the audit checklist and install it when your agent supports that workflow; otherwise, keep the playbook open as reference material while auditing.

### Install The Playbook

Open the playbook in Claude Code or any other coding agent:

```bash
git clone https://github.com/CW-Codewalnut/ArchitectPlaybook ~/architect-playbook
cd ~/architect-playbook
claude
```

In Claude Code or any other coding agent, run:

```text
/install-architect-playbook-globally
```

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
