# Incident Recovery With AI Agents

Two prototype previews of an AI-assisted incident recovery experience, both exported from Figma Make.

## Live previews

**Landing:** https://muyitao777.github.io/incident-recovery-with-ai-agents/

### Wireframes (lo-fi)
- V1 — https://muyitao777.github.io/incident-recovery-with-ai-agents/v1-wireframe/
- V2 — https://muyitao777.github.io/incident-recovery-with-ai-agents/v2-wireframe/

### HiFi prototypes
- V2 — https://muyitao777.github.io/incident-recovery-with-ai-agents/v2/
- V4 — https://muyitao777.github.io/incident-recovery-with-ai-agents/v4/
- V8 — https://muyitao777.github.io/incident-recovery-with-ai-agents/v8/
- V11 — https://muyitao777.github.io/incident-recovery-with-ai-agents/v11/

## Local development

Each version is a standalone Vite app:

```bash
cd <version-dir> && npm install && npm run dev
```

Where `<version-dir>` is one of `v1-wireframe`, `v2-wireframe`, `v2`, `v4`, `v8`, `v11`.

Both apps are standalone Vite + React + Tailwind projects. The GitHub Actions workflow in `.github/workflows/deploy.yml` builds both on every push to `main` and publishes to GitHub Pages.
