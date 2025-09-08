// For Her Health - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Change hamburger icon
            if (navMenu.classList.contains('active')) {
                mobileMenuToggle.textContent = '✕';
            } else {
                mobileMenuToggle.textContent = '☰';
            }
        });
        
        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
            }
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navigationLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navigationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active Navigation Link Highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            
            if (sectionTop <= navbarHeight + 100 && sectionTop + sectionHeight > navbarHeight + 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        }
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('.btn');
            const originalButtonText = submitButton.textContent;
            
            if (emailInput && emailInput.value.trim()) {
                // Show loading state
                submitButton.textContent = 'جاري الإرسال...';
                submitButton.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    // Show success message
                    showNotification('تم الاشتراك بنجاح! شكراً لك.', 'success');
                    
                    // Reset form
                    emailInput.value = '';
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                }, 1500);
            } else {
                showNotification('يرجى إدخال عنوان بريد إلكتروني صحيح.', 'error');
            }
        });
    }
    
    // Notification System
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="إغلاق">✕</button>
            </div>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            padding: var(--space-16);
            z-index: 10000;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform var(--duration-normal) var(--ease-standard);
        `;
        
        // Type-specific styling
        if (type === 'success') {
            notification.style.borderColor = 'var(--color-success)';
            notification.style.backgroundColor = 'rgba(var(--color-success-rgb), 0.1)';
        } else if (type === 'error') {
            notification.style.borderColor = 'var(--color-error)';
            notification.style.backgroundColor = 'rgba(var(--color-error-rgb), 0.1)';
        }
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Handle close button
        const closeButton = notification.querySelector('.notification-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                closeNotification(notification);
            });
        }
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                closeNotification(notification);
            }
        }, 5000);
    }
    
    function closeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }
    
    // Scroll to Top Functionality
    function createScrollToTopButton() {
        const scrollToTopButton = document.createElement('button');
        scrollToTopButton.className = 'scroll-to-top';
        scrollToTopButton.innerHTML = '↑';
        scrollToTopButton.setAttribute('aria-label', 'العودة إلى الأعلى');
        
        scrollToTopButton.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 30px;
            width: 50px;
            height: 50px;
            background: var(--color-primary);
            color: var(--color-btn-primary-text);
            border: none;
            border-radius: var(--radius-full);
            font-size: var(--font-size-xl);
            cursor: pointer;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all var(--duration-normal) var(--ease-standard);
        `;
        
        scrollToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(scrollToTopButton);
        
        // Show/hide scroll to top button
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopButton.style.opacity = '1';
                scrollToTopButton.style.visibility = 'visible';
            } else {
                scrollToTopButton.style.opacity = '0';
                scrollToTopButton.style.visibility = 'hidden';
            }
        });
    }
    
    // Initialize scroll to top button
    createScrollToTopButton();
    
    // Intersection Observer for Animations
    function initializeAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.topic-card, .stat-card, .quick-link-card, .myth-fact-card');
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }
    
    // Initialize animations if supported
    if ('IntersectionObserver' in window) {
        initializeAnimations();
    }
    
    // Search Functionality within Sections
    function initializeSearch() {
        // Create search input
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-lg);
            padding: var(--space-12);
            box-shadow: var(--shadow-lg);
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: all var(--duration-normal) var(--ease-standard);
        `;
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'البحث في المحتوى...';
        searchInput.className = 'search-input';
        searchInput.style.cssText = `
            width: 250px;
            padding: var(--space-8);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-base);
            font-size: var(--font-size-sm);
        `;
        
        searchContainer.appendChild(searchInput);
        document.body.appendChild(searchContainer);
        
        // Toggle search with Ctrl+K or Cmd+K
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const isVisible = searchContainer.style.opacity === '1';
                
                if (isVisible) {
                    searchContainer.style.opacity = '0';
                    searchContainer.style.visibility = 'hidden';
                } else {
                    searchContainer.style.opacity = '1';
                    searchContainer.style.visibility = 'visible';
                    searchInput.focus();
                }
            }
            
            // Close search with Escape
            if (e.key === 'Escape') {
                searchContainer.style.opacity = '0';
                searchContainer.style.visibility = 'hidden';
            }
        });
        
        // Simple search functionality
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const allTextElements = document.querySelectorAll('.topic-card h3, .topic-card p, .topic-list li');
            
            // Clear previous highlights
            allTextElements.forEach(element => {
                element.style.backgroundColor = '';
                element.style.padding = '';
            });
            
            if (searchTerm) {
                allTextElements.forEach(element => {
                    const text = element.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        element.style.backgroundColor = 'rgba(var(--color-warning-rgb), 0.2)';
                        element.style.padding = 'var(--space-4)';
                        element.style.borderRadius = 'var(--radius-sm)';
                        
                        // Scroll to first match
                        if (element === document.querySelector('.topic-card h3:not([style*="background-color"]), .topic-card p:not([style*="background-color"]), .topic-list li:not([style*="background-color"])')) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }
                });
            }
        });
        
        // Close search when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchContainer.contains(e.target)) {
                searchContainer.style.opacity = '0';
                searchContainer.style.visibility = 'hidden';
            }
        });
    }
    
    // Initialize search functionality
    initializeSearch();
    
    // Loading States for Dynamic Content
    function showLoading(element) {
        if (element) {
            element.classList.add('loading');
        }
    }
    
    function hideLoading(element) {
        if (element) {
            element.classList.remove('loading');
        }
    }
    
    // Print Functionality
    function initializePrintFeature() {
        // Add print button to each section
        const sections = document.querySelectorAll('.content-section');
        
        sections.forEach(section => {
            const sectionTitle = section.querySelector('.section-title');
            if (sectionTitle) {
                const printButton = document.createElement('button');
                printButton.className = 'print-section-btn';
                printButton.innerHTML = '🖨️ طباعة هذا القسم';
                printButton.style.cssText = `
                    background: var(--color-secondary);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-base);
                    padding: var(--space-8) var(--space-16);
                    font-size: var(--font-size-sm);
                    cursor: pointer;
                    margin: var(--space-16) 0;
                    float: left;
                    transition: all var(--duration-fast) var(--ease-standard);
                `;
                
                printButton.addEventListener('click', function() {
                    printSection(section);
                });
                
                sectionTitle.insertAdjacentElement('afterend', printButton);
            }
        });
    }
    
    function printSection(section) {
        const printWindow = window.open('', '_blank');
        const sectionHTML = section.outerHTML;
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <title>من أجلها | For Her Health - طباعة</title>
                <style>
                    body { font-family: Arial, sans-serif; direction: rtl; text-align: right; }
                    .print-section-btn { display: none; }
                    .topic-card { border: 1px solid #ccc; padding: 20px; margin: 20px 0; }
                    .section-title { color: #2d8091; }
                    .topic-list li::before { content: "✓ "; color: #2d8091; }
                </style>
            </head>
            <body>
                <h1>من أجلها | For Her Health</h1>
                ${sectionHTML}
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.print();
    }
    
    // Initialize print feature
    initializePrintFeature();
    
    // Accessibility Enhancements
    function enhanceAccessibility() {
        // Add skip links
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'تخطي إلى المحتوى الرئيسي';
        skipLink.className = 'skip-link sr-only';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--color-primary);
            color: var(--color-btn-primary-text);
            padding: 8px;
            text-decoration: none;
            z-index: 10000;
            border-radius: 4px;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main landmark
        const mainElement = document.querySelector('main');
        if (mainElement) {
            mainElement.id = 'main';
        }
        
        // Enhance form labels
        const formControls = document.querySelectorAll('.form-control');
        formControls.forEach(control => {
            if (!control.getAttribute('aria-label') && !document.querySelector(`label[for="${control.id}"]`)) {
                control.setAttribute('aria-label', control.placeholder || 'حقل إدخال');
            }
        });
    }
    
    // Initialize accessibility enhancements
    enhanceAccessibility();
    
    // Performance Monitoring
    function initializePerformanceMonitoring() {
        if ('performance' in window) {
            window.addEventListener('load', function() {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                        console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                    }
                }, 0);
            });
        }
    }
    
    // Initialize performance monitoring
    initializePerformanceMonitoring();
    
    console.log('✅ For Her Health website initialized successfully');
});