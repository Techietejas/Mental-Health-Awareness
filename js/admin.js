// Admin dashboard for analytics and system management
class AdminManager {
    constructor() {
        this.charts = {};
        this.stats = {};
        this.isInitialized = false;
    }

    init() {
        if (!this.checkAdminAccess()) {
            this.showAccessDenied();
            return;
        }

        this.setupEventListeners();
        this.loadAnalytics();
        this.initializeCharts();
        this.updateDashboard();
        this.isInitialized = true;
    }

    checkAdminAccess() {
        // In a real app, this would check server-side authentication
        const adminKey = localStorage.getItem('adminKey');
        return adminKey === 'admin123'; // Demo key
    }

    showAccessDenied() {
        const adminSection = document.getElementById('admin');
        if (adminSection) {
            adminSection.innerHTML = `
                <div class="container">
                    <div class="access-denied">
                        <i class="fas fa-lock"></i>
                        <h2>Access Denied</h2>
                        <p>You need admin privileges to access this dashboard.</p>
                        <button class="btn btn-primary" onclick="AdminManager.requestAccess()">
                            Request Access
                        </button>
                    </div>
                </div>
            `;
        }
    }

    requestAccess() {
        const key = prompt('Enter admin key:');
        if (key === 'admin123') {
            localStorage.setItem('adminKey', key);
            location.reload();
        } else {
            if (window.app) {
                window.app.showNotification('Invalid admin key', 'error');
            }
        }
    }

