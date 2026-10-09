# Hybrid Phone Service Center

One counter for the Pioneer Mall shop: sales, stock, purchases, customer credit, creditors, expenses, receipts, and a balance. It runs in the browser and installs as an app on Windows, Mac, Android, and iOS.

Books stay on the device (so the till works offline). Move them with **Settings → Download backup**, then **Import backup** on the other device. Staff passwords travel inside that file.

## Staff on a fresh device

| Username | Password | Role |
| --- | --- | --- |
| Grobaltech | hybrid | Admin |
| moses | floor | Manager |
| amina | till | Cashier |

## Publish on Cloudflare Pages from GitHub

1. Push this repo to GitHub.
2. In Cloudflare, create a Pages project connected to the repo (or let the GitHub Action deploy it).
3. Build command: `npm run build`
4. Build environment variable: `DEPLOY_TARGET` = `cloudflare`
5. Output directory: `dist`
6. For the included GitHub Action, add repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. The workflow publishes project `hybrid-phone-pos`.

The same Pages address is what you install on every device. See **Install app** inside the counter for Windows, Mac, Android, and iPhone steps.

`DEPLOY_TARGET` must be unset (or not `cloudflare`) for a Vercel build. Cloudflare Pages uses the `cloudflare-pages` output in `dist`, including the Pages worker.
