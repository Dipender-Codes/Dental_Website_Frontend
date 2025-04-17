   // Tab Functionality
   const tabs = document.querySelectorAll('.tab-button');
   const contents = document.querySelectorAll('.tab-content');

   tabs.forEach(tab => {
     tab.addEventListener('click', () => {
       tabs.forEach(t => t.classList.remove('active'));
       contents.forEach(c => c.classList.remove('active'));

       tab.classList.add('active');
       const content = document.getElementById(tab.dataset.tab);
       content.classList.add('active');
     });
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

  document.querySelectorAll('.alert_message').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      alert('Detailed info will be added soon!');
    });
  });
  