    setupEventListeners() {
        // Export data button
        const exportBtn = document.getElementById('exportDataBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportData();
            });
        }

        // Refresh data button
        const refreshBtn = document.getElementById('refreshDataBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.refreshData();
            });
        }

        // Date range filter
        const dateRange = document.getElementById('dateRange');
        if (dateRange) {
            dateRange.addEventListener('change', () => {
                this.updateDashboard();
            });
        }
    }

    loadAnalytics() {
        // Load data from all managers
        this.stats = {
            users: this.getUserStats(),
            bookings: this.getBookingStats(),
            resources: this.getResourceStats(),
            community: this.getCommunityStats(),
            screening: this.getScreeningStats(),
            system: this.getSystemStats()
        };
    }

    getUserStats() {
        // Simulate user data
        return {
            totalUsers: 1247,
            activeToday: 23,
            newThisWeek: 45,
            retentionRate: 78.5
        };
    }

    getBookingStats() {
        if (window.BookingManager) {
            return window.BookingManager.getBookingStats();
        }
        return {
            totalBookings: 0,
            todayBookings: 0,
            thisWeekBookings: 0,
            counsellorStats: []
        };
    }

    getResourceStats() {
        if (window.ResourcesManager) {
            return window.ResourcesManager.getResourceStats();
        }
        return {
            totalResources: 0,
            totalViews: 0,
            averageRating: 0,
            categoryStats: {},
            languageStats: {},
            favorites: 0
        };
    }

    getCommunityStats() {
        if (window.CommunityManager) {
            return window.CommunityManager.getCommunityStats();
        }
        return {
            totalPosts: 0,
            totalLikes: 0,
            totalReplies: 0,
            anonymousPosts: 0,
            categoryStats: {},
            recentPosts: []
        };
    }

    getScreeningStats() {
        if (window.ScreeningManager) {
            return window.ScreeningManager.getScreeningStats();
        }
        return {
            totalCompletions: 0,
            testTypeStats: {},
            severityStats: {},
            averageScores: {},
            recentResults: []
        };
    }

    getSystemStats() {
        return {
            uptime: '99.9%',
            responseTime: '120ms',
            errorRate: '0.1%',
            lastBackup: new Date().toISOString()
        };
    }

    initializeCharts() {
        this.initializeTrendsChart();
        this.initializeUsageChart();
        this.initializeSeverityChart();
        this.initializeCategoryChart();
    }

    initializeTrendsChart() {
        const ctx = document.getElementById('trendsChart');
        if (!ctx) return;

        const data = this.generateTrendsData();
        
        this.charts.trends = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Depression (PHQ-9)',
                        data: data.depression,
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Anxiety (GAD-7)',
                        data: data.anxiety,
                        borderColor: '#f59e0b',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'General Health (GHQ)',
                        data: data.general,
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Mental Health Assessment Trends'
                    },
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Average Score'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Month'
                        }
                    }
                }
            }
        });
    }

    initializeUsageChart() {
        const ctx = document.getElementById('usageChart');
        if (!ctx) return;

        const data = this.generateUsageData();
        
        this.charts.usage = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.values,
                    backgroundColor: [
                        '#6366f1',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444',
                        '#8b5cf6'
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Resource Usage by Category'
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    initializeSeverityChart() {
        // Create severity chart if container exists
        const container = document.getElementById('severityChart');
        if (!container) return;

        const ctx = document.createElement('canvas');
        container.appendChild(ctx);

        const data = this.generateSeverityData();
        
        this.charts.severity = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Number of Assessments',
                    data: data.values,
                    backgroundColor: [
                        '#10b981',
                        '#f59e0b',
                        '#f59e0b',
                        '#ef4444',
                        '#ef4444'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Assessment Severity Distribution'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    initializeCategoryChart() {
        // Create category chart if container exists
        const container = document.getElementById('categoryChart');
        if (!container) return;

        const ctx = document.createElement('canvas');
        container.appendChild(ctx);

        const data = this.generateCategoryData();
        
        this.charts.category = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.values,
                    backgroundColor: [
                        '#6366f1',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Community Posts by Category'
                    }
                }
            }
        });
    }

    generateTrendsData() {
        // Generate sample trends data
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        return {
            labels: months,
            depression: [8.2, 7.8, 8.5, 7.9, 8.1, 7.6],
            anxiety: [6.8, 6.5, 7.2, 6.9, 7.1, 6.4],
            general: [5.2, 4.8, 5.5, 5.1, 5.3, 4.9]
        };
    }

    generateUsageData() {
        return {
            labels: ['Videos', 'Audio', 'Guides', 'Regional', 'Other'],
            values: [35, 25, 20, 15, 5]
        };
    }

    generateSeverityData() {
        return {
            labels: ['Minimal', 'Mild', 'Moderate', 'Moderately Severe', 'Severe'],
            values: [45, 32, 18, 8, 3]
        };
    }

    generateCategoryData() {
        return {
            labels: ['General Support', 'Academic Stress', 'Social Anxiety', 'Success Stories'],
            values: [24, 18, 12, 8]
        };
    }

    updateDashboard() {
        if (!this.isInitialized) return;

        this.loadAnalytics();
        this.updateStatsCards();
        this.updateCharts();
        this.updateRecentActivity();
    }

    updateStatsCards() {
        // Update stat cards with current data
        const stats = this.stats;
        
        // Update user stats
        this.updateStatCard('totalUsers', stats.users.totalUsers);
        this.updateStatCard('activeSessions', stats.users.activeToday);
        this.updateStatCard('bookingsThisWeek', stats.bookings.thisWeekBookings);
        this.updateStatCard('communityPosts', stats.community.totalPosts);
    }

    updateStatCard(statId, value) {
        const element = document.querySelector(`[data-stat="${statId}"] .stat-number`);
        if (element) {
            element.textContent = value;
        }
    }

    updateCharts() {
        // Update charts with new data
        Object.values(this.charts).forEach(chart => {
            if (chart && chart.update) {
                chart.update();
            }
        });
    }

    updateRecentActivity() {
        const container = document.getElementById('recentActivity');
        if (!container) return;

        const activities = this.getRecentActivity();
        container.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <p>${activity.description}</p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `).join('');
    }

    getRecentActivity() {
        return [
            {
                icon: 'fas fa-user-plus',
                description: 'New user registered',
                time: '2 minutes ago'
            },
            {
                icon: 'fas fa-calendar-check',
                description: 'Counselling session booked',
                time: '5 minutes ago'
            },
            {
                icon: 'fas fa-clipboard-check',
                description: 'PHQ-9 assessment completed',
                time: '8 minutes ago'
            },
            {
                icon: 'fas fa-comment',
                description: 'New community post',
                time: '12 minutes ago'
            },
            {
                icon: 'fas fa-play',
                description: 'Resource accessed',
                time: '15 minutes ago'
            }
        ];
    }

    refreshData() {
        this.loadAnalytics();
        this.updateDashboard();
        
        if (window.app) {
            window.app.showNotification('Dashboard data refreshed', 'success');
        }
    }

    exportData() {
        if (window.app) {
            window.app.exportData();
        }
    }

    // Admin management functions
    manageUsers() {
        this.showUserManagement();
    }

    manageResources() {
        this.showResourceManagement();
    }

    manageCommunity() {
        this.showCommunityManagement();
    }

    showUserManagement() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>User Management</h3>
                    <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="user-list">
                        <div class="user-item">
                            <div class="user-info">
                                <strong>Student 1</strong>
                                <span>Last active: 2 hours ago</span>
                            </div>
                            <div class="user-actions">
                                <button class="btn btn-sm btn-secondary">View Profile</button>
                                <button class="btn btn-sm btn-danger">Suspend</button>
                            </div>
                        </div>
                        <!-- More users would be listed here -->
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    showResourceManagement() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Resource Management</h3>
                    <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="resource-actions">
                        <button class="btn btn-primary" onclick="AdminManager.addResource()">
                            <i class="fas fa-plus"></i> Add Resource
                        </button>
                        <button class="btn btn-secondary" onclick="AdminManager.editResources()">
                            <i class="fas fa-edit"></i> Edit Resources
                        </button>
                    </div>
                    <div class="resource-stats">
                        <p>Total Resources: ${this.stats.resources.totalResources}</p>
                        <p>Total Views: ${this.stats.resources.totalViews}</p>
                        <p>Average Rating: ${this.stats.resources.averageRating}</p>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    showCommunityManagement() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Community Management</h3>
                    <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="community-stats">
                        <p>Total Posts: ${this.stats.community.totalPosts}</p>
                        <p>Total Likes: ${this.stats.community.totalLikes}</p>
                        <p>Anonymous Posts: ${this.stats.community.anonymousPosts}</p>
                    </div>
                    <div class="recent-posts">
                        <h4>Recent Posts</h4>
                        ${this.stats.community.recentPosts.map(post => `
                            <div class="post-item">
                                <strong>${post.title}</strong>
                                <span>${post.author}</span>
                                <button class="btn btn-sm btn-danger">Moderate</button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    addResource() {
        // Implementation for adding new resources
        if (window.app) {
            window.app.showNotification('Resource management feature coming soon', 'info');
        }
    }

    editResources() {
        // Implementation for editing resources
        if (window.app) {
            window.app.showNotification('Resource editing feature coming soon', 'info');
        }
    }
}

