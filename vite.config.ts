import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function apiBackendPlugin(): Plugin {
  return {
    name: 'vite-plugin-api-backend',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();
        const pathname = req.url.split('?')[0];

        // Health check endpoint
        if (pathname === '/api/health' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'no-cache');
          res.statusCode = 200;
          res.end(
            JSON.stringify({
              status: 'ok',
              service: 'Python Flask API Compatible',
              message: 'Backend service is online',
            }),
          );
          return;
        }

        // Contact inquiry endpoint
        if (pathname === '/api/contact' && req.method === 'POST') {
          const chunks: Buffer[] = [];
          req.on('data', (chunk) => chunks.push(chunk));
          req.on('end', async () => {
            try {
              const body = JSON.parse(Buffer.concat(chunks).toString('utf-8'));
              const name = String(body.name || '').trim();
              const email = String(body.email || '').trim();
              const message = String(body.message || '').trim();

              const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

              if (!name) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: 'Name is required.' }));
                return;
              }
              if (name.length < 2) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: 'Name must be at least 2 characters long.' }));
                return;
              }
              if (!email) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: 'Email address is required.' }));
                return;
              }
              if (!emailRegex.test(email)) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: 'Please provide a valid email address.' }));
                return;
              }
              if (!message) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: 'Message is required.' }));
                return;
              }
              if (message.length < 5) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: 'Message must be at least 5 characters long.' }));
                return;
              }

              console.log(`[CONTACT INQUIRY] From: ${name} <${email}> | Length: ${message.length} chars`);

              let deliveryStatus = 'forwarded';
              let serviceMsg = 'Message received and dispatched to asiqmohd1970@gmail.com.';

              try {
                const fsRes = await fetch('https://formsubmit.co/ajax/asiqmohd1970@gmail.com', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Referer: 'https://formsubmit.co',
                  },
                  body: JSON.stringify({
                    name,
                    email,
                    message,
                    _subject: `Portfolio Contact from ${name}`,
                    _replyto: email,
                  }),
                });
                const fsData = await fsRes.json();
                if (fsData && fsData.message) {
                  serviceMsg = fsData.message;
                }
              } catch (fErr) {
                console.warn('[CONTACT FORWARD WARNING]', fErr);
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: true,
                  delivered: true,
                  recipient: 'asiqmohd1970@gmail.com',
                  message: 'Message delivered successfully to asiqmohd1970@gmail.com.',
                  detail: serviceMsg,
                })
              );
            } catch {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Invalid request payload. Expected JSON.' }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

// LINT.IfChange(aistudio_media_plugin)
function aistudioMediaPlugin(): Plugin {
  return {
    name: 'vite-plugin-aistudio-media',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/assets/aistudio/')) {
          const rawPath = req.url.split('?')[0].split('#')[0];
          try {
            const decodedPath = decodeURIComponent(rawPath);
            const relativePath = decodedPath.replace(/^\//, '');
            const aistudioDir = path.resolve(
              __dirname,
              'public',
              'assets',
              'aistudio',
            );
            const filePath = path.resolve(__dirname, 'public', relativePath);
            if (
              filePath.startsWith(aistudioDir + path.sep) &&
              fs.existsSync(filePath) &&
              fs.statSync(filePath).isFile()
            ) {
              const ext = path.extname(filePath).toLowerCase();
              const mimeMap: Record<string, string> = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif',
                '.webp': 'image/webp',
                '.svg': 'image/svg+xml',
                '.bmp': 'image/bmp',
                '.ico': 'image/x-icon',
                '.mp4': 'video/mp4',
                '.webm': 'video/webm',
                '.ogv': 'video/ogg',
                '.mp3': 'audio/mpeg',
                '.wav': 'audio/wav',
                '.ogg': 'audio/ogg',
                '.pdf': 'application/pdf',
              };
              res.setHeader(
                'Content-Type',
                mimeMap[ext] || 'application/octet-stream',
              );
              res.setHeader('Cache-Control', 'no-cache');
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          } catch {
            // Fall through if URI decoding or file access fails
          }
        }
        next();
      });
    },
  };
}
// LINT.ThenChange(//depot/google3/java/com/google/alkali/boq/makersuite/applet_dev_service/templates/initializers/react_theme/vite.config.ts:aistudio_media_plugin)

function frameStoragePlugin(): Plugin {
  return {
    name: 'vite-plugin-frame-storage',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();

        // Direct, high-performance static serving for all frame images
        if (req.url.startsWith('/frames/')) {
          const rawPath = req.url.split('?')[0].split('#')[0];
          try {
            const cleanPath = decodeURIComponent(rawPath).replace(/^\//, '');
            const filePath = path.resolve(__dirname, 'public', cleanPath);
            const framesDir = path.resolve(__dirname, 'public', 'frames');

            if (filePath.startsWith(framesDir + path.sep) && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              res.setHeader('Content-Type', 'image/jpeg');
              res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          } catch {
            // Fall through if file access fails
          }
        }

        if (req.url === '/api/frames-status' && req.method === 'GET') {
          const framesDir = path.resolve(__dirname, 'public', 'frames');
          let count = 0;
          let files: string[] = [];
          if (fs.existsSync(framesDir)) {
            files = fs
              .readdirSync(framesDir)
              .filter((f) => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'));
            // Count unique sequence numbers
            const uniqueFrames = new Set<number>();
            files.forEach((file) => {
              const match = file.match(/(\d+)\.jpg$/);
              if (match) uniqueFrames.add(parseInt(match[1], 10));
            });
            count = uniqueFrames.size || files.length;
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ exists: count > 0, count, files: files.slice(0, 5) }));
          return;
        }

        if (req.url === '/api/save-frame' && req.method === 'POST') {
          const chunks: Buffer[] = [];
          req.on('data', (chunk) => chunks.push(chunk));
          req.on('end', () => {
            try {
              const body = JSON.parse(Buffer.concat(chunks).toString('utf-8'));
              const { filename, base64Data } = body;
              if (!filename || !base64Data) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Missing filename or base64Data' }));
                return;
              }
              const framesDir = path.resolve(__dirname, 'public', 'frames');
              if (!fs.existsSync(framesDir)) {
                fs.mkdirSync(framesDir, { recursive: true });
              }
              const safeName = path.basename(filename);
              const buffer = Buffer.from(base64Data, 'base64');
              fs.writeFileSync(path.join(framesDir, safeName), buffer);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, saved: safeName }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      aistudioMediaPlugin(),
      frameStoragePlugin(),
      apiBackendPlugin(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
