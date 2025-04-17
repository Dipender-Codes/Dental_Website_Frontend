 // FAQ Toggle Functionality
 document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle active class on the clicked item
            item.classList.toggle('active');
            
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });

    // Animate cards on scroll with intersection observer
    const problemCards = document.querySelectorAll('.problem-card');
    const statItems = document.querySelectorAll('.stat-item');
    
    // Set initial state
    problemCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
    });
    
    statItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
    });
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation for problem cards
                if (entry.target.classList.contains('problem-card')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, Array.from(problemCards).indexOf(entry.target) * 150);
                }
                
                // Add animation for stat items
                if (entry.target.classList.contains('stat-item')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        
                        // Animate the stat number
                        const countElement = entry.target.querySelector('.stat-number');
                        const targetCount = countElement.getAttribute('data-count');
                        animateCount(countElement, targetCount);
                    }, Array.from(statItems).indexOf(entry.target) * 200);
                }
                
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Start observing elements
    problemCards.forEach(card => {
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(card);
    });
    
    statItems.forEach(item => {
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(item);
    });
    
    // Function to animate counting
    function animateCount(element, targetCount) {
        let currentCount = 0;
        const duration = 2000; // ms
        const step = parseInt(targetCount) / (duration / 16);
        
        // Handle different formats (with commas, percentage, etc.)
        const format = element.textContent;
        const hasPlus = format.includes('+');
        const hasPercent = format.includes('%');
        const hasComma = format.includes(',');
        
        const counter = setInterval(() => {
            currentCount += step;
            if (currentCount >= targetCount) {
                currentCount = targetCount;
                clearInterval(counter);
            }
            
            let displayValue = Math.floor(currentCount).toString();
            
            // Format the number according to original format
            if (hasComma) {
                displayValue = Math.floor(currentCount).toLocaleString();
            }
            
            if (hasPlus) {
                displayValue += '+';
            }
            
            if (hasPercent) {
                displayValue += '%';
            }
            
            element.textContent = displayValue;
        }, 16);
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
  });