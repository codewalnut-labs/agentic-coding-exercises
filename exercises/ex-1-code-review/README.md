# Exercise 01: Code Review

## Goal

Put an agent reviewer on a realistic diff and catch regressions, anti-patterns, and inconsistent code quality before the changes reach production.

## Scenario

The checkout team shipped a small PR that claims to:

- Support customer credits in cart pricing.
- Simplify webhook signature verification.
- Clean up pricing calculations.

Your job is to review the PR as if it were ready for production.

Start with:

- [PR description](./scenario/pr-description.md)
- [Review target diff](./scenario/review-target.diff)
- [Before code](./scenario/checkout-service-before/src)
- [After code](./scenario/checkout-service-after/src)

The `checkout-service-before` and `checkout-service-after` folders are runnable TypeScript projects. The after-project tests are intentionally useful review signals; failing tests are part of the exercise, not a repository setup problem.

```bash
cd exercises/ex-1-code-review/scenario/checkout-service-before
npm install
npm test

cd ../checkout-service-after
npm install
npm test
```

## What To Produce

Create a review file such as:

```text
submissions/<github-handle>/ex-1/review.md
```

Your review should include:

- Highest-risk findings first.
- File and line references where possible.
- Why each issue matters.
- Suggested fix or test.
- At least one positive note for a good change, if you find one.

## Agentic Workflow Prompt

You may use this as a starting prompt for your coding agent:

```text
Review the diff in exercises/ex-1-code-review/scenario as a senior engineer.
Prioritize regressions, security issues, anti-patterns, data integrity risks, and missing tests.
Return findings in severity order with file references and concrete fixes.
```

## Review Rubric

Strong submissions usually catch:

- Behavior regressions in price calculation.
- Security regressions in webhook verification.
- Edge cases around expiration, caps, negative totals, and timing-safe comparisons.
- Missing or weakened tests.
- Quality issues that would make future changes risky.
