# Exercise 03: TS Prototype to Java

## Goal

A quote service was built quickly as a TypeScript backend prototype. The company now wants the same behavior rebuilt as an enterprise-grade Java service.

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
