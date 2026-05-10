/* ========================================
   MAX AZLON FASHION HOME - INTERACTIVE JS
   Animations, Form Handling & UX
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // LOADING SCREEN
    // ========================================
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        }, 1500);
    });
    
    // ========================================
    // PARTICLES BACKGROUND
    // ========================================
    const particlesContainer = document.getElementById('particlesContainer');
    const particleCount = 30;
    
    function createParticles() {
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();
    
    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // ========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // SCROLL REVEAL ANIMATIONS
    // ========================================
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.8;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Check on initial load
    
    // ========================================
    // ANIMATED STATISTICS COUNTER
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    function animateStats() {
        const statsSection = document.querySelector('.about-stats');
        if (!statsSection) return;
        
        const sectionTop = statsSection.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.8;
        
        if (sectionTop < triggerPoint && !statsAnimated) {
            statsAnimated = true;
            
            statNumbers.forEach(stat => {
                const target = parseFloat(stat.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    
                    if (current < target) {
                        if (target % 1 !== 0) {
                            stat.textContent = current.toFixed(1);
                        } else {
                            stat.textContent = Math.ceil(current);
                        }
                        requestAnimationFrame(updateCounter);
                    } else {
                        if (target % 1 !== 0) {
                            stat.textContent = target.toFixed(1);
                        } else {
                            stat.textContent = target;
                        }
                        
                        // Add '+' for numbers >= 100
                        if (target >= 100) {
                            stat.textContent += '+';
                        }
                    }
                };
                
                updateCounter();
            });
        }
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats(); // Check on initial load
    
    // ========================================
    // CONTACT FORM HANDLING
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Validate form
            if (!validateForm(data)) {
                return;
            }
            
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            formMessage.className = 'form-message';
            formMessage.style.display = 'none';
            
            try {
                // Send to Flask backend
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                
                const result = await response.json();
                
                if (response.ok && result.success) {
                    // Success
                    showFormMessage('success', '✨ Thank you! Your message has been sent successfully. We\'ll get back to you soon!');
                    contactForm.reset();
                } else {
                    // Error from server
                    showFormMessage('error', result.message || 'Something went wrong. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                showFormMessage('error', 'Network error. Please check your connection and try again.');
            } finally {
                // Reset button state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });
    }
    
    // Form validation
    function validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
        
        if (!data.fullName || data.fullName.trim().length < 2) {
            showFormMessage('error', 'Please enter a valid full name.');
            return false;
        }
        
        if (!data.email || !emailRegex.test(data.email)) {
            showFormMessage('error', 'Please enter a valid email address.');
            return false;
        }
        
        if (!data.phone || !phoneRegex.test(data.phone.replace(/\s/g, ''))) {
            showFormMessage('error', 'Please enter a valid phone number.');
            return false;
        }
        
        if (!data.interest) {
            showFormMessage('error', 'Please select your fashion interest.');
            return false;
        }
        
        if (!data.outfitType) {
            showFormMessage('error', 'Please select your preferred outfit type.');
            return false;
        }
        
        if (!data.message || data.message.trim().length < 10) {
            showFormMessage('error', 'Please enter a message (at least 10 characters).');
            return false;
        }
        
        return true;
    }
    
    // Show form message
    function showFormMessage(type, message) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    // ========================================
    // PARALLAX EFFECT FOR HERO SECTION
    // ========================================
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            const heroContent = document.querySelector('.hero-content');
            
            if (scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        });
    }
    
    // ========================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY + 150; // Offset for navbar
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // ========================================
    // BUTTON RIPPLE EFFECT
    // ========================================
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // ========================================
    // CONSOLE WELCOME MESSAGE
    // ========================================
    console.log('%c✨ Welcome to Max Azlon Fashion Home! ✨', 
        'font-size: 20px; font-weight: bold; color: #d4af37;');
    console.log('%cLuxury Fashion That Defines Your Style', 
        'font-size: 14px; color: #888;');
    console.log('%cBuilt with ❤️ in Port Harcourt', 
        'font-size: 12px; color: #d4af37;');
    
});

// ========================================
// ADD RIPPLE STYLES DYNAMICALLY
// ========================================
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
