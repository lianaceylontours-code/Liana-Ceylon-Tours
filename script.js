// Enhanced Image Slider with Smooth Transitions
document.addEventListener('DOMContentLoaded', function() {
  // Initialize slider
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevArrow = document.querySelector('.arrow.prev');
  const nextArrow = document.querySelector('.arrow.next');
  let currentSlide = 0;
  let slideInterval;
  let isTransitioning = false;

  // Function to show a specific slide with smooth transition
  function showSlide(n) {
    if (isTransitioning) return;
    
    isTransitioning = true;
    
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Handle wrap-around for slide index
    if (n >= slides.length) {
      currentSlide = 0;
    } else if (n < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = n;
    }
    
    // Add active class to current slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    // Reset transitioning flag after animation completes
    setTimeout(() => {
      isTransitioning = false;
    }, 400); // Match this with CSS transition duration
  }

  // Function to go to next slide
  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  // Function to go to previous slide
  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  // Start auto-playing the slider
  function startSlider() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  // Stop auto-playing the slider
  function stopSlider() {
    clearInterval(slideInterval);
  }

  // Event listeners for navigation arrows
  if (nextArrow) {
    nextArrow.addEventListener('click', () => {
      stopSlider();
      nextSlide();
      startSlider();
    });
  }

  if (prevArrow) {
    prevArrow.addEventListener('click', () => {
      stopSlider();
      prevSlide();
      startSlider();
    });
  }

  // Event listeners for navigation dots
  if (dots.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        if (index === currentSlide) return;
        stopSlider();
        showSlide(index);
        startSlider();
      });
    });
  }

  // Pause slider when user hovers over it
  const slider = document.querySelector('.slider');
  if (slider) {
    slider.addEventListener('mouseenter', stopSlider);
    slider.addEventListener('mouseleave', startSlider);
  }

  // Initialize the slider if slides exist
  if (slides.length > 0) {
    showSlide(currentSlide);
    startSlider();
  }

  // Smooth scroll functionality
  const navLinks = document.querySelectorAll('nav a[href*="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#' || this.getAttribute('href') === '#home') return;
      
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navbarHeight = document.querySelector('nav').offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        history.pushState(null, null, targetId);
      }
    });
  });

  // Feedback form handling
  const feedbackForm = document.querySelector('.feedback-form');
  
  if (feedbackForm) {
    // Create status message element
    const statusDiv = document.createElement('div');
    statusDiv.className = 'form-status';
    feedbackForm.insertBefore(statusDiv, feedbackForm.firstChild);
    
    feedbackForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading state
      const submitBtn = feedbackForm.querySelector('.btn-submit');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Get form data
      const formData = new FormData(feedbackForm);
      
      // Send form data using Fetch API
      fetch(feedbackForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // Show success message
          statusDiv.textContent = 'Thank you for your feedback! We will get back to you soon.';
          statusDiv.className = 'form-status success';
          statusDiv.style.display = 'block';
          feedbackForm.reset();
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(error => {
        // Show error message
        statusDiv.textContent = 'There was a problem sending your message. Please try again.';
        statusDiv.className = 'form-status error';
        statusDiv.style.display = 'block';
      })
      .finally(() => {
        // Restore button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Hide status message after 5 seconds
        setTimeout(() => {
          statusDiv.style.display = 'none';
        }, 5000);
      });
    });
  }

  // Contact form handling (if exists)
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }

  // Gallery item hover effects
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
  });

  // Animation on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll('.feature, .gallery-item, .feedback-form');
    
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
  const animatedElements = document.querySelectorAll('.feature, .gallery-item, .feedback-form');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  // Listen for scroll events
  window.addEventListener('scroll', animateOnScroll);
  // Initial check
  animateOnScroll();

  // Mobile menu toggle (if needed in the future)
  const setupMobileMenu = function() {
    const menuToggle = document.createElement('button');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.className = 'menu-toggle';
    menuToggle.style.display = 'none';
    document.querySelector('nav').appendChild(menuToggle);
    
    const navUL = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
      navUL.style.display = navUL.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Check screen size and toggle menu visibility
    function checkScreenSize() {
      if (window.innerWidth <= 768) {
        menuToggle.style.display = 'block';
        navUL.style.display = 'none';
      } else {
        menuToggle.style.display = 'none';
        navUL.style.display = 'flex';
      }
    }
    
    // Initial check
    checkScreenSize();
    // Listen for resize events
    window.addEventListener('resize', checkScreenSize);
  };

  // Uncomment the line below if you want to enable mobile menu functionality
  // setupMobileMenu();
});

// Additional utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Preload images for better performance
function preloadImages() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    const src = img.getAttribute('src');
    if (src) {
      new Image().src = src;
    }
  });
}

// Initialize image preloading
window.addEventListener('load', preloadImages);

// Simple auto-hide navbar on scroll
document.addEventListener('DOMContentLoaded', function() {
  let lastScrollTop = 0;
  const navbar = document.querySelector('nav');
  const navbarHeight = navbar.offsetHeight;
  
  // Add scroll margin to sections
  document.querySelectorAll('section[id]').forEach(section => {
    section.style.scrollMarginTop = navbarHeight + 'px';
  });
  
  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scroll down - hide navbar
      navbar.style.transform = 'translateY(-100%)';
    } else {
      // Scroll up - show navbar
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  }, { passive: true });
});
// Mobile menu functionality with animations
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const closeMenuBtn = document.querySelector('.close-menu');
  const navUL = document.querySelector('nav ul');
  const body = document.body;
  
  if (menuToggle && navUL && closeMenuBtn) {
    // Function to open menu
    function openMenu() {
      navUL.classList.add('show');
      body.classList.add('menu-open');
      body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    }
    
    // Function to close menu
    function closeMenu() {
      navUL.classList.remove('show');
      body.classList.remove('menu-open');
      body.style.overflow = ''; // Re-enable scrolling
    }
    
    // Event listeners
    menuToggle.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeMenu);
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (body.classList.contains('menu-open') && 
          !navUL.contains(e.target) && 
          !menuToggle.contains(e.target) && 
          !closeMenuBtn.contains(e.target)) {
        closeMenu();
      }
    });
    
    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && body.classList.contains('menu-open')) {
        closeMenu();
      }
    });
    
    // Check screen size and adjust menu
    function checkScreenSize() {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    }
    
    // Initial check
    checkScreenSize();
    // Listen for resize events
    window.addEventListener('resize', checkScreenSize);
  }
});

// Animation for View Packages section
function animateViewPackagesSection() {
  const section = document.querySelector('.view-packages-section');
  if (!section) return;
  
  const sectionTop = section.getBoundingClientRect().top;
  const sectionVisible = 150;
  
  if (sectionTop < window.innerHeight - sectionVisible) {
    section.classList.add('animate');
  }
}

// Initialize animation
window.addEventListener('scroll', animateViewPackagesSection);
window.addEventListener('load', animateViewPackagesSection);