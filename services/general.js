function scrollToBooking() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  function toggleContrast() {
    document.body.classList.toggle('high-contrast');
  }

  document.addEventListener("DOMContentLoaded", function () {
    const scrollTrigger = document.getElementById('scrollTrigger');
    const scrollText = document.getElementById('scrollText');
    const arrowIcon = document.getElementById('arrowIcon').querySelector('polyline');
    const treatmentSection = document.getElementById('more-services');
  
    scrollTrigger.addEventListener('click', () => {
      const isVisible = treatmentSection.classList.contains('section-visible');
  
      if (isVisible) {
        // Hide the section
        treatmentSection.classList.remove('section-visible');
        scrollText.textContent = 'SCROLL DOWN';
        arrowIcon.setAttribute('points', '6 9 12 15 18 9'); // Down arrow
      } else {
        // Show the section
        treatmentSection.classList.add('section-visible');
        treatmentSection.scrollIntoView({ behavior: 'smooth' });
        scrollText.textContent = 'SCROLL UP';
        arrowIcon.setAttribute('points', '6 15 12 9 18 15'); // Up arrow
      }
    });
  
    // Optional: expand/collapse each treatment card
    const detailButtons = document.querySelectorAll('.btn-toggle-details');
    detailButtons.forEach(button => {
      button.addEventListener('click', () => {
        const details = button.closest('.service-card').querySelector('.service-details');
        const showing = details.style.display === 'block';
        details.style.display = showing ? 'none' : 'block';
        button.textContent = showing ? 'Learn More' : 'Show Less';
      });
    });
  });

  // Fade-in animation when section is visible on scroll
document.addEventListener("DOMContentLoaded", () => {
  const visitSection = document.getElementById("visit-us");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visitSection.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1
  });

  observer.observe(visitSection);
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