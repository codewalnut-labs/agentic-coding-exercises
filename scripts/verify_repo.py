from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

REQUIRED_PATHS = [
    "README.md",
    "CONTRIBUTING.md",
    "MAINTAINERS.md",
    "EXERCISE_RULES.md",
    "image.png",
    ".github/CODEOWNERS",
    ".github/pull_request_template.md",
    "exercises/ex-1-code-review/README.md",
    "exercises/ex-1-code-review/scenario/pr-description.md",
    "exercises/ex-1-code-review/scenario/review-target.diff",
    "exercises/ex-1-code-review/scenario/checkout-service-before/package.json",
    "exercises/ex-1-code-review/scenario/checkout-service-before/tests/cart.test.ts",
    "exercises/ex-1-code-review/scenario/checkout-service-after/package.json",
    "exercises/ex-1-code-review/scenario/checkout-service-after/tests/cart.test.ts",
    "exercises/ex-2-nfr-xray/README.md",
    "exercises/ex-2-nfr-xray/scenario/feature-brief.md",
    "exercises/ex-2-nfr-xray/scenario/nfr-checklist.md",
    "exercises/ex-2-nfr-xray/starter-app/src/app.js",
    "exercises/ex-2-nfr-xray/starter-app/src/invoice-service.js",
    "exercises/ex-2-nfr-xray/starter-app/tests/invoice-service.test.js",
    "exercises/ex-3-refactoring/README.md",
    "exercises/ex-3-refactoring/contracts/openapi.yaml",
    "exercises/ex-3-refactoring/prototype-ts/package.json",
    "exercises/ex-3-refactoring/java-service/pom.xml",
    "submissions/README.md",
]


def main() -> int:
    missing = [path for path in REQUIRED_PATHS if not (ROOT / path).exists()]
    if missing:
        print("Missing required repository files:")
        for path in missing:
            print(f" - {path}")
        return 1

    markdown_files = list(ROOT.rglob("*.md"))
    if not markdown_files:
        print("No Markdown files found.")
        return 1

    forbidden_markers = ["ANSWER_KEY", "OFFICIAL_SOLUTION"]
    violations = []
    for path in markdown_files:
        text = path.read_text(encoding="utf-8")
        for marker in forbidden_markers:
            if marker in text:
                violations.append((path.relative_to(ROOT), marker))

    if violations:
        print("Found forbidden solution markers:")
        for path, marker in violations:
            print(f" - {path}: {marker}")
        return 1

    print(f"Repository structure OK. Checked {len(REQUIRED_PATHS)} required paths.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
