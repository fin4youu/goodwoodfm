import Parser from 'rss-parser';

const parser = new Parser();

const RSS_FEEDS: Record<string, string> = {
  world: 'http://feeds.bbci.co.uk/news/world/rss.xml',
  uk: 'http://feeds.bbci.co.uk/news/uk/rss.xml',
  business: 'http://feeds.bbci.co.uk/news/business/rss.xml',
  technology: 'http://feeds.bbci.co.uk/news/technology/rss.xml',
  entertainment: 'http://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml',
  health: 'http://feeds.bbci.co.uk/news/health/rss.xml',
  science: 'http://feeds.bbci.co.uk/news/science_and_environment/rss.xml',
};

export default async function handler(req: any, res: any) {
  try {
    const category = req.query.category;
    const feedUrl = RSS_FEEDS[category] || RSS_FEEDS['world'];
    
    const feed = await parser.parseURL(feedUrl);
    
    const articles = feed.items.slice(0, 10).map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      contentSnippet: item.contentSnippet,
      guid: item.guid,
    }));
    
    res.status(200).json({ articles });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
