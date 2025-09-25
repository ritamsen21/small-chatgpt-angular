require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const OPENAI_KEY = process.env.OPENAI_API_KEY; // set in env

if (!OPENAI_KEY) {
  console.warn('OPENAI_API_KEY not set. Server will still run but requests will fail.');
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const payload = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message }
      ],
      max_tokens: 400
    };

    const r = await axios.post('https://api.openai.com/v1/chat/completions', payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      }
    });

    const reply = r.data.choices?.[0]?.message?.content || 'No reply';
    res.json({ reply });
  } catch (err) {
    console.error(err?.response?.data || err.message || err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
