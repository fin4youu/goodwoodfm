import axios from 'axios';

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

     const response = await axios.get(`${url}/api/station/${stationId}/streamers`, {
         headers: {
             'X-API-Key': apiKey
         }
     });

     res.status(200).json({ configured: true, streamers: response.data, serverUrl: url, stationId });
  } catch (err: any) {
      if (err.response && err.response.status === 404) {
          return res.status(200).json({ 
             configured: true, 
             streamers: [],
             serverUrl: 'https://radio.finwuh.uk',
             stationId: '1',
             message: 'API Key active but Streamers endpoint failed (404).'
          });
      }
      console.error('Error fetching from Azuracast:', err.message);
      res.status(500).json({ error: 'Failed to connect to AzuraCast' });
  }
}
