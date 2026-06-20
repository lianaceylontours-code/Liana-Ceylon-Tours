// Pricing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Populate prices from centralized data
  function updatePricingUI() {
    // Update Essential package
    document.getElementById('package-essential-name').textContent = pricingData.packages.essential.name;
    document.getElementById('package-essential-price').textContent = formatPrice(pricingData.packages.essential.price);
    document.getElementById('package-essential-duration').textContent = pricingData.packages.essential.duration;
    document.getElementById('package-essential-desc').textContent = pricingData.packages.essential.description;
    
    // Update Classic package
    document.getElementById('package-classic-name').textContent = pricingData.packages.classic.name;
    document.getElementById('package-classic-price').textContent = formatPrice(pricingData.packages.classic.price);
    document.getElementById('package-classic-duration').textContent = pricingData.packages.classic.duration;
    document.getElementById('package-classic-desc').textContent = pricingData.packages.classic.description;
    
    // Update Luxury package
    document.getElementById('package-luxury-name').textContent = pricingData.packages.luxury.name;
    document.getElementById('package-luxury-price').textContent = formatPrice(pricingData.packages.luxury.price);
    document.getElementById('package-luxury-duration').textContent = pricingData.packages.luxury.duration;
    document.getElementById('package-luxury-desc').textContent = pricingData.packages.luxury.description;
  }

  // Call this function when the page loads
  updatePricingUI();
  
  // Filter functionality for pricing packages
  const filterButtons = document.querySelectorAll('.filter-btn');
  const pricingCards = document.querySelectorAll('.pricing-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Show/hide pricing cards based on filter
      pricingCards.forEach(card => {
        if (filterValue === 'all') {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else if (card.classList.contains(filterValue)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // FAQ accordion functionality
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
  
  // Animation for elements on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll('.pricing-card, .included-item, .custom-tour');
    
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
  const animatedElements = document.querySelectorAll('.pricing-card, .included-item, .custom-tour');
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