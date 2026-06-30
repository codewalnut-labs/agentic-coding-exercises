# Exercise 03: TS Prototype to Java

## Goal

You are given a working TypeScript backend prototype for a quote calculator. It exposes a `/quotes` API and contains the business rules for customer tier discounts, promo code discounts, regional tax, and final quote totals.

Your goal is to use an AI coding agent to understand that prototype and rebuild the same behavior in the Java Spring Boot starter service. The Java version should keep the external behavior the same, but improve the implementation quality with clearer domain boundaries, request validation, tests, and production-ready conventions.

## Starter Projects

```text
exercises/03-ts-to-java/prototype-ts
exercises/03-ts-to-java/starter-java
```

Run the TypeScript prototype:

```bash
cd exercises/03-ts-to-java/prototype-ts
npm install
npm test
npm run dev
```

Check the Java starter:

```bash
cd exercises/03-ts-to-java/starter-java
mvn test
mvn spring-boot:run
```

`mvn test` is expected to fail at first because the Java implementation is incomplete.

## Task

Use the TypeScript backend prototype as the behavior reference. Implement the same quote rules in Java.

Focus on:

- Matching quote totals.
- Clear Java domain code.
- Request validation.
- Tests for important quote scenarios.
- Better boundaries than the prototype.
- Production-ready conventions.

## Expected Output

Submit Java changes in `starter-java` and add a short `REFACTOR_NOTES.md` explaining:

- Which rules moved from TypeScript to Java.
- How you verified parity.
- Any production-readiness improvements.

The Java starter includes a failing parity test. That is intentional: make it pass by implementing the Java service.
