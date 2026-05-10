"""
Max Azlon Fashion Home - Flask Backend
Luxury Fashion Landing Page with Brevo Email Integration
"""

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Configuration
BREVO_API_KEY = os.getenv('BREVO_API_KEY')
SENDER_EMAIL = os.getenv('SENDER_EMAIL', 'noreply@maxazlonfashion.com')
RECIPIENT_EMAIL = os.getenv('RECIPIENT_EMAIL', 'info@maxazlonfashion.com')
BUSINESS_NAME = 'Max Azlon Fashion Home'
BUSINESS_ADDRESS = 'Harmony House Plaza, Woji Rd, Port Harcourt'


@app.route('/')
def index():
    """Serve the main landing page"""
    return render_template('index.html')


@app.route('/api/send-email', methods=['POST'])
def send_email():
    """
    Handle contact form submission and send email via Brevo API
    
    Expected JSON payload:
    {
        "fullName": "John Doe",
        "email": "john@example.com",
        "phone": "+2348000000000",
        "interest": "female-wears",
        "outfitType": "dresses",
        "message": "I'm interested in..."
    }
    """
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['fullName', 'email', 'phone', 'interest', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'message': f'Missing required field: {field}'
                }), 400
        
        # Validate email format
        if not is_valid_email(data['email']):
            return jsonify({
                'success': False,
                'message': 'Invalid email address'
            }), 400
        
        # Validate phone number (Nigerian format)
        if not is_valid_phone(data['phone']):
            return jsonify({
                'success': False,
                'message': 'Invalid phone number. Please use Nigerian format.'
            }), 400
        
        # Send email via Brevo
        email_sent = send_via_brevo(data)
        
        if email_sent:
            return jsonify({
                'success': True,
                'message': 'Email sent successfully'
            }), 200
        else:
            return jsonify({
                'success': False,
                'message': 'Failed to send email'
            }), 500
            
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'An unexpected error occurred'
        }), 500


