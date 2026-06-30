# Exercise 03: React Prototype to Java

## Goal

A quote calculator was prototyped in React. Move the quote calculation rules into a Java service while preserving behavior.

## Starter Projects

```text
exercises/03-react-to-java/starter-react
exercises/03-react-to-java/starter-java
```

Run the React prototype:

```bash
cd exercises/03-react-to-java/starter-react
npm install
npm run dev
```

Run the Java starter:

```bash
cd exercises/03-react-to-java/starter-java
mvn test
mvn spring-boot:run
```

## Task

Use the React prototype as the behavior reference. Implement the same quote rules in Java.

Focus on:

- Matching quote totals.
- Clear Java domain code.
- Request validation.
- Tests for important quote scenarios.
- Keeping the API simple.

## Expected Output

Submit Java changes in `starter-java` and add a short `REFACTOR_NOTES.md` explaining:

- Which rules moved from React to Java.
- How you verified parity.
- Any production-readiness improvements.

