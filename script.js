// Sharp Colours - Enhanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initMobileMenu();
    setActiveNavLink();
    initHeaderScrollEffect();
    initGalleryFilter();
    initFAQAccordion();
    initContactForm();
    initQuoteForm();
    initBackToTop();
    initAnimations();
    initServiceCards();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
            
            // Toggle body scroll
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    document.body.style.overflow = '';
                }
            }
        });
    });
}

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === '')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Header Scroll Effect
function initHeaderScrollEffect() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            header.style.padding = '0';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
            header.style.padding = '0';
        }
    });
}

// Gallery Filter (for gallery.html)
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// FAQ Accordion (for about.html)
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const isActive = answer.classList.contains('active');
                
                // Close all other answers
                document.querySelectorAll('.faq-answer').forEach(ans => {
                    ans.classList.remove('active');
                });
                
                // Remove active class from all questions
                document.querySelectorAll('.faq-question').forEach(q => {
                    q.classList.remove('active');
                });
                
                // Toggle current answer
                if (!isActive) {
                    question.classList.add('active');
                    answer.classList.add('active');
                }
            });
        });
    }
}

// Contact Form Submission (for contact.html)
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !phone || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Create WhatsApp message
            let whatsappMsg = `Hello Sharp Colours,%0A%0A`;
            whatsappMsg += `I am interested in your painting services.%0A%0A`;
            whatsappMsg += `*Name:* ${name}%0A`;
            whatsappMsg += `*Phone:* ${phone}%0A`;
            if (service) whatsappMsg += `*Service Needed:* ${service}%0A`;
            whatsappMsg += `*Project Details:*%0A${message}%0A%0A`;
            whatsappMsg += `Please contact me to discuss further.`;
            
            // Show loading
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span>';
            
            // Simulate processing
            setTimeout(() => {
                // Redirect to WhatsApp
                window.open(`https://wa.me/917219332252?text=${whatsappMsg}`, '_blank');
                
                // Reset form
                contactForm.reset();
                
                // Restore button text
                submitBtn.innerHTML = originalText;
                
                // Show success message
                alert('Thank you! You will be redirected to WhatsApp to complete your inquiry.');
            }, 1000);
        });
    }
}

// Quote Form Submission (for services.html)
function initQuoteForm() {
    const quoteForm = document.getElementById('quoteForm');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('quoteName').value;
            const phone = document.getElementById('quotePhone').value;
            const service = document.getElementById('quoteService').value;
            const area = document.getElementById('quoteArea').value;
            const message = document.getElementById('quoteMessage').value;
            
            // Simple validation
            if (!name || !phone || !service) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Create WhatsApp message for quote
            let whatsappMsg = `Hello Sharp Colours,%0A%0A`;
            whatsappMsg += `I would like a quote for painting services.%0A%0A`;
            whatsappMsg += `*Name:* ${name}%0A`;
            whatsappMsg += `*Phone:* ${phone}%0A`;
            whatsappMsg += `*Service:* ${service}%0A`;
            if (area) whatsappMsg += `*Approx. Area:* ${area} sq.ft%0A`;
            if (message) whatsappMsg += `*Additional Details:*%0A${message}%0A`;
            whatsappMsg += `%0APlease provide me with a quote.`;
            
            // Show loading
            const submitBtn = quoteForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span>';
            
            // Simulate processing
            setTimeout(() => {
                // Redirect to WhatsApp
                window.open(`https://wa.me/917219332252?text=${whatsappMsg}`, '_blank');
                
                // Reset form
                quoteForm.reset();
                
                // Restore button text
                submitBtn.innerHTML = originalText;
                
                // Show success message
                alert('Thank you! You will be redirected to WhatsApp to get your quote.');
            }, 1000);
        });
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize animations
function initAnimations() {
    // Add animation on scroll using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    document.querySelectorAll('.service-card, .process-step, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
}

// Service Cards Hover Effect Enhancement
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.service-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.service-icon i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
}

// Add current year to copyright
document.addEventListener('DOMContentLoaded', function() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
});