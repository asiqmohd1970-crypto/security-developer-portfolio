import os
import re
import smtplib
import json
import urllib.request
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Blueprint, request, jsonify

contact_bp = Blueprint('contact', __name__)

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
DEFAULT_RECIPIENT = os.environ.get('RECIPIENT_EMAIL', 'asiqmohd1970@gmail.com')

def send_via_smtp(name: str, sender_email: str, message_body: str) -> bool:
    """Send email directly via SMTP if configured in .env"""
    smtp_user = os.environ.get('SMTP_USER')
    smtp_pass = os.environ.get('SMTP_PASS')
    smtp_host = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
    smtp_port = int(os.environ.get('SMTP_PORT', 587))
    recipient = os.environ.get('RECIPIENT_EMAIL', DEFAULT_RECIPIENT)

    if not smtp_user or not smtp_pass:
        return False

    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"Portfolio Inquiry from {name}"
        msg['From'] = f"{name} <{smtp_user}>"
        msg['To'] = recipient
        msg['Reply-To'] = sender_email

        plain_text = f"New message from {name} ({sender_email}):\n\n{message_body}"
        html_text = f"""
        <html>
          <body style="font-family: Arial, sans-serif; color: #1e293b; line-height: 1.6;">
            <h2 style="color: #0891b2;">New Portfolio Inquiry</h2>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> <a href="mailto:{sender_email}">{sender_email}</a></p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #0891b2;">
              <p style="white-space: pre-wrap; margin: 0;">{message_body}</p>
            </div>
          </body>
        </html>
        """

        msg.attach(MIMEText(plain_text, 'plain'))
        msg.attach(MIMEText(html_text, 'html'))

        if smtp_port == 465:
            server = smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=10)
        else:
            server = smtplib.SMTP(smtp_host, smtp_port, timeout=10)
            server.starttls()

        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, [recipient], msg.as_string())
        server.quit()
        print(f"[SMTP DISPATCH] Successfully delivered email to {recipient}")
        return True
    except Exception as ex:
        print(f"[SMTP ERROR] Failed to send via SMTP: {ex}")
        return False

def forward_to_formsubmit(name: str, sender_email: str, message_body: str) -> dict:
    """Forward message to FormSubmit service targeting recipient email"""
    recipient = os.environ.get('RECIPIENT_EMAIL', DEFAULT_RECIPIENT)
    url = f"https://formsubmit.co/ajax/{recipient}"
    payload = json.dumps({
        'name': name,
        'email': sender_email,
        'message': message_body,
        '_subject': f"Portfolio Contact from {name}",
        '_replyto': sender_email,
    }).encode('utf-8')

    req = urllib.request.Request(
        url,
        data=payload,
        headers={
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'Portfolio-Flask-Backend/1.0',
            'Referer': f'mailto:{recipient}'
        }
    )

    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            return data
    except Exception as ex:
        print(f"[FORMSUBMIT FORWARD ERROR] {ex}")
        return {"success": False, "error": str(ex)}

@contact_bp.route('/contact', methods=['POST'])
def handle_contact():
    try:
        data = request.get_json(silent=True)
        if not data or not isinstance(data, dict):
            return jsonify({
                "success": False,
                "error": "Invalid request payload. Expected JSON."
            }), 400

        name = str(data.get('name', '')).strip()
        email = str(data.get('email', '')).strip()
        message = str(data.get('message', '')).strip()

        # Validation
        if not name:
            return jsonify({
                "success": False,
                "error": "Name is required."
            }), 400
        if len(name) < 2:
            return jsonify({
                "success": False,
                "error": "Name must be at least 2 characters long."
            }), 400

        if not email:
            return jsonify({
                "success": False,
                "error": "Email address is required."
            }), 400
        if not EMAIL_REGEX.match(email):
            return jsonify({
                "success": False,
                "error": "Please provide a valid email address."
            }), 400

        if not message:
            return jsonify({
                "success": False,
                "error": "Message is required."
            }), 400
        if len(message) < 5:
            return jsonify({
                "success": False,
                "error": "Message must be at least 5 characters long."
            }), 400

        print(f"[CONTACT INQUIRY] From: {name} <{email}> | Length: {len(message)} chars")

        # 1. Try sending via configured SMTP first
        delivered_smtp = send_via_smtp(name, email, message)

        # 2. If SMTP is not configured, forward to FormSubmit
        forward_result = {}
        if not delivered_smtp:
            forward_result = forward_to_formsubmit(name, email, message)

        recipient = os.environ.get('RECIPIENT_EMAIL', DEFAULT_RECIPIENT)
        return jsonify({
            "success": True,
            "delivered": delivered_smtp or (forward_result.get('success') in [True, 'true']),
            "recipient": recipient,
            "message": f"Message transmitted successfully to {recipient}.",
            "service_detail": forward_result.get('message', 'Processed')
        }), 200

    except Exception as e:
        print(f"[CONTACT ERROR] {str(e)}")
        return jsonify({
            "success": False,
            "error": "An internal server error occurred. Please try again later."
        }), 500
