# Gidev Innovations — logo files

Colours: teal #18aeb4 · ink #141413 · white. Type: Outfit Bold / SemiBold, converted to outlines (no font needed).

| File | Use |
|---|---|
| gidev-logo.svg (+ @1x/@2x/@4x.png) | Primary logo on white/light backgrounds |
| gidev-logo-on-dark.svg / .png | On black or dark backgrounds (white letters) |
| gidev-logo-on-teal.svg / .png | On the teal CTA block (white letters, ink i) |
| gidev-wordmark*.svg / .png | `gidev.` only — nav bar, small placements |
| favicon.svg, favicon.ico, favicon-16/32/48.png, apple-touch-icon.png, icon-192/512.png | Browser tab, iOS home screen, PWA manifest |
| og-image.png | Link previews (WhatsApp, LinkedIn, X) |

## Site `<head>` snippet
```html
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:image" content="https://gidevtech.com/og-image.png">
```
Minimum size for the full logo (with INNOVATIONS): 120px wide. Below that, use the wordmark.
