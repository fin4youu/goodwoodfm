import axios from 'axios';

export default async function handler(req: any, res: any) {
  try {
     const url = 'https://radio.finwuh.uk';
     const stationId = '1';

     const response = await axios.get(`${url}/api/nowplaying/${stationId}`);
     res.status(200).json(response.data);
  } catch (err: any) {
      if (err.response && err.response.status === 404) {
          return res.status(200).json({
             station: { listen_url: '' },
             listeners: { total: 0 },
             live: { is_live: false, streamer_name: '' },
             now_playing: { song: { title: 'Radio Offline', artist: 'System', art: '' }, elapsed: 0, duration: 10, remaining: 10 }
          });
      }
      console.error('Radio Fetch error via Azuracast proxy:', err.message, err.response?.data);
      res.status(500).json({ error: 'Failed to fetch radio data' });
  }
}
