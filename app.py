"""
Max Azlon Fashion Home - Flask Backend
Luxury Fashion Landing Page with Brevo Email Integration
"""

import os
import re
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import requests

# Load environment variables
load_dotenv()

app = Flask(__name__, 
            static_folder='static',
            template_folder='templates')
CORS(app)

# Configuration
BREVO_API_KEY = os.getenv('BREVO_API_KEY')
BREVO_SENDER_EMAIL = os.getenv('BREVO_SENDER_EMAIL', 'noreply@maxazlonfashion.com')
RECIPIENT_EMAIL = os.getenv('RECIPIENT_EMAIL', 'info@maxazlonfashion.com')


def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


def validate_phone(phone):
    """Validate phone number (basic validation)"""
    # Remove spaces, dashes, and parentheses
    cleaned = re.sub(r'[\s\-\(\)]', '', phone)
    # Check if it starts with + and has digits
    pattern = r'^\+?[0-9]{10,15}$'
    return re.match(pattern, cleaned) is not None


def sanitize_input(text):
    """Sanitize user input to prevent XSS"""
    if not text:
        return ''
    # Remove HTML tags
    clean = re.sub(r'<[^>]+>', '', text)
    # Escape special characters
    clean = clean.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    return clean.strip()


@app.route('/')
def home():
    """Render the main landing page"""
    return render_template('index.html')


@app.route('/api/contact', methods=['POST'])
def contact_form():
    """Handle contact form submission and send email via Brevo API"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'message': 'No data provided'
            }), 400
        
        # Extract and sanitize form data
        full_name = sanitize_input(data.get('fullName', ''))
        email = sanitize_input(data.get('email', ''))
        phone = sanitize_input(data.get('phone', ''))
        interest = sanitize_input(data.get('interest', ''))
        outfit_type = sanitize_input(data.get('outfitType', ''))
        message = sanitize_input(data.get('message', ''))
        
        # Validate required fields
        if not full_name or len(full_name) < 2:
            return jsonify({
                'success': False,
                'message': 'Please enter a valid full name'
            }), 400
        
        if not email or not validate_email(email):
            return jsonify({
                'success': False,
                'message': 'Please enter a valid email address'
            }), 400
        
        if not phone or not validate_phone(phone):
            return jsonify({
                'success': False,
                'message': 'Please enter a valid phone number'
            }), 400
        
        if not interest:
            return jsonify({
                'success': False,
                'message': 'Please select your fashion interest'
            }), 400
        
        if not outfit_type:
            return jsonify({
                'success': False,
                'message': 'Please select your preferred outfit type'
            }), 400
        
        if not message or len(message) < 10:
            return jsonify({
                'success': False,
                'message': 'Please enter a message (at least 10 characters)'
            }), 400
        
        # Send email via Brevo API (if API key is configured)
        if BREVO_API_KEY:
            send_brevo_email(
                full_name=full_name,
                email=email,
                phone=phone,
                interest=interest,
                outfit_type=outfit_type,
                message=message
            )
        
        # Return success response
        return jsonify({
            'success': True,
            'message': 'Thank you! Your message has been sent successfully.'
        }), 200
        
    except Exception as e:
        print(f"Error processing contact form: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Something went wrong. Please try again later.'
        }), 500


def send_brevo_email(full_name, email, phone, interest, outfit_type, message):
    """Send email using Brevo (Sendinblue) API"""
    
    # Format the email content
    subject = f"New Inquiry from {full_name} - Max Azlon Fashion Home"
    
    html_content = f"""
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #d4af37 0%, #f1d46a 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
            .header h1 {{ color: #0a0a0a; margin: 0; font-size: 24px; }}
            .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
            .field {{ margin-bottom: 20px; }}
            .label {{ font-weight: bold; color: #d4af37; display: block; margin-bottom: 5px; }}
            .value {{ color: #333; }}
            .footer {{ text-align: center; margin-top: 30px; color: #888; font-size: 14px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>✨ New Customer Inquiry</h1>
                <p style="color: #0a0a0a; margin: 10px 0 0 0;">Max Azlon Fashion Home</p>
            </div>
            <div class="content">
                <div class="field">
                    <span class="label">Full Name:</span>
                    <span class="value">{full_name}</span>
                </div>
                <div class="field">
                    <span class="label">Email Address:</span>
                    <span class="value">{email}</span>
                </div>
                <div class="field">
                    <span class="label">Phone Number:</span>
                    <span class="value">{phone}</span>
                </div>
                <div class="field">
                    <span class="label">Fashion Interest:</span>
                    <span class="value">{interest.replace('-', ' ').title()}</span>
                </div>
                <div class="field">
                    <span class="label">Preferred Outfit Type:</span>
                    <span class="value">{outfit_type.replace('-', ' ').title()}</span>
                </div>
                <div class="field">
                    <span class="label">Message:</span>
                    <span class="value">{message}</span>
                </div>
                <div class="footer">
                    <p>This inquiry was submitted through the Max Azlon Fashion Home website.</p>
                    <p>Harmony House Plaza, Woji Rd, Port Harcourt, Rivers State</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    """
    
    # Brevo API endpoint
    url = "https://api.brevo.com/v3/smtp/email"
    
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": BREVO_API_KEY
    }
    
    payload = {
        "sender": {
            "name": "Max Azlon Fashion Home",
            "email": BREVO_SENDER_EMAIL
        },
        "to": [
            {
                "email": RECIPIENT_EMAIL,
                "name": "Max Azlon Team"
            }
        ],
        "subject": subject,
        "htmlContent": html_content,
        "replyTo": {
            "email": email,
            "name": full_name
        }
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        print(f"Email sent successfully to {RECIPIENT_EMAIL}")
        return True
    except requests.exceptions.RequestException as e:
        print(f"Failed to send email via Brevo: {str(e)}")
        return False


@app.route('/health')
def health_check():
    """Health check endpoint for monitoring"""
    return jsonify({
        'status': 'healthy',
        'service': 'Max Azlon Fashion Home',
        'version': '1.0.0'
    }), 200


if __name__ == '__main__':
    # Get port from environment or use default
    port = int(os.getenv('PORT', 5000))
    
    # Run the app
    app.run(
        host='0.0.0.0',
        port=port,
        debug=os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    )
