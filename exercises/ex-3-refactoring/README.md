# Exercise 03: TS Prototype to Java

## Goal

Rebuild a quick TypeScript backend prototype into an enterprise-grade Java service while preserving the same behavior.

## Scenario

A working quote-calculation prototype was built quickly in TypeScript. The company now wants this behavior migrated into a Java service that can become production-ready: typed contracts, validation, tests, clear boundaries, maintainable design, and operational readiness.

Start with:

- [TypeScript prototype](./prototype-ts)
- [Java starter service](./java-service)
- [OpenAPI contract](./contracts/openapi.yaml)

## What To Produce

In your fork, complete or replace the Java starter service so that it preserves the prototype behavior.

Also include notes such as:

```text
submissions/<github-handle>/ex-3/refactor-notes.md
```

Your submission should include:

- Java implementation.
- Tests proving parity with the TypeScript prototype.
- Any contract or validation improvements.
- Refactoring notes explaining design choices.
- Commands used to verify the result.

## Agentic Workflow Prompt

```text
Study exercises/ex-3-refactoring/prototype-ts and preserve its externally visible behavior.
Implement the same quote calculation behavior in exercises/ex-3-refactoring/java-service using enterprise-grade Java practices.
Add tests that prove parity against the examples and contract.
Keep the design maintainable and explain tradeoffs.
```

## Review Rubric

Strong submissions usually:

- Preserve behavior exactly where required.
- Add focused tests before or during the Java implementation.
- Use clear Java domain boundaries instead of copying prototype structure blindly.
- Validate inputs and error cases.
- Keep controllers thin and business logic testable.
- Explain production-readiness improvements and remaining gaps.