def send_via_brevo(data):
    """Send email using Brevo (Sendinblue) API"""
    
    if not BREVO_API_KEY:
        print("Warning: BREVO_API_KEY not configured")
        return False
    
    # Prepare email content
    subject = f"New Inquiry from {data['fullName']}"
    
    html_content = generate_email_html(data)
    text_content = generate_email_text(data)
    
    # Brevo API endpoint
    url = 'https://api.brevo.com/v3/smtp/email'
    
    headers = {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY
    }
    
    payload = {
        'sender': {
            'name': BUSINESS_NAME,
            'email': SENDER_EMAIL
        },
        'to': [
            {
                'email': RECIPIENT_EMAIL
            }
        ],
        'cc': [
            {
                'email': data['email'],
                'name': data['fullName']
            }
        ],
        'subject': subject,
        'htmlContent': html_content,
        'textContent': text_content
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        
        if response.status_code == 201:
            print(f"Email sent successfully to {RECIPIENT_EMAIL}")
            return True
        else:
            print(f"Brevo API error: {response.status_code} - {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"Request error: {str(e)}")
        return False


def generate_email_html(data):
    """Generate HTML email content"""
    
    interest_labels = {
        'female-wears': 'Female Wears',
        'luxury-dresses': 'Luxury Dresses',
        'casual-outfits': 'Casual Outfits',
        'accessories': 'Fashion Accessories',
        'trendy-collections': 'Trendy Collections',
        'boutique-styles': 'Boutique Styles',
        'other': 'Other'
    }
    
    outfit_labels = {
        'dresses': 'Dresses',
        'skirts': 'Skirts',
        'tops': 'Tops',
        'gowns': 'Gowns',
        'corporate': 'Corporate Wear',
        'traditional': 'Traditional',
        'other': 'Other'
    }
    
    return f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {{ 
            font-family: 'Poppins', Arial, sans-serif; 
            background: #f5f5f5; 
            padding: 20px; 
            margin: 0;
        }}
        .container {{ 
            max-width: 600px; 
            margin: 0 auto; 
            background: white; 
            border-radius: 10px; 
            overflow: hidden; 
            box-shadow: 0 5px 20px rgba(0,0,0,0.1); 
        }}
        .header {{ 
            background: linear-gradient(135deg, #d4af37 0%, #f1d46a 100%); 
            padding: 30px; 
            text-align: center; 
        }}
        .header h1 {{ 
            color: #0a0a0a; 
            margin: 0; 
            font-size: 24px; 
        }}
        .content {{ 
            padding: 30px; 
        }}
        .field {{ 
            margin-bottom: 20px; 
        }}
        .label {{ 
            color: #d4af37; 
            font-weight: 600; 
            text-transform: uppercase; 
            font-size: 12px; 
            letter-spacing: 1px; 
        }}
        .value {{ 
            color: #333; 
            font-size: 16px; 
            margin-top: 5px; 
            line-height: 1.6;
        }}
        .footer {{ 
            background: #0a0a0a; 
            color: white; 
            padding: 20px; 
            text-align: center; 
            font-size: 14px; 
        }}
        .divider {{
            height: 1px;
            background: #e0e0e0;
            margin: 20px 0;
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✨ New Customer Inquiry</h1>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">Full Name</div>
                <div class="value">{escape_html(data['fullName'])}</div>
            </div>
            <div class="field">
                <div class="label">Email Address</div>
                <div class="value">{escape_html(data['email'])}</div>
            </div>
            <div class="field">
                <div class="label">Phone Number</div>
                <div class="value">{escape_html(data['phone'])}</div>
            </div>
            <div class="divider"></div>
            <div class="field">
                <div class="label">Fashion Interest</div>
                <div class="value">{interest_labels.get(data['interest'], data['interest'])}</div>
            </div>
            <div class="field">
                <div class="label">Preferred Outfit Type</div>
                <div class="value">{outfit_labels.get(data.get('outfitType', ''), data.get('outfitType', 'Not specified')) or 'Not specified'}</div>
            </div>
            <div class="divider"></div>
            <div class="field">
                <div class="label">Message</div>
                <div class="value">{escape_html(data['message'])}</div>
            </div>
        </div>
        <div class="footer">
            <p><strong>{BUSINESS_NAME}</strong></p>
            <p>{BUSINESS_ADDRESS}</p>
            <p style="color: #d4af37; margin-top: 10px;">Luxury Fashion That Defines Your Style ✨</p>
        </div>
    </div>
</body>
</html>
    """


def generate_email_text(data):
    """Generate plain text email content"""
    
    return f"""
New Customer Inquiry - {BUSINESS_NAME}
=====================================

Full Name: {data['fullName']}
Email: {data['email']}
Phone: {data['phone']}

Fashion Interest: {data['interest']}
Preferred Outfit Type: {data.get('outfitType', 'Not specified')}

Message:
{data['message']}

-------------------------------------
{BUSINESS_NAME}
{BUSINESS_ADDRESS}
    """


def escape_html(text):
    """Escape HTML special characters to prevent XSS"""
    if not text:
        return ''
    
    html_escape_table = {
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
        ">": "&gt;",
        "<": "&lt;",
    }
    
    return "".join(html_escape_table.get(c, c) for c in str(text))


def is_valid_email(email):
    """Validate email format"""
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))


def is_valid_phone(phone):
    """Validate Nigerian phone number format"""
    import re
    # Remove spaces and dashes
    cleaned = re.sub(r'[\s\-]', '', phone)
    # Nigerian format: +234 or 0 followed by 10 digits
    pattern = r'^(\+?234|0)?[789]\d{9}$'
    return bool(re.match(pattern, cleaned))


@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'Max Azlon Fashion Home API'
    }), 200


if __name__ == '__main__':
    # Get port from environment variable or use default
    port = int(os.getenv('PORT', 5000))
    
    # Debug mode should be False in production
    debug = os.getenv('FLASK_ENV', 'production') != 'production'
    
    app.run(host='0.0.0.0', port=port, debug=debug)
