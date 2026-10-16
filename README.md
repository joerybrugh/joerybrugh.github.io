# Bamboo & Bytes

A cozy panda-themed landing page, mini arcade, and optional community chat for **https://joerybrugh.github.io/**. The landing page and all seven games are static and run on GitHub Pages. Firebase Realtime Database provides the live chat when configured. This site no longer includes a blog, stories, or story-publishing tools.

## Publish on GitHub Pages

1. Put `index.html`, `style.css`, `script.js`, `firebase-config.js`, and `database.rules.json` in the root of the `joerybrugh.github.io` repository.
2. Push the files to the `main` branch.
3. In GitHub, open **Settings → Pages**. Choose **Deploy from a branch**, select `main` and `/ (root)`, and save.
4. After deployment, open `https://joerybrugh.github.io/`.

There is no build step. For local testing, serve the folder over HTTP (for example, `npx http-server .`); JavaScript modules and Firebase do not work when opening the page as a `file://` URL.

## Optional: enable live chat with Firebase

GitHub Pages hosts static files and cannot run a chat server. Firebase Realtime Database supplies the realtime chat backend. Without Firebase configuration, the panda landing page and games work, and the chat explains that setup is needed.

1. The Firebase web app and Realtime Database URL for project `livechat-37001` are entered in [`firebase-config.js`](./firebase-config.js), and chat is enabled in the site.
2. Under **Build → Authentication → Sign-in method**, enable **Anonymous** sign-in.
3. Paste [`database.rules.json`](./database.rules.json) into **Realtime Database → Rules** and publish. It allows signed-in users to read and post chat messages, limits names to 24 characters and messages to 240, and prevents editing existing messages.
4. In **Authentication → Settings → Authorized domains**, make sure `joerybrugh.github.io` is listed; add `localhost` for local testing.
5. Restrict the Firebase web API key's HTTP referrers in **Google Cloud Console → APIs & Services → Credentials** to `https://joerybrugh.github.io/*` and any local development origin.
6. Push the config changes and publish the database rules. Once the rules are published, reload the site and open it in two browsers to verify messages appear in both without refreshing.

Firebase web configuration is visible to visitors by design; it is not a password. This public chat has no strong rate limiting or moderation, so avoid collecting sensitive personal information.

## What's included

- **Snack Snake:** use arrow keys or WASD.
- **Panda Pong:** use ↑/↓ or W/S; first to five points wins.
- **Noughts & Paws:** two players take turns; use Play again to reset.
- **Panda Pairs:** match all eight emoji pairs.
- **Rock, Paper, Panda:** play a quick round against the panda.
- **Bamboo Pop:** catch the panda as it jumps between spots before the 15-second timer runs out.
- **Guess the Bamboo:** find the hidden number from 1 to 50 using higher/lower clues.
- **Inline live chat:** chat is available directly on the page; Firebase streams new messages in real time.
- **Chat filtering:** this page redacts email addresses and phone-like numbers and censors a small profanity list before sending and before displaying. It is only a client-side courtesy filter; a modified client can bypass it. For dependable moderation, use a trusted server-side chat service.

## Earning money with ads

GitHub Pages can serve ad scripts, but it does not pay you by itself. A common starting point is Google AdSense:

1. Publish a complete site on your domain and apply to AdSense. Approval is not guaranteed; ad networks typically review useful original content, navigation, privacy disclosures, and policy compliance.
2. If approved, add and verify your site in AdSense, create an ad unit, and copy the publisher and ad-unit code from the AdSense dashboard.
3. Add the provider's official script once in the page `<head>` and put the ad-unit markup only in deliberate placements between sections, not over game controls or the chat widget.
4. Publish the changes and verify ads/consent behavior in the live site. Follow the ad network's current privacy and consent requirements for visitors' regions.

This site currently has little editorial content, so it may not qualify yet. Consider adding genuinely useful original content and a privacy page before applying. Revenue depends on approval, visitor volume, geography, and ad engagement; it is not guaranteed. Never click your own ads, encourage visitors to click them, or place ads where accidental clicks are likely. Do not paste ad code from an untrusted source.
