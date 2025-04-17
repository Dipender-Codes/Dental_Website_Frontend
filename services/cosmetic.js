/**
 * Smile Journey Interactive Functionality
 * Handles the interactive elements of the journey CTA section
 */
document.addEventListener('DOMContentLoaded', function() {
    // Element references
    const timelineButtons = document.querySelectorAll('.timeline-btn');
    const bookingOptions = {
        urgent: document.getElementById('urgent-booking'),
        soon: document.getElementById('soon-booking'),
        planning: document.getElementById('planning-booking')
    };
    const journeySteps = document.querySelectorAll('.journey-step');
    
    // Initialize - hide all booking options
    Object.values(bookingOptions).forEach(option => {
        if (option) option.style.display = 'none';
    });
    
    /**
     * Timeline selection functionality
     * Shows the relevant booking option based on user selection
     */
    timelineButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Deactivate all buttons first
            timelineButtons.forEach(btn => btn.classList.remove('active'));
            
            // Activate current button
            this.classList.add('active');
            
            // Get selected timeline
            const selectedTimeline = this.getAttribute('data-timeline');
            
            // Hide all booking options
            Object.values(bookingOptions).forEach(option => {
                if (option) {
                    option.style.display = 'none';
                    
                    // Fade out animation
                    option.style.opacity = 0;
                }
            });
            
            // Show selected booking option with fade in animation
            if (bookingOptions[selectedTimeline]) {
                bookingOptions[selectedTimeline].style.display = 'block';
                
                // Trigger reflow to ensure animation works
                void bookingOptions[selectedTimeline].offsetWidth;
                
                // Apply fade in
                bookingOptions[selectedTimeline].style.opacity = 1;
                
                // Smooth scroll to booking options (with a slight delay to ensure visibility)
                setTimeout(() => {
                    bookingOptions[selectedTimeline].scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 100);
            }
        });
    });
    
    /**
     * Journey step hover effects
     * Creates a visual focus effect when hovering over steps
     */
    journeySteps.forEach(step => {
        // Mouse enter - focus on current step
        step.addEventListener('mouseenter', function() {
            journeySteps.forEach(s => {
                if (s !== this) {
                    s.style.opacity = '0.7';
                    s.style.transform = 'scale(0.98)';
                }
            });
            this.style.opacity = '1';
            this.style.transform = 'translateY(-10px)';
        });
        
        // Mouse leave - restore all steps
        step.addEventListener('mouseleave', function() {
            journeySteps.forEach(s => {
                s.style.opacity = '1';
                s.style.transform = 'scale(1)';
            });
        });
    });
    
    /**
     * Add smooth transition CSS for animations
     */
    const styleEl = document.createElement('style');
    styleEl.textContent = `
        .booking-option {
            transition: opacity 0.4s ease;
            opacity: 0;
        }
        .journey-step {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
    `;
    document.head.appendChild(styleEl);
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
  });

  document.querySelectorAll('.read-more').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      alert('Detailed info will be added soon!');
    });
  });
  

  