// Initialize AdminManager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.AdminManager = new AdminManager();
});

// Add admin-specific styles
const adminStyle = document.createElement('style');
adminStyle.textContent = `
    .access-denied {
        text-align: center;
        padding: 4rem 2rem;
        color: var(--text-muted);
    }
    
    .access-denied i {
        font-size: 4rem;
        margin-bottom: 2rem;
        color: var(--text-muted);
    }
    
    .admin-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-bottom: 3rem;
    }
    
    .admin-stats .stat-card {
        text-align: center;
        padding: 2rem;
        background: var(--bg-primary);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-md);
        transition: transform 0.3s ease;
    }
    
    .admin-stats .stat-card:hover {
        transform: translateY(-2px);
    }
    
    .admin-stats .stat-card h3 {
        margin: 0 0 1rem 0;
        color: var(--text-secondary);
        font-size: 1rem;
        font-weight: 500;
    }
    
    .stat-number {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--primary-color);
        display: block;
    }
    
    .admin-charts {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }
    
    .chart-container {
        background: var(--bg-primary);
        padding: 2rem;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-md);
    }
    
    .chart-container h3 {
        margin: 0 0 1.5rem 0;
        color: var(--text-primary);
        text-align: center;
    }
    
    .chart-container canvas {
        max-height: 300px;
    }
    
    .recent-activity {
        background: var(--bg-primary);
        padding: 2rem;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-md);
    }
    
    .recent-activity h3 {
        margin: 0 0 1.5rem 0;
        color: var(--text-primary);
    }
    
    .activity-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 0;
        border-bottom: 1px solid var(--border-color);
    }
    
    .activity-item:last-child {
        border-bottom: none;
    }
    
    .activity-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    
    .activity-content {
        flex: 1;
    }
    
    .activity-content p {
        margin: 0 0 0.25rem 0;
        color: var(--text-primary);
    }
    
    .activity-time {
        font-size: 0.9rem;
        color: var(--text-muted);
    }
    
    .user-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid var(--border-color);
    }
    
    .user-info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .user-info strong {
        color: var(--text-primary);
    }
    
    .user-info span {
        color: var(--text-muted);
        font-size: 0.9rem;
    }
    
    .user-actions {
        display: flex;
        gap: 0.5rem;
    }
    
    .resource-actions {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
    }
    
    .resource-stats {
        background: var(--bg-secondary);
        padding: 1rem;
        border-radius: var(--radius-md);
        margin-bottom: 2rem;
    }
    
    .resource-stats p {
        margin: 0.5rem 0;
        color: var(--text-secondary);
    }
    
    .recent-posts h4 {
        margin: 0 0 1rem 0;
        color: var(--text-primary);
    }
    
    .post-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        background: var(--bg-secondary);
        border-radius: var(--radius-sm);
        margin-bottom: 0.5rem;
    }
    
    .post-item strong {
        color: var(--text-primary);
    }
    
    .post-item span {
        color: var(--text-muted);
        font-size: 0.9rem;
    }
`;
document.head.appendChild(adminStyle);
