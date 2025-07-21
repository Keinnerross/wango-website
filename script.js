// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(15, 15, 35, 0.95)';
    } else {
        header.style.background = 'rgba(15, 15, 35, 0.9)';
    }
});

// Animated particles background
function createParticles() {
    const particlesContainer = document.querySelector('.particles-bg');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 4 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = duration + 's';
        
        // Random delay
        const delay = Math.random() * 20;
        particle.style.animationDelay = delay + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// CSS for particles
const particleStyles = `
.particle {
    position: absolute;
    background: radial-gradient(circle, #6366f1, #8b5cf6);
    border-radius: 50%;
    pointer-events: none;
    animation: particleFloat infinite linear;
    opacity: 0.6;
}

@keyframes particleFloat {
    0% {
        transform: translateY(100vh) translateX(0px) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 0.6;
    }
    90% {
        opacity: 0.6;
    }
    100% {
        transform: translateY(-100px) translateX(100px) rotate(360deg);
        opacity: 0;
    }
}
`;

// Add particle styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = particleStyles;
document.head.appendChild(styleSheet);

// Initialize particles
createParticles();

// Hamburger Menu Functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navOverlay = document.getElementById('nav-overlay');

if (hamburger && navMenu && navOverlay) {
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    hamburger.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on overlay
    navOverlay.addEventListener('click', closeMenu);
    
    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

// Initialize EmailJS
(function() {
    emailjs.init(""); // You need to add your public key here
})();

// Form handling
const form = document.querySelector('.form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Prepare email parameters
        const templateParams = {
            user_name: data.name,
            reply_to: data.email,
            package: data.package,
            message: data.message
        };
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Send email using EmailJS
        emailjs.send('service_ugztaon', 'template_rmmpoci', templateParams)
            .then(function(response) {
                console.log('Email sent successfully:', response);
                
                // Show custom notification
                const notification = document.getElementById('notification');
                notification.classList.remove('hidden');
                
                // Hide notification after 3 seconds
                setTimeout(() => {
                    notification.classList.add('hidden');
                }, 3000);
                
                // Reset form
                form.reset();
            })
            .catch(function(error) {
                console.error('Email sending failed:', error);
                alert('Error al enviar el mensaje. Por favor, intenta nuevamente.');
            })
            .finally(function() {
                // Restore button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('.service-card, .pricing-card, .portfolio-item, .partner-item, .section-header').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Add fade-in animation CSS
const animationStyles = `
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.service-card,
.pricing-card,
.feature {
    opacity: 0;
}
`;

const animationStyleSheet = document.createElement('style');
animationStyleSheet.textContent = animationStyles;
document.head.appendChild(animationStyleSheet);

// Portfolio functionality
class PortfolioManager {
    constructor() {
        this.images = [
            'download.png',
            'download (1).png',
            'download (2).png',
            'download (3).png',
            'download (4).png',
            'download (5).png',
            'download (6).png',
            'download (7).png'
        ];
        this.itemsPerPage = 6;
        this.currentPage = 0;
        this.totalPages = Math.ceil(this.images.length / this.itemsPerPage);
        
        this.portfolioGrid = document.getElementById('portfolioGrid');
        this.pagination = document.getElementById('portfolioPagination');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.paginationDots = document.getElementById('paginationDots');
        
        this.init();
    }
    
    init() {
        this.createPaginationDots();
        this.renderPage();
        this.bindEvents();
        
        if (this.totalPages > 1) {
            this.pagination.style.display = 'flex';
        }
    }
    
    createPaginationDots() {
        this.paginationDots.innerHTML = '';
        for (let i = 0; i < this.totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = `pagination-dot ${i === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToPage(i));
            this.paginationDots.appendChild(dot);
        }
    }
    
    renderPage() {
        const startIndex = this.currentPage * this.itemsPerPage;
        const endIndex = Math.min(startIndex + this.itemsPerPage, this.images.length);
        const pageImages = this.images.slice(startIndex, endIndex);
        
        // Fade out animation
        this.portfolioGrid.style.opacity = '0';
        this.portfolioGrid.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            this.portfolioGrid.innerHTML = '';
            
            pageImages.forEach((imageName, index) => {
                const portfolioItem = document.createElement('div');
                portfolioItem.className = 'portfolio-item';
                
                portfolioItem.innerHTML = `
                    <div class="portfolio-image">
                        <img src="assets/portfolio/${imageName}" alt="Portfolio ${startIndex + index + 1}" loading="lazy">
                    </div>
                `;
                
                this.portfolioGrid.appendChild(portfolioItem);
            });
            
            // Fade in animation
            setTimeout(() => {
                this.portfolioGrid.style.opacity = '1';
                this.portfolioGrid.style.transform = 'translateY(0)';
                
                // Animate items individually
                const items = this.portfolioGrid.querySelectorAll('.portfolio-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('show');
                    }, index * 100);
                });
            }, 50);
            
        }, 250);
        
        this.updatePaginationState();
    }
    
    updatePaginationState() {
        // Update buttons
        this.prevBtn.disabled = this.currentPage === 0;
        this.nextBtn.disabled = this.currentPage === this.totalPages - 1;
        
        // Update dots
        this.paginationDots.querySelectorAll('.pagination-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentPage);
        });
    }
    
    goToPage(pageIndex) {
        if (pageIndex >= 0 && pageIndex < this.totalPages && pageIndex !== this.currentPage) {
            this.currentPage = pageIndex;
            this.renderPage();
        }
    }
    
    nextPage() {
        if (this.currentPage < this.totalPages - 1) {
            this.currentPage++;
            this.renderPage();
        }
    }
    
    prevPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.renderPage();
        }
    }
    
    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.prevPage());
        this.nextBtn.addEventListener('click', () => this.nextPage());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.target.closest('.portfolio')) {
                if (e.key === 'ArrowLeft') {
                    this.prevPage();
                } else if (e.key === 'ArrowRight') {
                    this.nextPage();
                }
            }
        });
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioManager();
});

// Custom Cursor
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.cursorTrail = document.querySelector('.cursor-trail');
        this.cursorPos = { x: 0, y: 0 };
        this.trailPos = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursorPos.x = e.clientX - 8;
            this.cursorPos.y = e.clientY - 8;
            
            this.cursor.style.left = this.cursorPos.x + 'px';
            this.cursor.style.top = this.cursorPos.y + 'px';
        });
        
        // Smooth trail follow
        const updateTrail = () => {
            this.trailPos.x += (this.cursorPos.x - this.trailPos.x) * 0.15;
            this.trailPos.y += (this.cursorPos.y - this.trailPos.y) * 0.15;
            
            this.cursorTrail.style.left = this.trailPos.x + 3 + 'px';
            this.cursorTrail.style.top = this.trailPos.y + 3 + 'px';
            
            requestAnimationFrame(updateTrail);
        };
        updateTrail();
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .btn, .portfolio-item, .testimonial-card, .service-card, .pricing-card');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('cursor-hover');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('cursor-hover');
            });
        });
        
        // Click effect
        document.addEventListener('mousedown', () => {
            this.cursor.classList.add('cursor-click');
        });
        
        document.addEventListener('mouseup', () => {
            this.cursor.classList.remove('cursor-click');
        });
    }
}

// Initialize custom cursor
document.addEventListener('DOMContentLoaded', () => {
    new CustomCursor();
});

// Tech grid hover effects
document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05) rotateY(5deg)';
        item.style.boxShadow = '0 10px 20px rgba(99, 102, 241, 0.3)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1) rotateY(0deg)';
        item.style.boxShadow = 'none';
    });
});

// Floating elements dynamic movement
document.querySelectorAll('.floating-cube, .floating-pyramid, .floating-sphere').forEach((element, index) => {
    const speed = 0.5 + (index * 0.2);
    const amplitude = 20 + (index * 10);
    
    let time = 0;
    
    function animate() {
        time += speed;
        const y = Math.sin(time * 0.01) * amplitude;
        const x = Math.cos(time * 0.008) * (amplitude * 0.5);
        const rotation = time * 0.5;
        
        element.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
        requestAnimationFrame(animate);
    }
    
    animate();
});

// Pricing card glow effect on hover
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(99, 102, 241, 0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('featured')) {
            card.style.boxShadow = '';
        }
    });
});

// Dynamic gradient text effect
function createDynamicGradient() {
    const gradientTexts = document.querySelectorAll('.gradient-text');
    let hue = 0;
    
    setInterval(() => {
        hue += 1;
        gradientTexts.forEach(text => {
            text.style.background = `linear-gradient(135deg, 
                hsl(${hue % 360}, 70%, 60%), 
                hsl(${(hue + 60) % 360}, 70%, 60%), 
                hsl(${(hue + 120) % 360}, 70%, 60%))`;
            text.style.webkitBackgroundClip = 'text';
            text.style.webkitTextFillColor = 'transparent';
        });
    }, 100);
}

createDynamicGradient();

console.log('🚀 Wango Digital - Cyberpunk website loaded successfully!');