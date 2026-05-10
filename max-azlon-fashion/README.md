# Max Azlon Fashion Home 🌟

**Luxury Fashion That Defines Your Style ✨**

A premium, luxurious landing page for Max Azlon Fashion Home - Port Harcourt's premier fashion destination.

![Status](https://img.shields.io/badge/status-ready-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![Python](https://img.shields.io/badge/python-3.8+-blue)

---

## 🎨 Features

### Design
- ✨ **Luxury Dark & Gold Aesthetic** - Premium boutique appearance
- 🎭 **Glassmorphism Effects** - Modern UI design trend
- 📱 **Fully Responsive** - Mobile-first design
- ⚡ **Smooth Animations** - Scroll reveals, hover effects, transitions
- 🌊 **Floating Particles** - Elegant background effects
- 🎯 **Conversion-Focused** - Strategic CTAs and forms

### Technical
- 🔧 **Flask Backend** - Python-powered server
- 📧 **Brevo Email Integration** - Transactional email API
- 🛡️ **Form Validation** - Client & server-side validation
- 🔒 **Security Best Practices** - XSS protection, environment variables
- 🚀 **Deploy-Ready** - Render, Vercel, Heroku compatible

### Sections
1. **Hero** - Stunning introduction with CTAs
2. **About** - Brand story with animated statistics
3. **Collections** - Fashion categories showcase
4. **Why Choose Us** - Value propositions
5. **Reviews** - Customer testimonials with ratings
6. **Contact** - Inquiry form with email integration
7. **Footer** - Social links and business info

---

## 📁 Project Structure

```
max-azlon-fashion/
├── templates/
│   └── index.html          # Main HTML file
├── static/
│   ├── style.css           # Premium CSS styles
│   └── script.js           # Interactive JavaScript
├── app.py                  # Flask backend
├── requirements.txt        # Python dependencies
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── DEPLOYMENT.md           # Deployment guide
└── README.md               # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Brevo account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd max-azlon-fashion
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Brevo API key:
   ```
   BREVO_API_KEY=your-actual-api-key
   SENDER_EMAIL=noreply@maxazlonfashion.com
   RECIPIENT_EMAIL=info@maxazlonfashion.com
   ```

4. **Run the application**
   ```bash
   python app.py
   ```

5. **Open in browser**
   ```
   http://localhost:5000
   ```

---

## 📧 Brevo Setup

1. **Create Account**: Visit [brevo.com](https://www.brevo.com) and sign up
2. **Verify Email**: Add and verify your sender email
3. **Get API Key**: Settings → API Keys → Generate New Key
4. **Add to .env**: Copy the key to your `.env` file

See `DEPLOYMENT.md` for detailed instructions.

---

## 🎨 Customization

### Colors
Edit CSS variables in `style.css`:
```css
:root {
    --color-gold: #d4af37;      /* Primary gold */
    --color-gold-light: #f1d46a; /* Light gold */
    --color-black: #0a0a0a;      /* Background black */
}
```

### Business Info
Update in `app.py`:
```python
BUSINESS_NAME = 'Max Azlon Fashion Home'
BUSINESS_ADDRESS = 'Harmony House Plaza, Woji Rd, Port Harcourt'
```

### Contact Details
Edit phone numbers, social links, and hours in `templates/index.html`.

---

## 🌐 Deployment

### Render (Recommended)
1. Connect GitHub repository
2. Configure:
   - Build: `pip install -r requirements.txt`
   - Start: `gunicorn app:app`
3. Add environment variables
4. Deploy!

### Other Platforms
- **Vercel**: Frontend deployment (see DEPLOYMENT.md)
- **Heroku**: Traditional PaaS deployment
- **Railway**: Modern cloud platform

Full deployment guide in `DEPLOYMENT.md`.

---

## 📱 Mobile Responsiveness

The site is optimized for all devices:
- ✅ iPhone (Safari)
- ✅ Android (Chrome)
- ✅ Tablets
- ✅ Desktop

Test using browser DevTools responsive mode.

---

## 🛡️ Security

- Environment variables for sensitive data
- XSS protection on form inputs
- Input validation (client & server)
- HTTPS enforced in production
- CORS configured properly

---

## 📊 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Python, Flask |
| Styling | Custom CSS with Variables |
| Fonts | Google Fonts (Playfair Display, Poppins) |
| Icons | Font Awesome 6 |
| Email | Brevo API |
| Hosting | Render/Vercel/Heroku ready |

---

## 🎯 Key Features Detail

### Loading Screen
- Animated brand logo
- Smooth fade-out transition

### Navigation
- Sticky header with scroll effect
- Mobile hamburger menu
- Smooth scroll to sections

### Hero Section
- Gradient text animation
- Floating particles
- Parallax scrolling effect
- Call-to-action buttons

### Statistics Counter
- Animated number counting
- Triggered on scroll visibility

### Contact Form
- Real-time validation
- Loading state animation
- Success/error messages
- Nigerian phone format validation
- HTML email templates

### Reviews Section
- Glassmorphism cards
- Star ratings
- Verified customer badges
- Google review highlight

---

## 📝 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Serve landing page |
| `/api/send-email` | POST | Send inquiry email |
| `/health` | GET | Health check |

---

## 🆘 Troubleshooting

### Form not sending emails?
1. Verify Brevo API key is correct
2. Check sender email is verified in Brevo
3. Review server logs for errors

### Styles not loading?
1. Clear browser cache (Ctrl+Shift+R)
2. Check file paths in HTML
3. Verify CDN links are working

### App won't start?
1. Ensure all dependencies installed
2. Check Python version (3.8+)
3. Verify `.env` file exists

---

## 📄 License

MIT License - Feel free to use for personal or commercial projects.

---

## 👨‍💻 Credits

**Built for:** Max Azlon Fashion Home  
**Location:** Port Harcourt, Rivers State, Nigeria  
**Design Inspiration:** Zara, Gucci, Fashion Nova, PrettyLittleThing  

---

## 🤝 Support

For questions or issues:
- Check `DEPLOYMENT.md` for deployment help
- Review code comments for implementation details
- Consult Flask docs: https://flask.palletsprojects.com
- Brevo support: https://help.brevo.com

---

<div align="center">

**Made with ❤️ for fashion lovers**

*Luxury Fashion That Defines Your Style ✨*

</div>
