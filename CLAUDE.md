# Kubernetes for Technical Managers

A course of explainer pages, one didactician run per chapter. `CURRICULUM.md` is the course bible; every run reads it (see its §8).

## Didactician runs

- **Style is fixed.** Every chapter uses the Control Plane style guide in `design/control-plane/`. At intake, treat design tokens as already supplied by the user; don't ask about them. `CURRICULUM.md` §8 step 4 says how to pass the guide to builders and the reviewer.
- Don't edit `.agents/skills/didactician/`: it's an installed copy pinned in `skills-lock.json`. Course-specific rules go in `CURRICULUM.md` or here.

Note added for by the human: When I ask you to start chapter 5, stop me unless we've concluded the session for chapter 4 which needs to update some curriculum facts. I'll know what that means.
- **Shared code and the course site.** Shared chapter runtime lives once in `explainers/_pool/`, and the course chrome (home page, course map, masthead) in `explainers/_site/`. `CURRICULUM.md` §8 step 5 has the run rules. `npm run sync` mirrors the pool into chapters, `npm run build` stitches `dist/`, and `npm run preview` builds and serves it. There are no dependencies; Node ≥ 20.
