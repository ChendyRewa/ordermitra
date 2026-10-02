# OrderMitra — Session 6 Hands-On

Testing AI-generated code, CI/CD pipelines, and Vercel deployment.

Three exercises, roughly 50 minutes of hands-on time, run in order across the
session. By the end, OrderMitra has a test suite above 80% coverage and a
pipeline that re-checks it on every push.

---

## Start here

1. Read **`SETUP.md`** and run it before the session.
2. Then work through the chapters in order.

---

## What's in here

```
ordermitra/                      the app — install once, use for all three chapters
SETUP.md                         do this first

chapter-1-testing-and-mocking/   Jest, RTL, mocking a non-deterministic hook
chapter-2-ai-drafted-tests/      let AI draft tests, then audit what it missed
chapter-3-ci-cd-and-deploy/      the confirmation gate, GitHub Actions, Vercel
```

Each chapter folder has:

- `README.md` — the exercise
- `prompts.md` — prompts to give your AI agent, and what to check in each reply
- `solution/` — reference answers, for after you have tried

**One app, three chapters.** You install `ordermitra/` once and keep working in
it — Chapter 2 builds on Chapter 1's tests, and Chapter 3 pushes the repo that
both of them built. Do not re-install per chapter.

---

## What you should end up with

- Component tests that query the way a user reads the screen
- A mocked LLM hook, so tests give the same result every single run
- A coverage gap you found yourself, and closed
- A CI workflow that runs on every push, and a gate that blocks merges
- A live URL

---

## The one idea underneath all three

Every session in this course has been *verify what the AI writes*. This one
aims that at tests themselves — and then automates the verifying, so it happens
whether or not you remember to do it.

The pipeline is not the skill. Reading the coverage report is the skill. The
pipeline just makes sure the judgement you already wrote down gets applied every
time, forever.
