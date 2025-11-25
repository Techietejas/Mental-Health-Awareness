// Community and peer support platform
class CommunityManager {
    constructor() {
        this.posts = this.initializePosts();
        this.categories = this.initializeCategories();
        this.currentFilter = 'all';
        this.currentPost = null;
    }

    init() {
        this.loadPosts();
        this.setupEventListeners();
        this.renderCategories();
        this.setupNewPostForm();
    }

    initializeCategories() {
        return [
            {
                id: 'general',
                name: 'General Support',
                description: 'Share general experiences and get support',
                icon: 'fas fa-comments',
                color: '#6366f1',
                postCount: 24
            },
            {
                id: 'academic',
                name: 'Academic Stress',
                description: 'Discuss academic pressures and coping strategies',
                icon: 'fas fa-graduation-cap',
                color: '#10b981',
                postCount: 18
            },
            {
                id: 'social',
                name: 'Social Anxiety',
                description: 'Support for social anxiety and isolation',
                icon: 'fas fa-users',
                color: '#f59e0b',
                postCount: 12
            },
            {
                id: 'success',
                name: 'Success Stories',
                description: 'Share your journey and inspire others',
                icon: 'fas fa-trophy',
                color: '#ef4444',
                postCount: 8
            }
        ];
    }

    initializePosts() {
        return [
            {
                id: 'post1',
                title: 'Feeling overwhelmed with final exams',
                content: 'I have 4 exams next week and I\'m feeling really overwhelmed. I can\'t seem to focus and I\'m having trouble sleeping. Any advice on how to manage exam stress?',
                category: 'academic',
                author: 'Anonymous Student',
                authorId: 'user1',
                isAnonymous: true,
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                likes: 12,
                replies: 8,
                isLiked: false,
                tags: ['exams', 'stress', 'study']
            },
            {
                id: 'post2',
                title: 'My journey with anxiety - 6 months update',
                content: 'I wanted to share my progress with managing anxiety. It\'s been 6 months since I started therapy and I\'ve learned so much about myself. The key was finding the right coping strategies that work for me.',
                category: 'success',
                author: 'Sarah M.',
                authorId: 'user2',
                isAnonymous: false,
                createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                likes: 25,
                replies: 15,
                isLiked: true,
                tags: ['anxiety', 'therapy', 'progress', 'coping']
            },
            {
                id: 'post3',
                title: 'Social anxiety in group projects',
                content: 'I really struggle with group projects because of my social anxiety. I feel like I can\'t contribute properly and I\'m always worried about what others think. Has anyone else dealt with this?',
                category: 'social',
                author: 'Anonymous Student',
                authorId: 'user3',
                isAnonymous: true,
                createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                likes: 18,
                replies: 12,
                isLiked: false,
                tags: ['social-anxiety', 'group-work', 'college']
            },
            {
                id: 'post4',
                title: 'Tips for better sleep during stressful periods',
                content: 'I\'ve been struggling with sleep during exam season, so I researched some techniques. Here are the ones that actually worked for me: 1) No screens 1 hour before bed, 2) Consistent sleep schedule, 3) Relaxation exercises.',
                category: 'general',
                author: 'Alex K.',
                authorId: 'user4',
                isAnonymous: false,
                createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                likes: 22,
                replies: 9,
                isLiked: true,
                tags: ['sleep', 'stress', 'tips', 'wellness']
            },
            {
                id: 'post5',
                title: 'Feeling isolated in my dorm',
                content: 'I\'m a freshman and I\'m having trouble making friends. Everyone seems to have their groups already and I feel really lonely. I don\'t know how to approach people or start conversations.',
                category: 'social',
                author: 'Anonymous Student',
                authorId: 'user5',
                isAnonymous: true,
                createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
                likes: 16,
                replies: 11,
                isLiked: false,
                tags: ['loneliness', 'friendship', 'freshman', 'social']
            },
            {
                id: 'post6',
                title: 'Recovering from burnout - what I learned',
                content: 'I experienced severe burnout last semester and had to take a break. It was scary but necessary. I learned to set boundaries, prioritize self-care, and ask for help when needed. Recovery is possible!',
                category: 'success',
                author: 'Maya R.',
                authorId: 'user6',
                isAnonymous: false,
                createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                likes: 31,
                replies: 18,
                isLiked: true,
                tags: ['burnout', 'recovery', 'self-care', 'boundaries']
            }
        ];
    }

