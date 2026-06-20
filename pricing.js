document.addEventListener('DOMContentLoaded', function() {
  // Format price function (was missing)
  function formatPrice(price) {
    return `$${price}`;
  }

  // Populate prices from centralized data
  function updatePricingUI() {
    // Update Classic package
    document.getElementById('package-classic-name').textContent = "Heritage & Nature Escape";
    document.getElementById('package-classic-price').textContent = formatPrice(70);
    document.getElementById('package-classic-duration').textContent = "Per day";
    document.getElementById('package-classic-desc').textContent = "Experience Sri Lanka's top cultural and natural attractions with our bestselling tour package just $70 per day!";
  }

  // Call this function when the page loads
  updatePricingUI();
  
  // FAQ accordion functionality - Fixed implementation
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Toggle current item
      item.classList.toggle('active');
      
      // Close other FAQ items when opening one
      if (item.classList.contains('active')) {
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
      }
    });
  });
  
  // Animation for elements on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll('.pricing-card, .included-item');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Initialize animation styles
  const animatedElements = document.querySelectorAll('.pricing-card, .included-item');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Listen for scroll events
  window.addEventListener('scroll', animateOnScroll);
  // Initial check
  animateOnScroll();
  
  // Book Now button functionality
  const bookNowButtons = document.querySelectorAll('.btn-primary');
  
  bookNowButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the package name from the card
      const card = this.closest('.pricing-card');
      const packageName = card.querySelector('h3').textContent;
      
      // Redirect to booking page with package parameter
      window.location.href = `booking.html?package=${encodeURIComponent(packageName)}`;
    });
  });
});
