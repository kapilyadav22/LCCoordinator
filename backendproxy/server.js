import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

import { LEETCODE, CODEFORCES } from '../src/constants/urlConstants.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/leetcode', async (req, res) => {
  try {
    const response = await fetch(LEETCODE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from LeetCode' });
  }
});

app.get('/api/codeforces/:username', async (req, res) => {
    const { username } = req.params;
    try {
      const response = await fetch(`${CODEFORCES}${username}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching data from Codeforces' });
    }
  });

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
