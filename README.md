# Emotional Fitness Lab — Landing Page

Landing page for EQ & You emotional fitness classes.

## Setup

```bash
npm install
npm run dev
```

## Deploy

Build for production:

```bash
npm run build
```

The `dist/` folder is ready to deploy to Vercel, Netlify, or any static host.

### Vercel (easiest)

```bash
npx vercel
```

### Netlify

```bash
npx netlify deploy --prod --dir=dist
```

## Connecting the Form

The contact form currently logs to console on submit. To connect it to a real backend, update the `handleSubmit` function in `src/App.jsx`. Options:

- **Formspree**: Replace with `fetch('https://formspree.io/f/YOUR_ID', { method: 'POST', body: ... })`
- **Tally**: Embed a Tally form by replacing the form JSX with a Tally embed script
- **Airtable**: POST directly to an Airtable API endpoint
- **Google Sheets**: Use a Google Apps Script webhook
