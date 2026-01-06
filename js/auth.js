/**
 * Authentication Manager - Client-side admin authentication
 */

class AuthManager {
    constructor() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.initializeUsers();
        this.init();
    }

    initializeUsers() {
        // Initialize user list in localStorage if not exists
        const users = localStorage.getItem('adminUsers');
        if (!users) {
            // Default admin user
            const defaultUsers = [
                {
                    username: 'admin',
                    password: 'beas2026',
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem('adminUsers', JSON.stringify(defaultUsers));
        }
    }

    getUsers() {
        const users = localStorage.getItem('adminUsers');
        return users ? JSON.parse(users) : [];
    }

    addUser(username, password) {
        if (!username || !password) {
            return { success: false, message: 'Username and password are required' };
        }

        const users = this.getUsers();
        
        // Check if username already exists
        if (users.some(u => u.username === username)) {
            return { success: false, message: 'Username already exists' };
        }

        // Add new user
        users.push({
            username: username,
            password: password,
            createdAt: new Date().toISOString()
        });

        localStorage.setItem('adminUsers', JSON.stringify(users));
        return { success: true, message: 'User added successfully' };
    }

    deleteUser(username) {
        if (username === 'admin') {
            return { success: false, message: 'Cannot delete default admin user' };
        }

        const users = this.getUsers();
        const filteredUsers = users.filter(u => u.username !== username);
        
        if (filteredUsers.length === users.length) {
            return { success: false, message: 'User not found' };
        }

        localStorage.setItem('adminUsers', JSON.stringify(filteredUsers));
        return { success: true, message: 'User deleted successfully' };
    }

    init() {
        // Check if user is already logged in (session storage)
        const authState = sessionStorage.getItem('isAuthenticated');
        const currentUser = sessionStorage.getItem('currentUser');
        if (authState === 'true' && currentUser) {
            this.isAuthenticated = true;
            this.currentUser = currentUser;
            this.updateUI();
        }
        
        // Initialize UI
        this.updateUI();
    }

    login(username, password) {
        const users = this.getUsers();
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            this.isAuthenticated = true;
            this.currentUser = username;
            sessionStorage.setItem('isAuthenticated', 'true');
            sessionStorage.setItem('currentUser', username);
            this.updateUI();
            return true;
        }
        return false;
    }

    logout() {
        this.isAuthenticated = false;
        this.currentUser = null;
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('currentUser');
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

    isAdmin() {
        return this.isAuthenticated;
    }

    updateUI() {
        // Update upload controls visibility
        const uploadControls = document.querySelector('.upload-controls');
        const adminBtn = document.getElementById('admin-btn');
        const logoutBtn = document.getElementById('logout-btn');
        const manageUsersBtn = document.getElementById('manage-users-btn');
        
        if (this.isAuthenticated) {
            // Show upload controls
            if (uploadControls) {
                uploadControls.style.display = 'flex';
            }
            
            // Hide admin button, show logout and manage users
            if (adminBtn) adminBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'inline-block';
            if (manageUsersBtn) manageUsersBtn.style.display = 'inline-block';
        } else {
            // Hide upload controls
            if (uploadControls) {
                uploadControls.style.display = 'none';
            }
            
            // Show admin button, hide logout and manage users
            if (adminBtn) adminBtn.style.display = 'inline-block';
            if (logoutBtn) logoutBtn.style.display = 'none';
            if (manageUsersBtn) manageUsersBtn.style.display = 'none';
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

        // Gallery upload controls
        const galleryUploadControls = document.getElementById('galleryUploadControls');
        if (galleryUploadControls) {
            galleryUploadControls.style.display = this.isAuthenticated ? 'block' : 'none';
        }
        
        // Refresh gallery to show/hide delete buttons
        if (window.galleryManager) {
            galleryManager.renderGallery();
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
                window.musicWebsite.showNotification(`Welcome, ${this.currentUser}!`, 'success');
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

    showUserManagementModal() {
        const modal = document.getElementById('user-management-modal');
        if (modal) {
            modal.classList.add('active');
            this.refreshUserList();
        }
    }

    hideUserManagementModal() {
        const modal = document.getElementById('user-management-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    refreshUserList() {
        const users = this.getUsers();
        const userList = document.getElementById('user-list');
        
        if (!userList) return;
        
        userList.innerHTML = '';
        
        users.forEach(user => {
            const userItem = document.createElement('div');
            userItem.className = 'user-item';
            userItem.innerHTML = `
                <div class="user-info">
                    <span class="user-username">${user.username}</span>
                    <span class="user-date">Created: ${new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
                <button class="btn-delete-user" onclick="authManager.confirmDeleteUser('${user.username}')" 
                        ${user.username === 'admin' ? 'disabled title="Cannot delete default admin"' : ''}>
                    Delete
                </button>
            `;
            userList.appendChild(userItem);
        });
    }

    handleAddUserSubmit(event) {
        event.preventDefault();
        
        const username = document.getElementById('new-username').value.trim();
        const password = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const errorMsg = document.getElementById('add-user-error');
        const successMsg = document.getElementById('add-user-success');
        
        // Hide previous messages
        errorMsg.style.display = 'none';
        successMsg.style.display = 'none';
        
        // Validate
        if (password !== confirmPassword) {
            errorMsg.textContent = 'Passwords do not match';
            errorMsg.style.display = 'block';
            return;
        }
        
        if (password.length < 6) {
            errorMsg.textContent = 'Password must be at least 6 characters';
            errorMsg.style.display = 'block';
            return;
        }
        
        // Add user
        const result = this.addUser(username, password);
        
        if (result.success) {
            successMsg.textContent = result.message;
            successMsg.style.display = 'block';
            
            // Clear form
            document.getElementById('new-username').value = '';
            document.getElementById('new-password').value = '';
            document.getElementById('confirm-password').value = '';
            
            // Refresh user list
            this.refreshUserList();
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 3000);
        } else {
            errorMsg.textContent = result.message;
            errorMsg.style.display = 'block';
        }
    }

    confirmDeleteUser(username) {
        if (confirm(`Are you sure you want to delete user "${username}"?`)) {
            const result = this.deleteUser(username);
            
            if (result.success) {
                this.refreshUserList();
                if (typeof window.musicWebsite !== 'undefined') {
                    window.musicWebsite.showNotification(result.message, 'success');
                }
            } else {
                alert(result.message);
            }
        }
    }
}

// Create global auth instance
const authManager = new AuthManager();
