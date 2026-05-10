/**
 * MAX AZLON FASHION HOME - JavaScript
 * Luxury Fashion Landing Page
 * 
 * Features:
 * - Loading screen animation
 * - Floating particles
 * - Navbar scroll effects
 * - Mobile menu toggle
 * - Scroll reveal animations
 * - Animated statistics counter
 * - Contact form with Brevo API integration
 */

// ============================================
// DOM ELEMENTS
// ============================================
const loadingScreen = document.getElementById('loadingScreen');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoader = submitBtn.querySelector('.btn-loader');
const formMessage = document.getElementById('formMessage');
const particlesContainer = document.getElementById('particles');

// ============================================
// LOADING SCREEN
// ============================================
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 1500);
});

// Prevent scrolling during load
document.body.style.overflow = 'hidden';

// ============================================
// FLOATING PARTICLES
// ============================================
function createParticles() {
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random positioning and animation delay
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class when page is scrolled
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal(); // Trigger on initial load

// ============================================
// ANIMATED STATISTICS COUNTER
// ============================================
function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        
        if (current < target) {
            if (target % 1 !== 0) {
                // Decimal number (like 4.8)
                element.textContent = current.toFixed(1);
            } else {
                // Whole number
                element.textContent = Math.floor(current).toLocaleString();
            }
            requestAnimationFrame(updateCounter);
        } else {
            if (target % 1 !== 0) {
                element.textContent = target.toFixed(1);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
    };
    
    updateCounter();
}

// Trigger counter animation when stats section is visible
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ============================================
// CONTACT FORM HANDLING WITH BREVO API
// ============================================
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // Validate form
    if (!validateForm(data)) {
        return;
    }
    
    // Show loading state
    setLoadingState(true);
    
    try {
        // Send to Flask backend
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            showFormMessage('success', 'Thank you! Your message has been sent successfully. We will get back to you soon.');
            contactForm.reset();
        } else {
            throw new Error(result.message || 'Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        
        // Fallback: Try direct Brevo API (for development/testing)
        try {
            await sendViaBrevoDirect(data);
            showFormMessage('success', 'Thank you! Your message has been sent successfully. We will get back to you soon.');
            contactForm.reset();
        } catch (brevoError) {
            showFormMessage('error', 'Sorry, there was an error sending your message. Please try again or contact us directly.');
        }
    } finally {
        setLoadingState(false);
    }
});

// Form validation
function validateForm(data) {
    const requiredFields = ['fullName', 'email', 'phone', 'interest', 'message'];
    
    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showFormMessage('error', `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
            return false;
        }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showFormMessage('error', 'Please enter a valid email address.');
        return false;
    }
    
    // Phone validation (Nigerian format)
    const phoneRegex = /^(\+?234|0)?[789]\d{9}$/;
    if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
        showFormMessage('error', 'Please enter a valid Nigerian phone number.');
        return false;
    }
    
    return true;
}

// Set loading state
function setLoadingState(isLoading) {
    if (isLoading) {
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline';
        submitBtn.disabled = true;
    } else {
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
    }
}

// Show form message
function showFormMessage(type, message) {
    formMessage.textContent = message;
    formMessage.className = 'form-message ' + type;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

// Direct Brevo API call (fallback/example)
async function sendViaBrevoDirect(data) {
    // NOTE: In production, use the Flask backend instead
    // This is for demonstration purposes only
    
    const BREVO_API_KEY = process.env.BREVO_API_KEY || 'YOUR_BREVO_API_KEY';
    const SENDER_EMAIL = 'noreply@maxazlonfashion.com';
    const RECIPIENT_EMAIL = 'info@maxazlonfashion.com';
    
    const emailData = {
        sender: {
            name: 'Max Azlon Fashion Home',
            email: SENDER_EMAIL,
        },
        to: [
            {
                email: RECIPIENT_EMAIL,
            },
        ],
        cc: [
            {
                email: data.email,
            },
        ],
        subject: `New Inquiry from ${data.fullName}`,
        htmlContent: generateEmailHTML(data),
    };
    
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': BREVO_API_KEY,
        },
        body: JSON.stringify(emailData),
    });
    
    if (!response.ok) {
        throw new Error('Brevo API error');
    }
    
    return response.json();
}

// Generate HTML email content
function generateEmailHTML(data) {
    return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Poppins', Arial, sans-serif; background: #f5f5f5; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #d4af37 0%, #f1d46a 100%); padding: 30px; text-align: center; }
        .header h1 { color: #0a0a0a; margin: 0; font-size: 24px; }
        .content { padding: 30px; }
        .field { margin-bottom: 20px; }
        .label { color: #d4af37; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; }
        .value { color: #333; font-size: 16px; margin-top: 5px; }
        .footer { background: #0a0a0a; color: white; padding: 20px; text-align: center; font-size: 14px; }
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
                <div class="value">${escapeHtml(data.fullName)}</div>
            </div>
            <div class="field">
                <div class="label">Email Address</div>
                <div class="value">${escapeHtml(data.email)}</div>
            </div>
            <div class="field">
                <div class="label">Phone Number</div>
                <div class="value">${escapeHtml(data.phone)}</div>
            </div>
            <div class="field">
                <div class="label">Fashion Interest</div>
                <div class="value">${escapeHtml(data.interest)}</div>
            </div>
            <div class="field">
                <div class="label">Preferred Outfit Type</div>
                <div class="value">${escapeHtml(data.outfitType || 'Not specified')}</div>
            </div>
            <div class="field">
                <div class="label">Message</div>
                <div class="value">${escapeHtml(data.message)}</div>
            </div>
        </div>
        <div class="footer">
            <p>Max Azlon Fashion Home<br>Harmony House Plaza, Woji Rd, Port Harcourt</p>
        </div>
    </div>
</body>
</html>
    `;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// PARALLAX EFFECT FOR HERO SECTION
// ============================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c👋 Max Azlon Fashion Home', 'color: #d4af37; font-size: 20px; font-weight: bold;');
console.log('%cLuxury Fashion That Defines Your Style ✨', 'color: #d4c4a8; font-size: 14px;');
console.log('%cBuilt with ❤️ for fashion lovers', 'color: #d4af37; font-size: 12px;');
