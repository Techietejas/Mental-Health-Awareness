// Resources management for psychoeducational content
class ResourcesManager {
    constructor() {
        this.resources = this.initializeResources();
        this.currentCategory = 'all';
        this.favorites = [];
    }

    init() {
        this.loadFavorites();
        this.setupEventListeners();
        this.renderResources();
        this.setupSearch();
    }

    initializeResources() {
        return [
            // Videos
            {
                id: 'video1',
                title: 'Understanding Anxiety: A Student\'s Guide',
                description: 'Learn about anxiety symptoms, causes, and effective coping strategies specifically for college students.',
                type: 'video',
                category: 'videos',
                duration: '12:30',
                language: 'English',
                thumbnail: 'fas fa-play-circle',
                url: '#',
                tags: ['anxiety', 'students', 'coping', 'mental-health'],
                difficulty: 'beginner',
                views: 1250,
                rating: 4.8
            },
            {
                id: 'video2',
                title: 'Mindfulness Meditation for Stress Relief',
                description: 'A guided meditation session to help reduce stress and improve focus during exam periods.',
                type: 'video',
                category: 'videos',
                duration: '15:45',
                language: 'English',
                thumbnail: 'fas fa-play-circle',
                url: '#',
                tags: ['meditation', 'stress', 'mindfulness', 'relaxation'],
                difficulty: 'beginner',
                views: 2100,
                rating: 4.9
            },
            {
                id: 'video3',
                title: 'Depression Awareness and Support',
                description: 'Understanding depression, recognizing symptoms, and knowing when to seek professional help.',
                type: 'video',
                category: 'videos',
                duration: '18:20',
                language: 'English',
                thumbnail: 'fas fa-play-circle',
                url: '#',
                tags: ['depression', 'awareness', 'support', 'symptoms'],
                difficulty: 'intermediate',
                views: 890,
                rating: 4.7
            },
            {
                id: 'video4',
                title: 'Academic Stress Management Techniques',
                description: 'Practical strategies for managing academic pressure and maintaining mental health while studying.',
                type: 'video',
                category: 'videos',
                duration: '14:15',
                language: 'English',
                thumbnail: 'fas fa-play-circle',
                url: '#',
                tags: ['academic', 'stress', 'study', 'time-management'],
                difficulty: 'beginner',
                views: 1750,
                rating: 4.6
            },

            // Audio/Relaxation
            {
                id: 'audio1',
                title: 'Deep Breathing Exercise',
                description: 'A 10-minute guided breathing exercise to help calm your mind and reduce anxiety.',
                type: 'audio',
                category: 'audio',
                duration: '10:00',
                language: 'English',
                thumbnail: 'fas fa-volume-up',
                url: '#',
                tags: ['breathing', 'relaxation', 'anxiety', 'calm'],
                difficulty: 'beginner',
                views: 3200,
                rating: 4.9
            },
            {
                id: 'audio2',
                title: 'Progressive Muscle Relaxation',
                description: 'Step-by-step muscle relaxation technique to release tension and promote better sleep.',
                type: 'audio',
                category: 'audio',
                duration: '20:00',
                language: 'English',
                thumbnail: 'fas fa-volume-up',
                url: '#',
                tags: ['relaxation', 'sleep', 'muscle-tension', 'stress'],
                difficulty: 'beginner',
                views: 1850,
                rating: 4.8
            },
            {
                id: 'audio3',
                title: 'Nature Sounds for Focus',
                description: 'Ambient nature sounds to help improve concentration and create a peaceful study environment.',
                type: 'audio',
                category: 'audio',
                duration: '60:00',
                language: 'English',
                thumbnail: 'fas fa-volume-up',
                url: '#',
                tags: ['nature', 'focus', 'study', 'ambient'],
                difficulty: 'beginner',
                views: 2800,
                rating: 4.7
            },
            {
                id: 'audio4',
                title: 'Sleep Stories for Insomnia',
                description: 'Calming bedtime stories designed to help you fall asleep faster and sleep more soundly.',
                type: 'audio',
                category: 'audio',
                duration: '30:00',
                language: 'English',
                thumbnail: 'fas fa-volume-up',
                url: '#',
                tags: ['sleep', 'insomnia', 'bedtime', 'stories'],
                difficulty: 'beginner',
                views: 2200,
                rating: 4.8
            },

            // Wellness Guides
            {
                id: 'guide1',
                title: 'Complete Guide to Student Mental Health',
                description: 'A comprehensive guide covering common mental health challenges faced by college students.',
                type: 'guide',
                category: 'guides',
                duration: '45 min read',
                language: 'English',
                thumbnail: 'fas fa-book',
                url: '#',
                tags: ['guide', 'mental-health', 'students', 'comprehensive'],
                difficulty: 'intermediate',
                views: 3100,
                rating: 4.9
            },
            {
                id: 'guide2',
                title: 'Building Healthy Study Habits',
                description: 'Evidence-based strategies for creating sustainable study routines that support mental wellness.',
                type: 'guide',
                category: 'guides',
                duration: '25 min read',
                language: 'English',
                thumbnail: 'fas fa-book',
                url: '#',
                tags: ['study', 'habits', 'productivity', 'wellness'],
                difficulty: 'beginner',
                views: 1950,
                rating: 4.7
            },
            {
                id: 'guide3',
                title: 'Social Skills for Introverts',
                description: 'Practical tips for building meaningful relationships and managing social anxiety in college.',
                type: 'guide',
                category: 'guides',
                duration: '30 min read',
                language: 'English',
                thumbnail: 'fas fa-book',
                url: '#',
                tags: ['social', 'introverts', 'anxiety', 'relationships'],
                difficulty: 'intermediate',
                views: 1650,
                rating: 4.6
            },
            {
                id: 'guide4',
                title: 'Crisis Management and Self-Care',
                description: 'Essential strategies for managing mental health crises and developing effective self-care routines.',
                type: 'guide',
                category: 'guides',
                duration: '35 min read',
                language: 'English',
                thumbnail: 'fas fa-book',
                url: '#',
                tags: ['crisis', 'self-care', 'emergency', 'coping'],
                difficulty: 'advanced',
                views: 1200,
                rating: 4.8
            },

            // Regional Content
            {
                id: 'regional1',
                title: 'Mental Health Awareness in Hindi',
                description: 'मानसिक स्वास्थ्य के बारे में जागरूकता और छात्रों के लिए सुझाव।',
                type: 'video',
                category: 'regional',
                duration: '16:30',
                language: 'Hindi',
                thumbnail: 'fas fa-play-circle',
                url: '#',
                tags: ['hindi', 'awareness', 'students', 'mental-health'],
                difficulty: 'beginner',
                views: 850,
                rating: 4.7
            },
            {
                id: 'regional2',
                title: 'Stress Management in Tamil',
                description: 'கல்லூரி மாணவர்களுக்கான மன அழுத்த மேலாண்மை நுட்பங்கள்।',
                type: 'audio',
                category: 'regional',
                duration: '12:00',
                language: 'Tamil',
                thumbnail: 'fas fa-volume-up',
                url: '#',
                tags: ['tamil', 'stress', 'management', 'students'],
                difficulty: 'beginner',
                views: 420,
                rating: 4.6
            },
            {
                id: 'regional3',
                title: 'Anxiety Coping in Bengali',
                description: 'উদ্বেগের সাথে মোকাবিলা করার কার্যকর কৌশল এবং শিথিলকরণের পদ্ধতি।',
                type: 'guide',
                category: 'regional',
                duration: '20 min read',
                language: 'Bengali',
                thumbnail: 'fas fa-book',
                url: '#',
                tags: ['bengali', 'anxiety', 'coping', 'relaxation'],
                difficulty: 'beginner',
                views: 380,
                rating: 4.5
            },
            {
                id: 'regional4',
                title: 'Depression Support in Telugu',
                description: 'విద్యార్థులకు డిప్రెషన్ గురించి అవగాహన మరియు మద్దతు వ్యవస్థలు।',
                type: 'video',
                category: 'regional',
                duration: '14:45',
                language: 'Telugu',
                thumbnail: 'fas fa-play-circle',
                url: '#',
                tags: ['telugu', 'depression', 'support', 'students'],
                difficulty: 'intermediate',
                views: 320,
                rating: 4.4
            },
            {
                id: 'regional5',
                title: 'Study Stress in Marathi',
                description: 'अभ्यासाच्या तणावाशी सामना करण्याच्या प्रभावी पद्धती आणि मानसिक आरोग्य टिप्स।',
                type: 'audio',
                category: 'regional',
                duration: '18:30',
                language: 'Marathi',
                thumbnail: 'fas fa-volume-up',
                url: '#',
                tags: ['marathi', 'study', 'stress', 'mental-health'],
                difficulty: 'beginner',
                views: 280,
                rating: 4.3
            }
        ];
    }

