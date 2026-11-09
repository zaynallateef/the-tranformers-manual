# The Transformers manual

A reading website that explains AI transformers in Arabic and English, with static diagrams, examples, and plain-language definitions. Built with React, TypeScript, Vite, and Tailwind CSS in a neo-brutalist/Y2K/retro style.

Arabic and the light theme are the defaults. Important technical terms stay in English. All content is directly on the page; there are no quizzes, model APIs, or accounts.

## Run locally

Use the Node.js version in [.node-version](.node-version).

```bash
git clone https://github.com/zaynallateef/the-tranformers-manual.git
cd the-tranformers-manual
npm ci
npm run dev
```

Open the Local URL printed by Vite, normally http://127.0.0.1:5173.

## Deploy on Render

[Deploy this repository on Render](https://render.com/deploy?repo=https%3A%2F%2Fgithub.com%2Fzaynallateef%2Fthe-tranformers-manual).

The repository contains a [Render Blueprint](render.yaml) for a Static Site. Connect this repository through **New → Blueprint** in the [Render Dashboard](https://dashboard.render.com/) and review the configuration before deploying.

You can also choose **New → Static Site**, connect this repository, and enter:

| Setting | Value |
| --- | --- |
| Branch | main |
| Root Directory | Leave empty |
| Build Command | npm ci --include=dev && npm run build |
| Publish Directory | dist |

No start command, backend, database, or secret environment variables are required. The Node.js version is declared in .node-version. Render builds the production output; dist and node_modules are intentionally excluded from Git.

References: [Render Blueprint specification](https://render.com/docs/blueprint-spec), [Node.js version configuration](https://render.com/docs/node-version), and [Vite static deployment](https://vite.dev/guide/static-deploy).

## Language and theme

The header uses ordinary links to select an edition:

| URL | Edition |
| --- | --- |
| /?lang=ar&theme=light | Arabic, light (default) |
| /?lang=en&theme=light | English, light |
| /?lang=ar&theme=dark | Arabic, dark |
| /?lang=en&theme=dark | English, dark |

Arabic uses RTL layout and self-hosted IBM Plex Sans Arabic. English keywords are direction-isolated; formulas and numerical examples remain LTR.

## What the guide covers

Tokens and embeddings; positions; queries, keys, and values; attention and multiple heads; feed-forward blocks, residual connections, and normalization; encoder/decoder variants; training; generation; and limitations.

Each of the ten chapters includes an analogy, a walkthrough, a worked or visual example, technical definitions, and a takeaway. A complete generation recap and a 28-term glossary follow the chapters. Numerical examples are illustrative; the site does not run an AI model.

## Build and checks

```bash
npm test
npm run check
npm run build
npm run preview
```

Production files are generated in dist/. The fourteen component tests cover both reading editions, navigation, language/theme links, RTL/LTR metadata, glossary entries, and absence of app controls. Component tests do not establish real-browser visual coverage.

## Project structure

- src/App.tsx: reading components and static examples.
- src/content.ts and src/content.ar.ts: English and Arabic explanations.
- src/reading.ts: URL preferences and document direction.
- src/styles.css: themes, responsive layouts, and print styles.
- public/: the supplied architecture reference and favicon.
- tests/: component regression tests.
- render.yaml: Render static-site configuration.

## Educational sources

- [Attention Is All You Need, Vaswani et al. (2017)](https://arxiv.org/abs/1706.03762)
- [Hugging Face: How do Transformers work?](https://huggingface.co/learn/llm-course/chapter1/4)
- [Hugging Face: Tokenizers](https://huggingface.co/learn/llm-course/chapter2/4)

The supplied diagram follows the original encoder-decoder architecture. Fonts are provided through Fontsource packages and icons through Phosphor. Their licenses are distributed with their respective packages.
