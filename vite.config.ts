import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'api-server-proxy',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/generate' && req.method === 'POST') {
              let body = '';
              req.on('data', chunk => {
                body += chunk;
              });
              req.on('end', async () => {
                try {
                  const data = JSON.parse(body || '{}');
                  const apiKey = process.env.GEMINI_API_KEY;
                  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(
                      JSON.stringify({
                        available: false,
                        message: 'API key belum disetel, beralih ke simulasi lokal cerdas.',
                      })
                    );
                    return;
                  }

                  const { GoogleGenAI } = await import('@google/genai');
                  const ai = new GoogleGenAI({ apiKey });
                  const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: data.prompt,
                  });

                  res.setHeader('Content-Type', 'application/json');
                  res.end(
                    JSON.stringify({
                      available: true,
                      text: response.text,
                    })
                  );
                } catch (err: any) {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(
                    JSON.stringify({
                      available: false,
                      error: err.message,
                    })
                  );
                }
              });
            } else {
              next();
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
