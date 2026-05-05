# Portfolio Backend API

Simple Express server that proxies chat requests to the Anthropic API, keeping your API key secure.

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure your API key
```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your Anthropic API key
# Get it from: https://console.anthropic.com/
```

Your `.env` file should look like:
```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxx
PORT=3001
```

### 3. Start the server
```bash
npm start
# or for auto-reload during development:
npm run dev
```

The server will run on `http://localhost:3001`

## Update your frontend

Replace the `useChat.js` hook in your React app with the updated version:

**Location:** `src/hooks/useChat.js`

Copy the contents from `useChat-updated.js` (included in this backend folder) to your frontend's `src/hooks/useChat.js`.

The key change is that it now calls:
```javascript
fetch('http://localhost:3001/api/chat', ...)
```
Instead of calling Anthropic directly.

## Testing

1. **Health check:**
   ```bash
   curl http://localhost:3001/health
   ```
   Should return: `{"status":"ok","message":"Backend is running"}`

2. **Test chat:**
   Start your React app (`npm run dev` in the portfolio folder)
   Click "Ask AI About Me" and send a message

## Deployment

When deploying to production:

1. **Backend:**
   - Deploy to a service like Railway, Render, or Vercel
   - Set the `ANTHROPIC_API_KEY` environment variable in your hosting platform
   - Note the deployed URL (e.g., `https://your-backend.railway.app`)

2. **Frontend:**
   - Update `BACKEND_URL` in `useChat.js` to your deployed backend URL
   - Deploy your React app normally

## Endpoints

### `GET /health`
Health check endpoint

### `POST /api/chat`
Send chat messages to the AI

**Request body:**
```json
{
  "messages": [
    { "role": "user", "content": "What's your email?" }
  ],
  "system": "You are a helpful assistant..."
}
```

**Response:**
```json
{
  "content": [
    { "type": "text", "text": "My email is..." }
  ]
}
```

## Security Notes

- ✅ API key is stored server-side only (in `.env`)
- ✅ Never exposed to the frontend/browser
- ✅ CORS enabled (update origins in production for tighter security)
- ⚠️ Add rate limiting for production use
- ⚠️ Consider adding authentication for your API endpoints
