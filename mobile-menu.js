document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const navLinks = document.querySelectorAll('.mobile-nav ul li a');
    const body = document.body;
    const closeBtn = document.querySelector('.close-btn');

    // Function to toggle menu state
    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        body.classList.toggle('no-scroll');
        burger.classList.toggle('toggle');
        
        // Animate links
        navLinks.forEach((link, index) => {
            if (mobileMenu.classList.contains('active')) {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index * 0.1 + 0.3}s`;
            } else {
                link.style.animation = '';
            }
        });
    }

    // Function to close menu
    function closeMenu() {
        mobileMenu.classList.remove('active');
        burger.classList.remove('toggle');
        body.classList.remove('no-scroll');
        navLinks.forEach(link => {
            link.style.animation = '';
        });
    }

    // Event listeners
    burger.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', closeMenu);

    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    // Close menu when clicking outside (mobile only)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !e.target.closest('.mobile-nav') && 
            !e.target.closest('.burger') && 
            mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });
});