# Exercise 03: Generate Diagram

## Your Mission

Generate a diagram for your feature.

You are given a small React implementation of a feature workflow. Use an AI coding agent to understand the feature and generate two diagrams: a sequence diagram and a flow diagram.

## Starter Project

```text
exercises/03-generate-diagram/starter-react
```

Run it:

```bash
cd exercises/03-generate-diagram/starter-react
npm install
npm run dev
```

## How To Go About It

Use the Excalidraw diagram-generator skill on the feature you built or inspected.

Suggested agent prompt:

```text
Inspect the feature in exercises/03-generate-diagram/starter-react.
Generate a sequence diagram and a flow diagram for the feature.
The diagrams should show actors, state transitions, system steps,
success paths, and failure/rollback paths.
```

Use [reference/feature-brief.md](./reference/feature-brief.md) as product context.

## Expected Output

Add a `diagrams` folder inside this exercise folder containing:

- `sequence-diagram` export or source.
- `flow-diagram` export or source.
- `DIAGRAM_NOTES.md` explaining what each diagram shows.

Diagrams can be Excalidraw files, images, Mermaid, or another format your agent produces. Excalidraw is preferred.

