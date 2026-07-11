# Prahlin Portfolio Site

Next.js + Tailwind CSS portfolio start page for Prahlin.

## What is included

- `app/page.tsx` - the homepage/start page.
- `app/globals.css` - the green/black visual system and responsive layout.
- `public/images/profile-placeholder.png` - generated AI profile placeholder; replace this with your own square photo later using the same filename.
- `public/images/start-page-mockup-reference.png` - the original generated mockup reference.
- `public/favicon.svg` - simple green/black monogram favicon.

## Local development

```sh
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

For Vercel, Netlify, or another Next.js host:

```sh
npm run build
```

For a simple static host:

```sh
npm run build:static
```

Then upload the generated `out/` folder.

## Replace the profile photo

Put your real square profile photo at:

```txt
public/images/profile-placeholder.png
```

Keep the filename the same and rebuild.