    setupEventListeners() {
        // Category filter buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.getAttribute('data-category');
                this.filterByCategory(category);
            });
        });

        // Search functionality
        const searchInput = document.getElementById('resourceSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
    }

    setupSearch() {
        // Add search input if it doesn't exist
        const resourceCategories = document.querySelector('.resource-categories');
        if (resourceCategories && !document.getElementById('resourceSearch')) {
            const searchContainer = document.createElement('div');
            searchContainer.className = 'resource-search';
            searchContainer.innerHTML = `
                <div class="search-input-container">
                    <input type="text" id="resourceSearch" placeholder="Search resources..." class="search-input">
                    <i class="fas fa-search search-icon"></i>
                </div>
            `;
            resourceCategories.appendChild(searchContainer);
        }
    }

    filterByCategory(category) {
        this.currentCategory = category;
        
        // Update active button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        // Filter and render resources
        this.renderResources();
    }

    handleSearch(query) {
        this.searchQuery = query.toLowerCase();
        this.renderResources();
    }

    renderResources() {
        const resourcesGrid = document.getElementById('resourcesGrid');
        if (!resourcesGrid) return;

        let filteredResources = this.resources;

        // Filter by category
        if (this.currentCategory !== 'all') {
            filteredResources = filteredResources.filter(resource => 
                resource.category === this.currentCategory
            );
        }

        // Filter by search query
        if (this.searchQuery) {
            filteredResources = filteredResources.filter(resource =>
                resource.title.toLowerCase().includes(this.searchQuery) ||
                resource.description.toLowerCase().includes(this.searchQuery) ||
                resource.tags.some(tag => tag.toLowerCase().includes(this.searchQuery))
            );
        }

        // Sort by popularity (views * rating)
        filteredResources.sort((a, b) => (b.views * b.rating) - (a.views * a.rating));

        if (filteredResources.length === 0) {
            resourcesGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3>No resources found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            `;
            return;
        }

        resourcesGrid.innerHTML = filteredResources.map(resource => this.createResourceCard(resource)).join('');
    }

    createResourceCard(resource) {
        const isFavorite = this.favorites.includes(resource.id);
        const difficultyColors = {
            beginner: '#10b981',
            intermediate: '#f59e0b',
            advanced: '#ef4444'
        };

        return `
            <div class="resource-card" data-resource-id="${resource.id}">
                <div class="resource-thumbnail">
                    <i class="${resource.thumbnail}"></i>
                    <div class="resource-overlay">
                        <button class="play-btn" onclick="ResourcesManager.playResource('${resource.id}')">
                            <i class="fas fa-${resource.type === 'video' ? 'play' : 'play'}-circle"></i>
                        </button>
                    </div>
                </div>
                <div class="resource-content">
                    <div class="resource-header">
                        <h3>${resource.title}</h3>
                        <button class="favorite-btn ${isFavorite ? 'active' : ''}" 
                                onclick="ResourcesManager.toggleFavorite('${resource.id}')">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                    <p>${resource.description}</p>
                    <div class="resource-meta">
                        <span class="resource-duration">
                            <i class="fas fa-clock"></i> ${resource.duration}
                        </span>
                        <span class="resource-language">
                            <i class="fas fa-globe"></i> ${resource.language}
                        </span>
                        <span class="resource-difficulty" style="color: ${difficultyColors[resource.difficulty]}">
                            <i class="fas fa-signal"></i> ${resource.difficulty}
                        </span>
                    </div>
                    <div class="resource-stats">
                        <span class="views">
                            <i class="fas fa-eye"></i> ${this.formatNumber(resource.views)} views
                        </span>
                        <span class="rating">
                            <i class="fas fa-star"></i> ${resource.rating}
                        </span>
                    </div>
                    <div class="resource-tags">
                        ${resource.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="resource-actions">
                        <button class="btn btn-primary btn-sm" onclick="ResourcesManager.playResource('${resource.id}')">
                            <i class="fas fa-${resource.type === 'video' ? 'play' : 'play'}-circle"></i>
                            ${resource.type === 'video' ? 'Watch' : 'Listen'}
                        </button>
                        <button class="btn btn-secondary btn-sm" onclick="ResourcesManager.downloadResource('${resource.id}')">
                            <i class="fas fa-download"></i>
                            Download
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    playResource(resourceId) {
        const resource = this.resources.find(r => r.id === resourceId);
        if (!resource) return;

        // Track resource access
        if (window.app) {
            window.app.trackEvent('resource_accessed', {
                resourceId: resourceId,
                resourceType: resource.type,
                resourceCategory: resource.category
            });
        }

        // Simulate resource playback
        this.showResourceModal(resource);
    }

    showResourceModal(resource) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content resource-modal">
                <div class="modal-header">
                    <h3>${resource.title}</h3>
                    <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="resource-player">
                        <div class="player-placeholder">
                            <i class="${resource.thumbnail}"></i>
                            <p>${resource.type === 'video' ? 'Video Player' : 'Audio Player'}</p>
                            <p>Duration: ${resource.duration}</p>
                        </div>
                    </div>
                    <div class="resource-details">
                        <p><strong>Description:</strong> ${resource.description}</p>
                        <p><strong>Language:</strong> ${resource.language}</p>
                        <p><strong>Difficulty:</strong> ${resource.difficulty}</p>
                        <div class="resource-tags">
                            ${resource.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Auto-remove after 5 seconds for demo
        setTimeout(() => {
            if (modal.parentElement) {
                modal.remove();
                document.body.style.overflow = 'auto';
            }
        }, 5000);
    }

    downloadResource(resourceId) {
        const resource = this.resources.find(r => r.id === resourceId);
        if (!resource) return;

        // Track download
        if (window.app) {
            window.app.trackEvent('resource_downloaded', {
                resourceId: resourceId,
                resourceType: resource.type
            });
        }

        // Simulate download
        if (window.app) {
            window.app.showNotification(`Downloading ${resource.title}...`, 'info');
        }

        // In a real app, this would trigger an actual download
        setTimeout(() => {
            if (window.app) {
                window.app.showNotification(`${resource.title} downloaded successfully!`, 'success');
            }
        }, 2000);
    }

    toggleFavorite(resourceId) {
        const index = this.favorites.indexOf(resourceId);
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(resourceId);
        }

        this.saveFavorites();
        this.renderResources();

        // Track favorite action
        if (window.app) {
            window.app.trackEvent('resource_favorited', {
                resourceId: resourceId,
                action: this.favorites.includes(resourceId) ? 'added' : 'removed'
            });
        }
    }

    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }

    saveFavorites() {
        if (window.app) {
            window.app.saveData('resourceFavorites', this.favorites);
        }
    }

    loadFavorites() {
        if (window.app) {
            this.favorites = window.app.loadData('resourceFavorites', []);
        }
    }

    // Admin functions
    getResourceStats() {
        const totalResources = this.resources.length;
        const categoryStats = {};
        const languageStats = {};

        this.resources.forEach(resource => {
            // Category stats
            categoryStats[resource.category] = (categoryStats[resource.category] || 0) + 1;
            
            // Language stats
            languageStats[resource.language] = (languageStats[resource.language] || 0) + 1;
        });

        const totalViews = this.resources.reduce((sum, resource) => sum + resource.views, 0);
        const averageRating = this.resources.reduce((sum, resource) => sum + resource.rating, 0) / totalResources;

        return {
            totalResources,
            totalViews,
            averageRating: averageRating.toFixed(1),
            categoryStats,
            languageStats,
            favorites: this.favorites.length
        };
    }

    addResource(resource) {
        resource.id = 'resource' + Date.now();
        resource.views = 0;
        resource.rating = 5.0;
        this.resources.push(resource);
        this.renderResources();
    }

    updateResource(resourceId, updates) {
        const index = this.resources.findIndex(r => r.id === resourceId);
        if (index > -1) {
            this.resources[index] = { ...this.resources[index], ...updates };
            this.renderResources();
            return true;
        }
        return false;
    }

    deleteResource(resourceId) {
        const index = this.resources.findIndex(r => r.id === resourceId);
        if (index > -1) {
            this.resources.splice(index, 1);
            this.renderResources();
            return true;
        }
        return false;
    }
}

