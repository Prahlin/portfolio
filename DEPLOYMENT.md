# Deployment Notes

## Best Option: Vercel

1. Upload this `portfolio-site` folder to a GitHub repo.
2. Import the repo in Vercel.
3. Use the default Next.js settings.
4. Build command: `npm run build`.

## Netlify

1. Upload this folder to a GitHub repo.
2. Connect the repo in Netlify.
3. Build command: `npm run build`.
4. Publish directory: `.next`.
5. Enable Netlify's Next.js runtime if prompted.

## Simple Static Hosting

Use this when the host only accepts HTML/CSS/JS files:

```sh
npm install
npm run build:static
```

Upload the contents of:

```txt
out/
```

This mode does not need a running Node.js server after upload.

## Contact Button

The contact button currently uses:

```txt
mailto:hello@example.com
```

Replace `hello@example.com` in `app/page.tsx` with your real email address.
