import os
import sys
import json
import re
from http.server import HTTPServer, BaseHTTPRequestHandler

# Ensure backend directory is in sys.path
backend_dir = os.path.dirname(os.path.abspath(__file__))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')

# Try importing Flask stack; fallback to standard library if Flask is not installed
try:
    from flask import Flask, jsonify
    from flask_cors import CORS
    from dotenv import load_dotenv
    from routes.contact import contact_bp
    load_dotenv()
    HAS_FLASK = True
except ImportError:
    HAS_FLASK = False

if HAS_FLASK:
    def create_app():
        app = Flask(__name__)

        # Configure CORS for Vite development server
        CORS(
            app,
            resources={
                r"/api/*": {
                    "origins": [
                        "http://localhost:3000",
                        "http://127.0.0.1:3000",
                        "http://localhost:5173",
                        "http://127.0.0.1:5173",
                        "*",
                    ],
                    "methods": ["GET", "POST", "OPTIONS"],
                    "allow_headers": ["Content-Type", "Authorization"],
                }
            },
        )

        # Health check endpoint
        @app.route('/api/health', methods=['GET'])
        def health_check():
            return jsonify({
                "status": "ok"
            }), 200

        # Register blueprints
        app.register_blueprint(contact_bp, url_prefix='/api')

        # Global 404 handler
        @app.errorhandler(404)
        def not_found(e):
            return jsonify({
                "status": "error",
                "message": "Resource not found"
            }), 404

        # Global 500 handler
        @app.errorhandler(500)
        def server_error(e):
            return jsonify({
                "status": "error",
                "message": "Internal server error"
            }), 500

        return app

    app = create_app()
else:
    app = None

class StandaloneHandler(BaseHTTPRequestHandler):
    def _send_cors(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    def do_OPTIONS(self):
        self.send_response(204)
        self._send_cors()
        self.end_headers()

    def do_GET(self):
        pathname = self.path.split('?')[0]
        if pathname == '/api/health':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self._send_cors()
            self.end_headers()
            self.wfile.write(json.dumps({"status": "ok", "service": "Python Flask API Compatible"}).encode('utf-8'))
        else:
            self.send_response(404)
            self.send_header('Content-Type', 'application/json')
            self._send_cors()
            self.end_headers()
            self.wfile.write(json.dumps({"status": "error", "message": "Resource not found"}).encode('utf-8'))

    def do_POST(self):
        pathname = self.path.split('?')[0]
        if pathname == '/api/contact':
            content_len = int(self.headers.get('Content-Length', 0))
            post_body = self.rfile.read(content_len).decode('utf-8') if content_len > 0 else '{}'
            try:
                data = json.loads(post_body)
            except Exception:
                data = {}

            name = str(data.get('name', '')).strip()
            email = str(data.get('email', '')).strip()
            message = str(data.get('message', '')).strip()

            if not name or len(name) < 2:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self._send_cors()
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": "Name must be at least 2 characters long."}).encode('utf-8'))
                return

            if not email or not EMAIL_REGEX.match(email):
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self._send_cors()
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": "Please provide a valid email address."}).encode('utf-8'))
                return

            if not message or len(message) < 5:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self._send_cors()
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": "Message must be at least 5 characters long."}).encode('utf-8'))
                return

            print(f"[CONTACT INQUIRY] From: {name} <{email}> | Length: {len(message)} chars")

            recipient = os.environ.get('RECIPIENT_EMAIL', 'asiqmohd1970@gmail.com')
            try:
                import urllib.request
                req = urllib.request.Request(
                    f"https://formsubmit.co/ajax/{recipient}",
                    data=json.dumps({
                        'name': name,
                        'email': email,
                        'message': message,
                        '_subject': f"Portfolio Contact from {name}",
                        '_replyto': email,
                    }).encode('utf-8'),
                    headers={
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'User-Agent': 'Portfolio-Python-Server/1.0',
                        'Referer': f'mailto:{recipient}',
                    }
                )
                with urllib.request.urlopen(req, timeout=8) as resp:
                    pass
            except Exception as f_err:
                print(f"[STANDALONE FORWARD ERROR] {f_err}")

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self._send_cors()
            self.end_headers()
            self.wfile.write(json.dumps({
                "success": True,
                "recipient": recipient,
                "message": f"Message transmitted successfully to {recipient}."
            }).encode('utf-8'))
        else:
            self.send_response(404)
            self.send_header('Content-Type', 'application/json')
            self._send_cors()
            self.end_headers()
            self.wfile.write(json.dumps({"status": "error", "message": "Resource not found"}).encode('utf-8'))

    def log_message(self, format, *args):
        pass

if __name__ == '__main__':
    port = int(os.environ.get('FLASK_PORT', 5000))
    host = os.environ.get('HOST', '0.0.0.0')
    if HAS_FLASK and app:
        debug = os.environ.get('FLASK_DEBUG', 'False').lower() in ('true', '1', 't')
        print(f"Starting Python Flask backend on http://{host}:{port}")
        app.run(host=host, port=port, debug=debug)
    else:
        print(f"Starting Python Standalone HTTP backend on http://{host}:{port}")
        server = HTTPServer((host, port), StandaloneHandler)
        server.serve_forever()
