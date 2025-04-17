// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate elements when they come into view
    const observerOptions = {
        threshold: 0.25
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to observe for animation
    const animatedElements = [
        '.special-offer',
        '.expect-step',
        '.approach-image',
        '.approach-feature',
        '.insurance-card',
        '.payment-options',
        '.visit-hours',
        '.contact-item'
    ];
    
    animatedElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            observer.observe(element);
        });
    });
    
    // Add fade-in animation CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        .special-offer, .expect-step, .approach-image, .approach-feature, 
        .insurance-card, .payment-options, .visit-hours, .contact-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .expect-step:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .expect-step:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .approach-feature:nth-child(2) {
            transition-delay: 0.15s;
        }
        
        .approach-feature:nth-child(3) {
            transition-delay: 0.3s;
        }
        
        .approach-feature:nth-child(4) {
            transition-delay: 0.45s;
        }
        
        .insurance-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .insurance-card:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .contact-item:nth-child(2) {
            transition-delay: 0.15s;
        }
        
        .contact-item:nth-child(3) {
            transition-delay: 0.3s;
        }
    `;
    document.head.appendChild(style);
    
    // Add year to copyright text if exists
    const copyrightElement = document.querySelector('.copyright-year');
    if (copyrightElement) {
        copyrightElement.textContent = new Date().getFullYear();
    }
    
    // Form validation if contact form exists
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let valid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation if email field exists
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    valid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (valid) {
                // Here you would typically send the form data to your server
                // For demo purposes, we'll just show a success message
                const formContainer = contactForm.parentElement;
                formContainer.innerHTML = '<div class="success-message">Thank you! Your message has been sent. We\'ll be in touch soon.</div>';
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Create mobile toggle button if it doesn't exist
    const nav = document.querySelector('nav');
    let mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    
    if (!mobileNavToggle) {
      mobileNavToggle = document.createElement('button');
      mobileNavToggle.className = 'mobile-nav-toggle';
      mobileNavToggle.innerHTML = '<div class="hamburger"><span></span><span></span><span></span></div>';
      nav.appendChild(mobileNavToggle);
    }
    
    const navbar = document.querySelector('.navbar');
    
    // Toggle mobile menu
    mobileNavToggle.addEventListener('click', function() {
      navbar.classList.toggle('active');
      this.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
    
    // Handle dropdown menus in mobile view
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
      const link = dropdown.querySelector('a');
      
      link.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
          // Check if dropdown is not active yet (i.e., first click)
          if (!dropdown.classList.contains('active')) {
            e.preventDefault(); // Only prevent default the first time
            dropdown.classList.add('active');
          } else {
            // If already open, allow default behavior (i.e., follow the link)
            dropdown.classList.remove('active');
          }
        }
      });
    });
    
    // Rest of your existing code for reviews and other functionality...
  });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (navbar.classList.contains('active') && 
          !e.target.closest('.navbar') && 
          !e.target.closest('.mobile-nav-toggle')) {
        navbar.classList.remove('active');
        mobileNavToggle.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
    
    // Close mobile menu when window is resized above mobile breakpoint
    window.addEventListener('resize', function() {
      if (window.innerWidth > 992) {
        navbar.classList.remove('active');
        mobileNavToggle.classList.remove('active');
        document.body.classList.remove('no-scroll');
        
        // Reset any active dropdowns
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('active');
        });
      }
    });
  