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

  // The original review code
  const reviews = [
    {
      name: "Monica Cendana",
      text: "Dr. Su and her team are amazing! They genuinely care about my dental health. She even helped with a tongue skin condition by trying a non-invasive method before surgery, which worked perfectly. Easy parking, appointments are always on time, and Dr. Su is responsive and attentive when I'm in pain. Highly recommend."
    },
    {
      name: "Mel K.",
      text: "Excellent dentist who takes time and care to offer superb cleaning and more elaborate dental services. Ably assisted by talented and friendly staff. Highly recommended!"
    },
    {
      name: "Rita Zhang",
      text: "It's always a pleasure to visit with Dr. Su and her team. Always excellent work! Our family have been looked after by Dr. Su over 7 years and kids never fear going to the dentist AT ALL. We trust her work and her advice completely, all of her work has been outstanding."
    }
  ];

  const reviewContainer = document.getElementById("reviewCards");
  
  if (reviewContainer) {
    reviewContainer.innerHTML = ''; // Clear any existing content
    
    reviews.forEach(review => {
      const card = document.createElement("div");
      card.classList.add("review-card");
    
      card.innerHTML = `
        <div class="stars">★★★★★</div>
        <p>${review.text}</p>
        <h4>— ${review.name}</h4>
      `;
    
      reviewContainer.appendChild(card);
    });
  }
  
  // Update copyright year automatically
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') !== '#') {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });