// Updated script with both intersection observer and mobile navigation functionality
document.addEventListener('DOMContentLoaded', function () {
  // Fix white gap between nav and hero
  const navHeight = document.querySelector('.main-nav').offsetHeight;
  const hero = document.querySelector('.hero');
  hero.style.marginTop = navHeight;

  // Why choose cards intersection observer
  const cards = document.querySelectorAll('.why-choose-card');
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once the animation has been triggered
      }
    });
  }, {
    threshold: 0.3 // Trigger the animation when the element is 30% in the viewport
  });
  
  // Observe each card
  cards.forEach(card => {
    observer.observe(card);
  });

  // Mobile navigation functionality
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navbar = document.querySelector('.navbar');
  const dropdowns = document.querySelectorAll('.dropdown');

  // Toggle mobile menu
  mobileNavToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navbar.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  // Handle dropdown clicks on mobile
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
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

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navbar.classList.contains('active') && 
        !navbar.contains(e.target) && 
        e.target !== mobileNavToggle && 
        !mobileNavToggle.contains(e.target)) {
      navbar.classList.remove('active');
      mobileNavToggle.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });

  // Adjust on window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 992) {
      navbar.classList.remove('active');
      mobileNavToggle.classList.remove('active');
      document.body.classList.remove('no-scroll');
      
      // Reset dropdown active states
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
    
    // Recalculate hero margin based on nav height
    const navHeight = document.querySelector('.main-nav').offsetHeight;
    const hero = document.querySelector('.hero');
    hero.style.marginTop = navHeight;
  });
});