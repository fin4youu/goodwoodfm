export default async function handler(req: any, res: any) {
  try {
     const url = 'https://radio.finwuh.uk';
     const apiKey = process.env.VITE_AZURACAST_API_KEY || process.env.AZURACAST_API_KEY;
     const stationId = '1';

     if (!apiKey) {
         return res.status(200).json({ 
             configured: false, 
             streamers: [],
             serverUrl: url,
             stationId,
             message: 'API Key not configured. Using placeholder details.'
         });
     }

     const response = await fetch(`${url}/api/station/${stationId}/streamers`, {
         headers: {
             'X-API-Key': apiKey
         }
     });

     if (!response.ok) {
         if (response.status === 404) {
             return res.status(200).json({ 
                 configured: true, 
                 streamers: [],
                 serverUrl: 'https://radio.finwuh.uk',
                 stationId: '1',
                 message: 'API Key active but Streamers endpoint failed (404).'
             });
         }
         throw new Error(`HTTP error! status: ${response.status}`);
     }

     const data = await response.json();
     res.status(200).json({ configured: true, streamers: data, serverUrl: url, stationId });
  } catch (err: any) {
      console.error('Error fetching from Azuracast:', err.message);
      res.status(500).json({ error: 'Failed to connect to AzuraCast' });
  }
}
