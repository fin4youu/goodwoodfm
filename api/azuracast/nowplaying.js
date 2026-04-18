export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const response = await fetch('https://radio.finwuh.uk/api/nowplaying/1');
    if (!response.ok) {
      throw new Error(`Upstream returned ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Vercel Proxy Error:", error);
    res.status(500).json({ error: 'Failed to fetch radio data', details: error.message });
  }
}
