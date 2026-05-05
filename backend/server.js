import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running with Groq' });
});

app.post('/api/chat', async (req, res) => {
  try {
    if (!GROQ_API_KEY || GROQ_API_KEY === 'your_groq_api_key_here') {
      return res.status(500).json({
        error: 'API key not configured. Set GROQ_API_KEY in .env',
      });
    }

    const { messages, system } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request: messages array required' });
    }

    const groqMessages = system
      ? [{ role: 'system', content: system }, ...messages]
      : messages;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: groqMessages,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Groq API error:', errorData);
      return res.status(response.status).json({
        error: errorData.error?.message || 'Failed to get response from AI',
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'Sorry, something went wrong.';

    res.json({
      content: [{ type: 'text', text: reply }],
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
});

app.post('/api/chat/stream', async (req, res) => {
  try {
    if (!GROQ_API_KEY || GROQ_API_KEY === 'your_groq_api_key_here') {
      return res.status(500).json({
        error: 'API key not configured. Set GROQ_API_KEY in .env',
      });
    }

    const { messages, system } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request: messages array required' });
    }

    const groqMessages = system
      ? [{ role: 'system', content: system }, ...messages]
      : messages;

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: groqMessages,
        max_tokens: 1000,
        temperature: 0.7,
        stream: true,
      }),
    });

    if (!groqResponse.ok) {
      const errorData = await groqResponse.json().catch(() => ({}));
      console.error('Groq stream error:', errorData);
      return res.status(groqResponse.status).json({
        error: errorData.error?.message || 'Failed to get stream from AI',
      });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    const reader = groqResponse.body?.getReader();
    if (!reader) {
      return res.status(500).json({ error: 'No stream available from Groq' });
    }

    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    const pump = async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        buffer += decoder.decode(value, { stream: true });

        const pieces = buffer.split(/\r?\n\r?\n/);
        buffer = pieces.pop();

        for (const piece of pieces) {
          const line = piece.trim();
          if (!line.startsWith('data:')) continue;

          const payload = line.replace(/^data:\s*/, '');
          if (!payload || payload === '[DONE]') {
            res.write('data: [DONE]\n\n');
            res.end();
            return;
          }

          try {
            const parsed = JSON.parse(payload);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              res.write(`data: ${delta}\n\n`);
            }
          } catch {
            res.write(`data: ${payload}\n\n`);
          }
        }
      }

      if (buffer.trim()) {
        res.write(`data: ${buffer.trim()}\n\n`);
      }

      res.write('data: [DONE]\n\n');
      res.end();
    };

    pump().catch((err) => {
      console.error('Stream pump error:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Stream failure' });
      } else {
        res.end();
      }
    });
  } catch (error) {
    console.error('Stream server error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error', message: error.message });
    } else {
      res.end();
    }
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`🤖 Using Groq API (Llama 3.3 70B)`);

  if (!GROQ_API_KEY || GROQ_API_KEY === 'your_groq_api_key_here') {
    console.warn('⚠️  WARNING: GROQ_API_KEY not set in .env file!');
    console.warn('   Get your free API key from: https://console.groq.com/');
  }
});