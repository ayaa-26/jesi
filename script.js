document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const section = document.querySelector(targetId);
            const headerHeight = document.querySelector('header').offsetHeight;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Update active navigation link
            document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Time slots animation on scroll
    const timeSlots = document.querySelectorAll('.time-slot');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                
                // Add staggered animation to child elements
                const children = entry.target.querySelectorAll('.event-content > *');
                children.forEach((child, index) => {
                    child.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
                });
            }
        });
    }, observerOptions);

    timeSlots.forEach((slot, index) => {
        slot.style.opacity = '0';
        slot.style.transform = 'translateX(-20px)';
        slot.style.transition = 'all 0.5s ease-out';
        slot.style.animationDelay = `${index * 0.1}s`;
        observer.observe(slot);

        // Add click interaction
        slot.addEventListener('click', () => {
            timeSlots.forEach(s => s.classList.remove('active'));
            slot.classList.add('active');
            
            // Scroll slot into better view if needed
            const headerHeight = document.querySelector('header').offsetHeight;
            const slotRect = slot.getBoundingClientRect();
            if (slotRect.top < headerHeight + 20) {
                window.scrollTo({
                    top: window.pageYOffset + slotRect.top - headerHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced current time indicator
    function updateCurrentTimeIndicator() {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();

        timeSlots.forEach(slot => {
            const timeText = slot.querySelector('.time').textContent;
            const [startTime, endTime] = timeText.split('-').map(t => t.trim());
            const [startHours, startMinutes] = startTime.split('h').map(num => parseInt(num));
            const [endHours, endMinutes] = endTime.split('h').map(num => parseInt(num));
            
            const slotStartTime = startHours * 60 + (startMinutes || 0);
            const slotEndTime = endHours * 60 + (endMinutes || 0);

            if (currentTime >= slotStartTime && currentTime < slotEndTime) {
                slot.classList.add('current');
                slot.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                slot.classList.remove('current');
            }
        });
    }

    updateCurrentTimeIndicator();
    setInterval(updateCurrentTimeIndicator, 30000); // Update every 30 seconds

    // Responsive navigation
    const nav = document.querySelector('nav');
    const menuButton = document.createElement('button');
    menuButton.classList.add('menu-toggle');
    menuButton.setAttribute('aria-label', 'Toggle navigation menu');
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    document.querySelector('.header-container').insertBefore(menuButton, nav);

    menuButton.addEventListener('click', () => {
        nav.classList.toggle('show');
        menuButton.classList.toggle('active');
        menuButton.innerHTML = nav.classList.contains('show') ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuButton.contains(e.target)) {
            nav.classList.remove('show');
            menuButton.classList.remove('active');
            menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('show')) {
            nav.classList.remove('show');
            menuButton.classList.remove('active');
            menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});