    setupEventListeners() {
        // Category filter buttons
        document.querySelectorAll('.forum-category').forEach(category => {
            category.addEventListener('click', (e) => {
                const categoryId = e.currentTarget.getAttribute('data-category');
                this.filterByCategory(categoryId);
            });
        });

        // New post form
        const newPostForm = document.getElementById('newPostForm');
        if (newPostForm) {
            newPostForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewPost();
            });
        }
    }

    setupNewPostForm() {
        // This is handled in the HTML modal, but we can add any additional setup here
    }

    renderCategories() {
        const categoriesContainer = document.querySelector('.forum-categories');
        if (!categoriesContainer) return;

        categoriesContainer.innerHTML = this.categories.map(category => `
            <div class="forum-category" data-category="${category.id}">
                <div class="category-icon" style="color: ${category.color}">
                    <i class="${category.icon}"></i>
                </div>
                <h4>${category.name}</h4>
                <p>${category.description}</p>
                <span class="post-count">${category.postCount} posts</span>
            </div>
        `).join('');
    }

    filterByCategory(categoryId) {
        this.currentFilter = categoryId;
        this.renderPosts();
    }

    renderPosts() {
        // This would typically render posts in a dedicated posts section
        // For now, we'll update the category counts and handle filtering
        this.updateCategoryCounts();
    }

    updateCategoryCounts() {
        this.categories.forEach(category => {
            const count = this.posts.filter(post => 
                this.currentFilter === 'all' || post.category === this.currentFilter
            ).length;
            
            const categoryElement = document.querySelector(`[data-category="${category.id}"] .post-count`);
            if (categoryElement) {
                categoryElement.textContent = `${count} posts`;
            }
        });
    }

    handleNewPost() {
        const formData = this.collectNewPostData();
        
        if (!this.validateNewPost(formData)) {
            return;
        }

        const newPost = this.createNewPost(formData);
        this.posts.unshift(newPost); // Add to beginning
        this.savePosts();
        this.updateCategoryCounts();
        this.closeModal('newPostModal');

        // Show success message
        if (window.app) {
            window.app.showNotification('Post created successfully!', 'success');
        }

        // Track post creation
        if (window.app) {
            window.app.trackEvent('post_created', {
                category: formData.category,
                isAnonymous: formData.isAnonymous,
                contentLength: formData.content.length
            });
        }
    }

    collectNewPostData() {
        return {
            title: document.getElementById('postTitle').value,
            category: document.getElementById('postCategory').value,
            content: document.getElementById('postContent').value,
            isAnonymous: document.getElementById('anonymousPost').checked
        };
    }

    validateNewPost(data) {
        const errors = [];

        if (!data.title.trim()) {
            errors.push('Please enter a post title');
        }

        if (!data.category) {
            errors.push('Please select a category');
        }

        if (!data.content.trim()) {
            errors.push('Please enter post content');
        }

        if (data.title.length > 100) {
            errors.push('Title must be less than 100 characters');
        }

        if (data.content.length > 2000) {
            errors.push('Content must be less than 2000 characters');
        }

        if (errors.length > 0) {
            if (window.app) {
                window.app.showNotification(errors.join('<br>'), 'error', 8000);
            }
            return false;
        }

        return true;
    }

    createNewPost(data) {
        return {
            id: 'post' + Date.now(),
            title: data.title.trim(),
            content: data.content.trim(),
            category: data.category,
            author: data.isAnonymous ? 'Anonymous Student' : 'You',
            authorId: 'current_user',
            isAnonymous: data.isAnonymous,
            createdAt: new Date().toISOString(),
            likes: 0,
            replies: 0,
            isLiked: false,
            tags: this.extractTags(data.content)
        };
    }

    extractTags(content) {
        // Simple tag extraction based on common mental health keywords
        const keywords = [
            'anxiety', 'depression', 'stress', 'sleep', 'study', 'exam', 'social',
            'lonely', 'overwhelmed', 'burnout', 'therapy', 'counseling', 'meditation',
            'mindfulness', 'self-care', 'friendship', 'relationships', 'academic',
            'college', 'university', 'coping', 'recovery', 'progress', 'tips'
        ];

        const contentLower = content.toLowerCase();
        return keywords.filter(keyword => contentLower.includes(keyword));
    }

    likePost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        if (post.isLiked) {
            post.likes--;
            post.isLiked = false;
        } else {
            post.likes++;
            post.isLiked = true;
        }

        this.savePosts();
        this.renderPosts();

        // Track like action
        if (window.app) {
            window.app.trackEvent('post_liked', {
                postId: postId,
                action: post.isLiked ? 'liked' : 'unliked'
            });
        }
    }

    replyToPost(postId, replyContent) {
        // In a full implementation, this would add a reply to the post
        // For now, we'll just increment the reply count
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            post.replies++;
            this.savePosts();
            this.renderPosts();

            // Track reply
            if (window.app) {
                window.app.trackEvent('post_replied', {
                    postId: postId,
                    replyLength: replyContent.length
                });
            }
        }
    }

    reportPost(postId, reason) {
        // In a real app, this would send a report to moderators
        if (window.app) {
            window.app.showNotification('Post reported. Thank you for helping keep our community safe.', 'info');
        }

        // Track report
        if (window.app) {
            window.app.trackEvent('post_reported', {
                postId: postId,
                reason: reason
            });
        }
    }

    savePosts() {
        if (window.app) {
            window.app.saveData('communityPosts', this.posts);
        }
    }

    loadPosts() {
        if (window.app) {
            this.posts = window.app.loadData('communityPosts', this.posts);
        }
    }

    // Admin functions
    getCommunityStats() {
        const totalPosts = this.posts.length;
        const totalLikes = this.posts.reduce((sum, post) => sum + post.likes, 0);
        const totalReplies = this.posts.reduce((sum, post) => sum + post.replies, 0);
        const anonymousPosts = this.posts.filter(post => post.isAnonymous).length;

        const categoryStats = {};
        this.posts.forEach(post => {
            categoryStats[post.category] = (categoryStats[post.category] || 0) + 1;
        });

        const recentPosts = this.posts
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);

        return {
            totalPosts,
            totalLikes,
            totalReplies,
            anonymousPosts,
            categoryStats,
            recentPosts
        };
    }

    moderatePost(postId, action) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return false;

        switch (action) {
            case 'approve':
                post.status = 'approved';
                break;
            case 'reject':
                post.status = 'rejected';
                break;
            case 'delete':
                const index = this.posts.findIndex(p => p.id === postId);
                this.posts.splice(index, 1);
                break;
        }

        this.savePosts();
        return true;
    }

    getPopularTags() {
        const tagCounts = {};
        this.posts.forEach(post => {
            post.tags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });

        return Object.entries(tagCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .map(([tag, count]) => ({ tag, count }));
    }
}

