# Interview Question Generator

A small Next.js app that generates three role-specific interview questions from a job title using the Vercel AI SDK and Google Gemini.

## Stack

- Next.js 16
- React 19 + TypeScript
- AI SDK 6 + `@ai-sdk/google`
- Tailwind CSS + shadcn/ui

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Add your Google API key in `.env.local`:

```bash
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

3. Start the app:

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run start` - run the production build
- `npm run lint` - run ESLint

## Project structure

- `app/page.tsx` - server-rendered page shell
- `components/question-generator.tsx` - client-side form and request state
- `components/question-list.tsx` - renders the generated question list
- `components/question-card.tsx` - renders a single question card
- `app/api/generate/route.ts` - API endpoint for question generation
- `lib/generate-questions.ts` - server-only AI generation and validation logic

## Notes

- Valid job titles return exactly three questions.
- Invalid job titles return a user-friendly validation error instead of a generic server failure.
