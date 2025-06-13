# MTG Assistant

This project is based on [assistant-ui](https://github.com/Yonom/assistant-ui) and aims to help Magic: The Gathering players craft better decks and improve their game knowledge by integrating several useful tools into one system.

## Features (Planned)

- **Deck Builder:** Easily create, edit, and analyze Magic: The Gathering decks.
- **Card Search:** Search for cards with advanced filters and view detailed information.
- **Meta Analysis:** Get insights into popular decks and strategies.
- **Rules Reference:** Quickly look up official rules and card interactions.
- **AI Assistant:** Ask questions about cards, rules, or deck building and get instant answers.

## Getting Started

First, add your OpenAI API key to a `.env.local` file:

```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GPT_MODEL=xxxx
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
