# ✨ Max Azlon Fashion Home

**Luxury Fashion That Defines Your Style**

A premium, luxurious fashion-brand landing page for Max Azlon Fashion Home - a high-end clothing boutique in Port Harcourt, Nigeria.

![Max Azlon Fashion Home](https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=80)

## 🌟 Features

### Design & UI/UX
- ✨ **Luxury Dark & Gold Aesthetic** - Premium matte black with gold accents
- 🎨 **Glassmorphism Effects** - Modern frosted glass card designs
- 🎭 **Smooth Animations** - Scroll reveals, hover effects, loading screens
- ⭐ **Floating Particles** - Elegant background animation
- 📱 **Fully Responsive** - Mobile-first design for all devices
- 🖋️ **Premium Typography** - Playfair Display + Poppins fonts

### Sections Included
1. **Hero Section** - Large headline, subheadline, CTA buttons, parallax effect
2. **About Brand** - Brand story with 4 animated statistics counters
3. **Featured Reviews** - Customer testimonials with glassmorphism cards & star ratings
4. **Fashion Categories** - 6 elegant category cards with hover glow animations
5. **Why Choose Us** - 6 premium feature boxes with icons
6. **Google Review Highlight** - 4.8 star rating display with badges
7. **Contact Form** - Glass-style inquiry form with Flask + Brevo integration
8. **Footer** - Social links, business info, hours, location map

### Technical Features
- 🔧 **Flask Backend** - Python-based server with CORS support
- 📧 **Brevo Email Integration** - Transactional email API for contact forms
- ✅ **Form Validation** - Client-side & server-side validation
- 🔒 **Security** - XSS protection, input sanitization, environment variables
- 🚀 **Deploy Ready** - Configured for Vercel, Render, or Heroku

## 📁 Project Structure

```
/workspace
├── templates/
│   └── index.html          # Main HTML template
├── static/
│   ├── style.css           # Premium CSS with animations
│   └── script.js           # Interactive JavaScript
├── app.py                  # Flask backend
├── requirements.txt        # Python dependencies
├── vercel.json            # Vercel deployment config
├── runtime.txt            # Python version specification
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+ installed
- pip (Python package manager)
- Brevo account (for email functionality)

### Local Development

1. **Clone or navigate to the project:**
   ```bash
   cd /workspace
   ```

2. **Create virtual environment (optional but recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Brevo API key:
   ```
   BREVO_API_KEY=your-actual-api-key-here
   BREVO_SENDER_EMAIL=your-verified-email@example.com
   RECIPIENT_EMAIL=info@maxazlonfashion.com
   ```

5. **Run the application:**
   ```bash
   python app.py
   ```

6. **Open in browser:**
   ```
   http://localhost:5000
   ```

## 📧 Brevo Email Setup

1. **Create a free Brevo account:**
   - Visit [https://www.brevo.com](https://www.brevo.com)
   - Sign up for a free account

2. **Verify your sender email:**
   - Go to Settings → Senders & IP
   - Add your email address
   - Verify via the confirmation email

3. **Generate API key:**
   - Go to Settings → API Keys
   - Create a new API key
   - Copy the key to your `.env` file

4. **Test the contact form:**
   - Fill out the contact form on your website
   - Check your recipient email for the inquiry

## 🌐 Deployment

### Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

4. **Add environment variables in Vercel dashboard:**
   - Go to Project Settings → Environment Variables
   - Add `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `RECIPIENT_EMAIL`

### Deploy to Render

1. **Create new Web Service on Render:**
   - Connect your GitHub repository
   - Choose "Python" environment

2. **Configure build & start commands:**
   ```
   Build: pip install -r requirements.txt
   Start: gunicorn app:app
   ```

3. **Add environment variables in Render dashboard**

### Deploy to Heroku

1. **Install Heroku CLI and login:**
   ```bash
   heroku login
   ```

2. **Create app and push:**
   ```bash
   heroku create max-azlon-fashion
   git push heroku main
   ```

3. **Set environment variables:**
   ```bash
   heroku config:set BREVO_API_KEY=your-key
   heroku config:set BREVO_SENDER_EMAIL=your-email
   heroku config:set RECIPIENT_EMAIL=recipient@email.com
   ```

## 🎨 Customization

### Colors
Edit CSS variables in `static/style.css`:
```css
:root {
    --color-gold: #d4af37;        /* Change gold color */
    --color-black: #0a0a0a;       /* Change background */
    --color-white: #ffffff;       /* Change text color */
}
```

### Content
- Edit business information in `templates/index.html`
- Update social media links in the footer section
- Modify customer reviews in the testimonials section

### Images
Replace the hero background image URL in `static/style.css`:
```css
.hero {
    background: url('your-image-url.jpg') center/cover no-repeat;
}
```

## 📱 Mobile Responsiveness

The website is fully responsive with breakpoints at:
- **1024px** - Tablet landscape
- **768px** - Tablet portrait
- **480px** - Mobile phones

## 🔒 Security Features

- Input sanitization to prevent XSS attacks
- Email and phone validation
- Environment variables for sensitive data
- CORS protection
- No credentials in source code

## 📊 Performance

- Optimized CSS with variables
- Minimal JavaScript (vanilla, no frameworks)
- Lazy loading for maps
- Efficient animations using CSS transforms

## 🤝 Support

For questions or issues:
- Check the code comments for inline documentation
- Review the `.env.example` file for configuration details
- Ensure all environment variables are properly set

## 📄 License

This project is proprietary software created for Max Azlon Fashion Home.

---

**Built with ❤️ in Port Harcourt, Nigeria**

*Max Azlon Fashion Home - Where Elegance Meets Affordability*
