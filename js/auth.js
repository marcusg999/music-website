/**
 * Authentication Manager - Client-side admin authentication
 */

class AuthManager {
    constructor() {
        // Default credentials (client-side demo - in production, use server-side auth)
        this.credentials = {
            username: 'admin',
            password: 'beas2026'
        };
        
        this.isAuthenticated = false;
        this.init();
    }

    init() {
        // Check if user is already logged in (session storage)
        const authState = sessionStorage.getItem('isAuthenticated');
        if (authState === 'true') {
            this.isAuthenticated = true;
            this.updateUI();
        }
        
        // Initialize UI
        this.updateUI();
    }

    login(username, password) {
        if (username === this.credentials.username && password === this.credentials.password) {
            this.isAuthenticated = true;
            sessionStorage.setItem('isAuthenticated', 'true');
            this.updateUI();
            return true;
        }
        return false;
    }

    logout() {
        this.isAuthenticated = false;
        sessionStorage.removeItem('isAuthenticated');
        this.updateUI();
        
        // Show logout notification
        if (typeof window.musicWebsite !== 'undefined') {
            window.musicWebsite.showNotification('Logged out successfully', 'success');
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    isLoggedIn() {
        return this.isAuthenticated;
    }

    updateUI() {
        // Update upload controls visibility
        const uploadControls = document.querySelector('.upload-controls');
        const adminBtn = document.getElementById('admin-btn');
        const logoutBtn = document.getElementById('logout-btn');
        
        if (this.isAuthenticated) {
            // Show upload controls
            if (uploadControls) {
                uploadControls.style.display = 'flex';
            }
            
            // Hide admin button, show logout
            if (adminBtn) adminBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'inline-block';
        } else {
            // Hide upload controls
            if (uploadControls) {
                uploadControls.style.display = 'none';
            }
            
            // Show admin button, hide logout
            if (adminBtn) adminBtn.style.display = 'inline-block';
            if (logoutBtn) logoutBtn.style.display = 'none';
        }
        
        // Update add event button (only admins can add events)
        const addEventBtn = document.getElementById('add-event-btn');
        if (addEventBtn) {
            if (this.isAuthenticated) {
                addEventBtn.style.display = 'inline-block';
            } else {
                addEventBtn.style.display = 'none';
            }
        }
    }

    showLoginModal() {
        const modal = document.getElementById('admin-login-modal');
        if (modal) {
            modal.classList.add('active');
            // Clear previous input
            document.getElementById('admin-username').value = '';
            document.getElementById('admin-password').value = '';
            // Focus on username field
            setTimeout(() => {
                document.getElementById('admin-username').focus();
            }, 100);
        }
    }

    hideLoginModal() {
        const modal = document.getElementById('admin-login-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    handleLoginSubmit(event) {
        event.preventDefault();
        
        const username = document.getElementById('admin-username').value;
        const password = document.getElementById('admin-password').value;
        const errorMsg = document.getElementById('login-error');
        
        if (this.login(username, password)) {
            this.hideLoginModal();
            if (typeof window.musicWebsite !== 'undefined') {
                window.musicWebsite.showNotification('Welcome, Admin!', 'success');
            }
            // Scroll to featured section
            setTimeout(() => {
                scrollToSection('featured');
            }, 500);
        } else {
            errorMsg.textContent = 'Invalid username or password';
            errorMsg.style.display = 'block';
            
            // Shake animation
            const form = document.getElementById('admin-login-form');
            form.style.animation = 'shake 0.5s';
            setTimeout(() => {
                form.style.animation = '';
            }, 500);
        }
    }
}

// Create global auth instance
const authManager = new AuthManager();
