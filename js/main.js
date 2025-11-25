// Main JavaScript file for Mental Health Support System
// Handles navigation, UI interactions, and core functionality

class MentalHealthApp {
    constructor() {
        this.currentSection = 'home';
        this.isAdmin = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadUserPreferences();
        this.initializeSections();
        this.setupNavigation();
        this.checkAdminAccess();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.getAttribute('href').substring(1);
                this.showSection(section);
            });
        });

        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });

        // Window resize handling
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Scroll handling for navbar
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    setupNavigation() {
        // Update active nav link based on current section
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${this.currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
            this.setupNavigation();

            // Initialize section-specific functionality
            this.initializeSection(sectionId);
        }
    }

    initializeSection(sectionId) {
        switch (sectionId) {
            case 'chat':
                this.initializeChat();
                break;
            case 'booking':
                this.initializeBooking();
                break;
            case 'resources':
                this.initializeResources();
                break;
            case 'community':
                this.initializeCommunity();
                break;
            case 'screening':
                this.initializeScreening();
                break;
            case 'admin':
                this.initializeAdmin();
                break;
        }
    }

    initializeSections() {
        // Initialize all sections that need setup
        this.initializeResources();
        this.initializeScreening();
        this.initializeAdmin();
    }

    initializeChat() {
        // Chat functionality is handled in chat.js
        if (typeof window.ChatManager !== 'undefined') {
            window.ChatManager.init();
        }
    }

    initializeBooking() {
        // Booking functionality is handled in booking.js
        if (typeof window.BookingManager !== 'undefined') {
            window.BookingManager.init();
        }
    }

    initializeResources() {
        // Resources functionality is handled in resources.js
        if (typeof window.ResourcesManager !== 'undefined') {
            window.ResourcesManager.init();
        }
    }

    initializeCommunity() {
        // Community functionality is handled in community.js
        if (typeof window.CommunityManager !== 'undefined') {
            window.CommunityManager.init();
        }
    }

    initializeScreening() {
        // Screening functionality is handled in screening.js
        if (typeof window.ScreeningManager !== 'undefined') {
            window.ScreeningManager.init();
        }
    }

    initializeAdmin() {
        // Admin functionality is handled in admin.js
        if (typeof window.AdminManager !== 'undefined') {
            window.AdminManager.init();
        }
    }

    checkAdminAccess() {
        // Check if user has admin access (in real app, this would be server-side)
        const adminKey = localStorage.getItem('adminKey');
        if (adminKey === 'admin123') { // Simple demo key
            this.isAdmin = true;
            document.querySelectorAll('.admin-only').forEach(el => {
                el.classList.add('show');
            });
        }
    }

    loadUserPreferences() {
        // Load user preferences from localStorage
        const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
        
        // Apply theme if set
        if (preferences.theme) {
            document.body.classList.add(preferences.theme);
        }

        // Load language preference
        if (preferences.language) {
            this.setLanguage(preferences.language);
        }
    }

    saveUserPreferences(preferences) {
        const currentPrefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
        const updatedPrefs = { ...currentPrefs, ...preferences };
        localStorage.setItem('userPreferences', JSON.stringify(updatedPrefs));
    }

    setLanguage(language) {
        // Language switching functionality
        document.documentElement.lang = language;
        this.saveUserPreferences({ language });
    }

    handleResize() {
        // Handle responsive behavior
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            // Mobile-specific adjustments
            document.querySelector('.nav-menu')?.classList.remove('active');
            document.querySelector('.hamburger')?.classList.remove('active');
        }
    }

    handleScroll() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: inherit; cursor: pointer; margin-left: auto;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto remove after duration
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, duration);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // Utility methods
    formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    }

    formatTime(time) {
        return new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).format(new Date(`2000-01-01T${time}`));
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Data persistence methods
    saveData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving data:', error);
            return false;
        }
    }

    loadData(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error('Error loading data:', error);
            return defaultValue;
        }
    }

    // Analytics tracking (for admin dashboard)
    trackEvent(eventName, data = {}) {
        const events = this.loadData('analyticsEvents', []);
        events.push({
            id: this.generateId(),
            event: eventName,
            data: data,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        });
        this.saveData('analyticsEvents', events);
    }

    // Export data for admin
    exportData() {
        const data = {
            userPreferences: this.loadData('userPreferences', {}),
            chatHistory: this.loadData('chatHistory', []),
            bookings: this.loadData('bookings', []),
            screeningResults: this.loadData('screeningResults', []),
            communityPosts: this.loadData('communityPosts', []),
            analyticsEvents: this.loadData('analyticsEvents', [])
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mental-health-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Global functions for HTML onclick handlers
function showSection(sectionId) {
    if (window.app) {
        window.app.showSection(sectionId);
    }
}

function showModal(modalId) {
    if (window.app) {
        window.app.showModal(modalId);
    }
}

function closeModal(modalId) {
    if (window.app) {
        window.app.hideModal(modalId);
    }
}

function showNewPostModal() {
    showModal('newPostModal');
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MentalHealthApp();
    
    // Track page view
    window.app.trackEvent('page_view', {
        section: 'home',
        timestamp: new Date().toISOString()
    });
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        window.app.trackEvent('page_focus');
    } else {
        window.app.trackEvent('page_blur');
    }
});

// Handle beforeunload for data saving
window.addEventListener('beforeunload', () => {
    // Save any pending data
    if (window.app) {
        window.app.trackEvent('page_unload');
    }
});
