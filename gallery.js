// Gallery filtering functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  // Filter gallery items
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Show/hide gallery items based on filter
      galleryItems.forEach(item => {
        if (filterValue === 'all') {
          item.style.display = 'block';
        } else if (item.classList.contains(filterValue)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  // Simple lightbox effect
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const imgSrc = this.querySelector('img').src;
      const imgAlt = this.querySelector('img').alt;
      
      // Create lightbox overlay
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        cursor: pointer;
      `;
      
      // Create image element
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = imgAlt;
      img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 8px;
      `;
      
      // Add close button
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '<i class="fas fa-times"></i>';
      closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: white;
        font-size: 24px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s;
      `;
      
      closeBtn.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255, 255, 255, 0.2)';
      });
      
      closeBtn.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 255, 255, 0.1)';
      });
      
      // Add elements to lightbox
      lightbox.appendChild(img);
      lightbox.appendChild(closeBtn);
      
      // Add lightbox to body
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden'; // Prevent scrolling
      
      // Close lightbox functions
      function closeLightbox() {
        document.body.removeChild(lightbox);
        document.body.style.overflow = ''; // Re-enable scrolling
      }
      
      lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
          closeLightbox();
        }
      });
      
      closeBtn.addEventListener('click', closeLightbox);
      
      // Close with Escape key
      document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
          closeLightbox();
          document.removeEventListener('keydown', closeOnEscape);
        }
      });
    });
  });
});
