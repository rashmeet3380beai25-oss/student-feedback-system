document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. Theme Toggle (Dark / Light Mode)
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            // Switch to Light Mode
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            themeToggle.style.transform = 'rotate(360deg)';
        } else {
            // Switch to Dark Mode
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            themeToggle.style.transform = 'rotate(0deg)';
        }
        
        // Reset rotation animation
        setTimeout(() => {
            themeToggle.style.transform = 'none';
        }, 300);
    });

    // ==========================================
    // 2. Mobile Sidebar Toggle
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    
    menuToggle.addEventListener('click', () => {
        sidebar.classList.add('show');
    });
    
    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('show');
    });

    // Close sidebar on click outside in mobile view
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !menuToggle.contains(e.target) && 
            sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
        }
    });

    // ==========================================
    // 3. Fade-up Animation on Scroll
    // ==========================================
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const checkFade = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // Add visible class when element enters viewport
            if (elementTop < windowHeight - 50) {
                element.classList.add('visible');
            }
        });
    };
    
    // Initial check on load
    setTimeout(checkFade, 100);
    window.addEventListener('scroll', checkFade);

    // ==========================================
    // 4. Counter Animation for Numbers
    // ==========================================
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower
    
    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix') || '';
            const inc = target / speed;
            let current = 0;
            
            const updateCount = () => {
                current += inc;
                if (current < target) {
                    counter.innerText = Math.ceil(current) + suffix;
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target + suffix;
                }
            };
            updateCount();
        });
    };

    // Delay counter animation slightly for visual effect
    setTimeout(startCounters, 500);

    // ==========================================
    // 5. Animated Progress Bars
    // ==========================================
    const progressFills = document.querySelectorAll('.progress-fill');
    
    // Animate progress bars after layout renders
    setTimeout(() => {
        progressFills.forEach(fill => {
            const width = fill.getAttribute('data-width');
            fill.style.width = width;
        });
    }, 800);
    
    // ==========================================
    // 6. Sidebar Active State Handling
    // ==========================================
    const menuItems = document.querySelectorAll('.sidebar-menu .menu-item:not(.logout)');
    
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all
            menuItems.forEach(mi => mi.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Close sidebar on mobile after selection
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('show');
            }
        });
    });
    
    // ==========================================
    // 7. Ripple Effect for Buttons
    // ==========================================
    const rippleButtons = document.querySelectorAll('.ripple');
    
    rippleButtons.forEach(button => {
        button.addEventListener('mousedown', function (e) {
            // Ripple effect logic handled mostly by CSS, 
            // this is just to ensure it fires correctly on mousedown
        });
    });
});
