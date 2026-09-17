import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const PORT = 3000;
const DATA_FILE = path.join(process.cwd(), 'data', 'site-config.json');

interface SiteConfig {
  links: {
    android: string;
    ios: string;
    pc: string;
    pc32: string;
    mac: string;
    web: string;
  };
  siteTexts: any;
  adsense: any;
  seo: any;
  analytics: {
    totalVisits: number;
    totalDownloads: number;
    mobileDownloads: number;
    pcDownloads: number;
  };
  updatedAt: string;
}

const DEFAULT_CONFIG: SiteConfig = {
  links: {
    android: '',
    ios: '',
    pc: '',
    pc32: '',
    mac: '',
    web: '',
  },
  siteTexts: null,
  adsense: null,
  seo: null,
  analytics: {
    totalVisits: 0,
    totalDownloads: 0,
    mobileDownloads: 0,
    pcDownloads: 0,
  },
  updatedAt: new Date().toISOString(),
};

function readConfig(): SiteConfig {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_CONFIG,
        ...parsed,
        links: {
          ...DEFAULT_CONFIG.links,
          ...(parsed.links || {}),
        },
        analytics: {
          ...DEFAULT_CONFIG.analytics,
          ...(parsed.analytics || {}),
        },
      };
    }
  } catch (err) {
    console.error('Erè lekti data/site-config.json:', err);
  }
  return DEFAULT_CONFIG;
}

function saveConfig(config: SiteConfig): boolean {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(config, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Erè ekriti data/site-config.json:', err);
    return false;
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Get full server-persisted site configuration (available to all visitors)
  app.get('/api/config', (_req, res) => {
    const config = readConfig();
    res.json(config);
  });

  // Update download links permanently on server for all users & devices
  app.post('/api/config/links', (req, res) => {
    const current = readConfig();
    const updatedLinks = {
      ...current.links,
      ...(req.body || {}),
    };
    current.links = updatedLinks;
    current.updatedAt = new Date().toISOString();
    saveConfig(current);
    res.json({ success: true, links: current.links });
  });

  // Update site texts permanently on server
  app.post('/api/config/texts', (req, res) => {
    const current = readConfig();
    current.siteTexts = req.body;
    current.updatedAt = new Date().toISOString();
    saveConfig(current);
    res.json({ success: true, siteTexts: current.siteTexts });
  });

  // Update AdSense config permanently on server
  app.post('/api/config/adsense', (req, res) => {
    const current = readConfig();
    current.adsense = req.body;
    current.updatedAt = new Date().toISOString();
    saveConfig(current);
    res.json({ success: true, adsense: current.adsense });
  });

  // Update SEO config permanently on server
  app.post('/api/config/seo', (req, res) => {
    const current = readConfig();
    current.seo = req.body;
    current.updatedAt = new Date().toISOString();
    saveConfig(current);
    res.json({ success: true, seo: current.seo });
  });

  // Track page visits permanently on server
  app.post('/api/analytics/visit', (_req, res) => {
    const current = readConfig();
    current.analytics.totalVisits = (current.analytics.totalVisits || 0) + 1;
    saveConfig(current);
    res.json({ success: true, analytics: current.analytics });
  });

  // Track downloads permanently on server
  app.post('/api/analytics/download', (req, res) => {
    const { platform } = req.body || {};
    const current = readConfig();
    current.analytics.totalDownloads = (current.analytics.totalDownloads || 0) + 1;
    if (platform === 'mobile') {
      current.analytics.mobileDownloads = (current.analytics.mobileDownloads || 0) + 1;
    } else {
      current.analytics.pcDownloads = (current.analytics.pcDownloads || 0) + 1;
    }
    saveConfig(current);
    res.json({ success: true, analytics: current.analytics });
  });

  // Vite middleware for development vs static dist serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`OmniChurch server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
});
