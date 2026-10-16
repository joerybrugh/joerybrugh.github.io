# Bamboo & Bytes

A cozy panda-themed landing page, mini arcade, and optional community chat for **https://joerybrugh.github.io/**. The landing page and all three games are static and run on GitHub Pages. Firebase Realtime Database provides the live chat when configured. This site no longer includes a blog, stories, or story-publishing tools.

## Publish on GitHub Pages

1. Put `index.html`, `style.css`, `script.js`, `firebase-config.js`, and `database.rules.json` in the root of the `joerybrugh.github.io` repository.
2. Push the files to the `main` branch.
3. In GitHub, open **Settings → Pages**. Choose **Deploy from a branch**, select `main` and `/ (root)`, and save.
4. After deployment, open `https://joerybrugh.github.io/`.

There is no build step. For local testing, serve the folder over HTTP (for example, `npx http-server .`); JavaScript modules and Firebase do not work when opening the page as a `file://` URL.

## Optional: enable live chat with Firebase

GitHub Pages hosts static files and cannot run a chat server. Firebase Realtime Database supplies the realtime chat backend. Without Firebase configuration, the panda landing page and games work, and the chat explains that setup is needed.

1. The Firebase web app and Realtime Database URL for project `livechat-37001` are now entered in [`firebase-config.js`](./firebase-config.js), and chat is enabled in the site.
2. Under **Build → Authentication → Sign-in method**, enable **Anonymous** sign-in.
3. Paste [`database.rules.json`](./database.rules.json) into **Realtime Database → Rules** and publish. It allows signed-in users to read and post chat messages, limits names to 24 characters and messages to 240, and prevents editing existing messages.
4. In **Authentication → Settings → Authorized domains**, make sure `joerybrugh.github.io` is listed; add `localhost` for local testing.
5. Restrict the Firebase web API key's HTTP referrers in **Google Cloud Console → APIs & Services → Credentials** to `https://joerybrugh.github.io/*` and any local development origin.
6. Push the config changes and publish the database rules. The database URL has been reached, but the current database returned `permission_denied` when the site tried to read chat, so the rules still need to be published to this Firebase database. After publishing them, reload the site and open it in two browsers to verify messages appear in both without refreshing.

Firebase web configuration is visible to visitors by design; it is not a password. This public chat has no strong rate limiting or moderation, so avoid collecting sensitive personal information.

## What's included

- **Snack Snake:** use arrow keys or WASD.
- **Panda Pong:** use ↑/↓ or W/S; first to five points wins.
- **Noughts & Paws:** two players take turns; use Play again to reset.
- **Clearing chat:** Firebase anonymous authentication and realtime delivery to connected visitors when configured.
