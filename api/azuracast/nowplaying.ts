export default async function handler(req: any, res: any) {
  try {
     const url = 'https://radio.finwuh.uk';
     const stationId = '1';

     const response = await fetch(`${url}/api/nowplaying/${stationId}`);
     
     if (!response.ok) {
         if (response.status === 404) {
             return res.status(200).json({
                 station: { listen_url: '' },
                 listeners: { total: 0 },
                 live: { is_live: false, streamer_name: '' },
                 now_playing: { song: { title: 'Radio Offline', artist: 'System', art: '' }, elapsed: 0, duration: 10, remaining: 10 }
             });
         }
         throw new Error(`HTTP error! status: ${response.status}`);
     }
     
     const data = await response.json();
     res.status(200).json(data);
  } catch (err: any) {
      console.error('Radio Fetch error via Azuracast proxy:', err.message);
      res.status(500).json({ error: 'Failed to fetch radio data' });
  }
}
