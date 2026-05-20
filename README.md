# Incident Recovery With AI Agents

Two prototype previews of an AI-assisted incident recovery experience, both exported from Figma Make.

## Live previews

- **V1 — Wireframe (lo-fi):** https://muyitao777.github.io/incident-recovery-with-ai-agents/v1/
- **V11 — HiFi (hi-fi):** https://muyitao777.github.io/incident-recovery-with-ai-agents/v11/
- **Landing:** https://muyitao777.github.io/incident-recovery-with-ai-agents/

## Local development

```bash
# V1 wireframe
cd v1 && npm install && npm run dev

# V11 hi-fi
cd v11 && npm install && npm run dev
```

Both apps are standalone Vite + React + Tailwind projects. The GitHub Actions workflow in `.github/workflows/deploy.yml` builds both on every push to `main` and publishes to GitHub Pages.