// Initialize CommunityManager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.CommunityManager = new CommunityManager();
});

// Add community-specific styles
const communityStyle = document.createElement('style');
communityStyle.textContent = `
    .forum-category {
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }
    
    .forum-category::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
    }
    
    .forum-category:hover::before {
        left: 100%;
    }
    
    .category-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    
    .post-card {
        background: var(--bg-primary);
        border-radius: var(--radius-lg);
        padding: 1.5rem;
        margin-bottom: 1rem;
        box-shadow: var(--shadow-md);
        transition: all 0.3s ease;
    }
    
    .post-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
    }
    
    .post-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
    }
    
    .post-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0;
    }
    
    .post-meta {
        display: flex;
        gap: 1rem;
        font-size: 0.9rem;
        color: var(--text-muted);
        margin-bottom: 1rem;
    }
    
    .post-content {
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 1rem;
    }
    
    .post-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .post-tag {
        background: var(--bg-secondary);
        color: var(--text-secondary);
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.8rem;
    }
    
    .post-actions {
        display: flex;
        gap: 1rem;
        align-items: center;
    }
    
    .action-btn {
        background: none;
        border: none;
        color: var(--text-muted);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.5rem;
        border-radius: var(--radius-sm);
        transition: all 0.3s ease;
    }
    
    .action-btn:hover {
        background: var(--bg-secondary);
        color: var(--text-primary);
    }
    
    .action-btn.liked {
        color: var(--danger-color);
    }
    
    .post-stats {
        display: flex;
        gap: 1rem;
        font-size: 0.9rem;
        color: var(--text-muted);
    }
    
    .anonymous-badge {
        background: var(--info-color);
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.8rem;
        font-weight: 500;
    }
`;
document.head.appendChild(communityStyle);