// Initialize ResourcesManager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.ResourcesManager = new ResourcesManager();
});

// Add resource modal styles
const resourceModalStyle = document.createElement('style');
resourceModalStyle.textContent = `
    .resource-modal {
        max-width: 800px;
        width: 95%;
    }
    
    .resource-player {
        background: var(--bg-secondary);
        border-radius: var(--radius-md);
        padding: 2rem;
        text-align: center;
        margin-bottom: 1rem;
    }
    
    .player-placeholder {
        color: var(--text-muted);
    }
    
    .player-placeholder i {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: var(--primary-color);
    }
    
    .resource-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
    }
    
    .favorite-btn {
        background: none;
        border: none;
        color: var(--text-muted);
        cursor: pointer;
        font-size: 1.2rem;
        transition: color 0.3s ease;
    }
    
    .favorite-btn:hover,
    .favorite-btn.active {
        color: var(--danger-color);
    }
    
    .resource-stats {
        display: flex;
        gap: 1rem;
        margin: 1rem 0;
        font-size: 0.9rem;
        color: var(--text-muted);
    }
    
    .resource-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin: 1rem 0;
    }
    
    .tag {
        background: var(--bg-secondary);
        color: var(--text-secondary);
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.8rem;
    }
    
    .resource-actions {
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;
    }
    
    .resource-search {
        margin-bottom: 1rem;
    }
    
    .search-input-container {
        position: relative;
        max-width: 400px;
        margin: 0 auto;
    }
    
    .search-input {
        width: 100%;
        padding: 0.75rem 1rem 0.75rem 2.5rem;
        border: 2px solid var(--border-color);
        border-radius: var(--radius-md);
        font-size: 1rem;
    }
    
    .search-icon {
        position: absolute;
        left: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-muted);
    }
    
    .resource-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .resource-card:hover .resource-overlay {
        opacity: 1;
    }
    
    .play-btn {
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        font-size: 1.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .play-btn:hover {
        background: var(--primary-dark);
        transform: scale(1.1);
    }
`;
document.head.appendChild(resourceModalStyle);
