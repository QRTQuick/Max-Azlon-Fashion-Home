# Max Azlon Fashion Home - Deployment Guide

## 🚀 Quick Deploy Options

### Option 1: Render (Recommended)

1. **Create a new Web Service on Render:**
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure the service:**
   ```
   Name: max-azlon-fashion-home
   Region: Choose closest to Nigeria (e.g., London)
   Branch: main
   Root Directory: /
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: gunicorn app:app
   ```

3. **Add Environment Variables:**
   - `BREVO_API_KEY`: Your Brevo API key
   - `SENDER_EMAIL`: noreply@maxazlonfashion.com
   - `RECIPIENT_EMAIL`: info@maxazlonfashion.com
   - `FLASK_ENV`: production
   - `SECRET_KEY`: Generate a random string

4. **Deploy!**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Your site will be live at `https://max-azlon-fashion-home.onrender.com`

---

### Option 2: Vercel (Frontend Only)

For frontend-only deployment without the Flask backend:

1. **Modify for static hosting:**
   - Update form action to use external email service
   - Or use Vercel Serverless Functions

2. **Deploy to Vercel:**
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```

3. **Configure project:**
   - Follow Vercel prompts
   - Set build command: `echo "No build needed"`
   - Set output directory: `/`

---

### Option 3: Heroku

1. **Create required files:**
   ```bash
   # Procfile (already included)
   web: gunicorn app:app
   
   # runtime.txt (already included)
   python-3.11.0
   ```

2. **Deploy:**
   ```bash
   heroku login
   heroku create max-azlon-fashion
   git push heroku main
   heroku config:set BREVO_API_KEY=your-key
   heroku config:set SENDER_EMAIL=noreply@maxazlonfashion.com
   heroku config:set RECIPIENT_EMAIL=info@maxazlonfashion.com
   ```

---

### Option 4: Local Development

1. **Clone and setup:**
   ```bash
   cd max-azlon-fashion
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your Brevo API key
   ```

3. **Run the application:**
   ```bash
   python app.py
   ```

4. **Access:** http://localhost:5000

---

## 📧 Brevo Email Setup

### Step 1: Create Account
1. Visit https://www.brevo.com
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Sender Email
1. Go to **Senders & IP** menu
2. Click **Create a new sender**
3. Enter your email (e.g., noreply@maxazlonfashion.com)
4. Verify the email via confirmation link

### Step 3: Generate API Key
1. Go to **Settings** → **API Keys**
2. Click **Generate a New API Key**
3. Name it (e.g., "Max Azlon Fashion")
4. Copy the generated key
5. Add to your `.env` file or hosting platform's environment variables

### Step 4: Test Integration
1. Submit the contact form on your website
2. Check if email is received at RECIPIENT_EMAIL
3. Verify CC email is sent to the customer

---

## 🔒 Security Best Practices

1. **Never commit .env file** - Already in .gitignore
2. **Use strong SECRET_KEY** - Generate with: `python -c "import secrets; print(secrets.token_hex(32))"`
3. **Enable HTTPS** - Automatic on Render/Vercel/Heroku
4. **Rotate API keys** periodically
5. **Enable 2FA** on Brevo account
6. **Set FLASK_DEBUG=False** in production

---

## 🎨 Customization

### Update Business Information
Edit these values in `app.py`:
```python
BUSINESS_NAME = 'Max Azlon Fashion Home'
BUSINESS_ADDRESS = 'Harmony House Plaza, Woji Rd, Port Harcourt'
```

### Update Contact Details
Edit in `index.html` and `style.css`:
- Phone numbers
- Social media links
- WhatsApp number
- Business hours

### Change Colors
Edit CSS variables in `style.css`:
```css
:root {
    --color-gold: #d4af37;  /* Change gold color */
    --color-black: #0a0a0a; /* Change black shade */
}
```

---

## 📱 Mobile Optimization

The site is fully responsive out of the box. Test on:
- iPhone (Safari)
- Android (Chrome)
- Tablet devices

---

## ✅ Pre-Launch Checklist

- [ ] Brevo account created and verified
- [ ] API key added to environment variables
- [ ] Test contact form submission
- [ ] Verify emails are received
- [ ] Update all placeholder phone numbers
- [ ] Add real social media links
- [ ] Test on multiple devices
- [ ] Check page load speed
- [ ] Verify all animations work
- [ ] Test mobile navigation
- [ ] Check accessibility (alt text, ARIA labels)

---

## 🆘 Troubleshooting

### Form Not Sending Emails
1. Check Brevo API key is correct
2. Verify sender email is authenticated in Brevo
3. Check server logs for errors
4. Ensure environment variables are set

### Site Not Loading
1. Check build logs on hosting platform
2. Verify all files are committed to Git
3. Ensure requirements.txt has all dependencies
4. Check for Python version compatibility

### Styles Not Applying
1. Clear browser cache
2. Check CSS file paths in HTML
3. Verify CDN links for Font Awesome and Google Fonts

---

## 📞 Support

For issues or questions:
- Check Flask documentation: https://flask.palletsprojects.com
- Brevo support: https://help.brevo.com
- Render support: https://render.com/docs

---

**Built with ❤️ for Max Azlon Fashion Home**
*Luxury Fashion That Defines Your Style ✨*
