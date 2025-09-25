# Small ChatGPT-like Angular + Express App

Minimal Angular (client) + Express (server) example that acts as a small ChatGPT-like app.
See `client/` for Angular source and `server/` for proxy server that forwards requests to OpenAI.
**Do not commit secrets** — keep your API keys in `.env` (already in .gitignore).

## Quick start
1. Start the server:
   ```bash
   cd server
   npm install
   export OPENAI_API_KEY="sk-..."
   npm start
   ```

2. Start client:
   ```bash
   cd client
   npm install
   npm start
   ```

3. Open http://localhost:4200

## To push to GitHub
```bash
git init
git add .
git commit -m "initial small-chatgpt angular + express"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

