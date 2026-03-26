// ===== DOM Elements =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.getElementById('sidebar');
const navItems = document.querySelectorAll('.nav-item-custom');
const pageTitle = document.querySelector('.topbar h1');
const askAiBtn = document.querySelector('.ask-ai-btn');
const langSelect = document.querySelector('.lang-select');
const userPill = document.querySelector('.user-pill');
const topbarIcons = document.querySelectorAll('.topbar-icon');
const courseCards = document.querySelectorAll('.course-card');
const statCards = document.querySelectorAll('.stat-card');
const filterTabs = document.querySelectorAll('.filter-tab');
const courseActionBtns = document.querySelectorAll('.course-action-btn');
const resumeBtn = document.querySelector('.resume-btn');

// ===== Chart Instances =====
let donutChart = null;
let activityChart = null;

// ===== Initialize Charts =====
function initCharts() {
    // Donut Chart
    const donutCtx = document.getElementById('donutChart')?.getContext('2d');
    if (donutCtx) {
        donutChart = new Chart(donutCtx, {
            type: 'doughnut',
            data: {
                labels: ['Not Started', 'Completed', 'In Progress'],
                datasets: [{
                    data: [30, 45, 25],
                    backgroundColor: ['#2D9CDB', '#F2994A', '#bdbdbd'],
                    borderWidth: 0,
                    cutout: '70%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Activity Chart (Bar Chart)
    const activityCtx = document.getElementById('activityChart')?.getContext('2d');
    if (activityCtx) {
        activityChart = new Chart(activityCtx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    data: [45, 60, 35, 70, 55, 40, 30],
                    backgroundColor: 'rgba(45, 156, 219, 0.7)',
                    borderRadius: 6,
                    barPercentage: 0.6,
                    categoryPercentage: 0.8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Minutes: ${context.raw}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: true,
                            color: '#e2e8f0'
                        },
                        ticks: {
                            stepSize: 20
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

// ===== Social Feed Data =====
const socialFeedData = [
    {
        name: 'Sarah Johnson',
        avatar: 'SJ',
        time: '2 hours ago',
        content: 'Just completed the Digital Literacy course! The content was amazing and very informative. Highly recommend to everyone! 🎉',
        likes: 24,
        comments: 5
    },
    {
        name: 'Michael Chen',
        avatar: 'MC',
        time: '5 hours ago',
        content: 'The UI/UX Design course has really helped me improve my design skills. The practical exercises were fantastic!',
        likes: 18,
        comments: 3
    },
    {
        name: 'Emily Rodriguez',
        avatar: 'ER',
        time: '1 day ago',
        content: 'Just started the Data Analytics course. Looking forward to learning new skills! Any tips from those who completed it?',
        likes: 12,
        comments: 8
    }
];

// ===== Render Social Feed =====
function renderSocialFeed() {
    const socialFeed = document.getElementById('socialFeed');
    if (!socialFeed) return;

    socialFeed.innerHTML = socialFeedData.map(post => `
        <div class="social-post">
            <div class="social-post-header">
                <div class="social-avatar">${post.avatar}</div>
                <div>
                    <div class="social-name">${post.name}</div>
                    <div class="social-time">${post.time}</div>
                </div>
            </div>
            <div class="social-content">${post.content}</div>
            <div class="social-actions">
                <span class="social-action" data-action="like">
                    <i class="bi bi-heart"></i> ${post.likes}
                </span>
                <span class="social-action" data-action="comment">
                    <i class="bi bi-chat"></i> ${post.comments}
                </span>
                <span class="social-action" data-action="share">
                    <i class="bi bi-share"></i> Share
                </span>
            </div>
        </div>
    `).join('');

    // Add event listeners to social actions
    document.querySelectorAll('.social-action').forEach(action => {
        action.addEventListener('click', (e) => {
            e.stopPropagation();
            const actionType = action.dataset.action;
            if (actionType === 'like') {
                const likeCount = action.querySelector('i + span') || action;
                const currentLikes = parseInt(likeCount.textContent);
                likeCount.textContent = currentLikes + 1;
                showNotification('Liked this post!', 'success');
            } else if (actionType === 'comment') {
                showNotification('Comment feature coming soon!', 'info');
            } else if (actionType === 'share') {
                showNotification('Share feature coming soon!', 'info');
            }
        });
    });
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bi bi-${type === 'success' ? 'check-circle-fill' : type === 'error' ? 'x-circle-fill' : 'info-circle-fill'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => notification.remove());
    
    setTimeout(() => {
        if (notification.parentNode) notification.remove();
    }, 3000);
}

// ===== Filter Courses =====
function filterCourses(filter) {
    const courseCards = document.querySelectorAll('.my-course-card');
    courseCards.forEach(card => {
        const status = card.dataset.status;
        if (filter === 'all' || status === filter) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// ===== Update Progress =====
function updateCourseProgress(card, progress) {
    const progressFill = card.querySelector('.progress-fill');
    const progressText = card.querySelector('.progress-label span');
    if (progressFill && progressText) {
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${progress}%`;
        progressText.style.color = progress === 100 ? 'var(--success)' : 'var(--brand-blue)';
        
        if (progress === 100) {
            const button = card.querySelector('.course-action-btn');
            button.innerHTML = '<i class="bi bi-check-circle-fill"></i> Completed';
            button.className = 'course-action-btn btn-completed';
            card.dataset.status = 'completed';
        }
    }
}

// ===== Event Listeners =====

// Mobile Menu Toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Close sidebar on outside click (mobile)
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (sidebar && !sidebar.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// Navigation Items
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        const pageName = item.textContent.trim();
        if (pageTitle) pageTitle.textContent = pageName;
        showNotification(`Loading ${pageName}...`, 'info');
    });
});

// Ask AI Button
if (askAiBtn) {
    askAiBtn.addEventListener('click', () => {
        showNotification('AI Assistant is ready to help you! What would you like to know?', 'success');
    });
}

// Language Selector
if (langSelect) {
    langSelect.addEventListener('change', (e) => {
        showNotification(`Language changed to ${e.target.value}`, 'info');
    });
}

// Topbar Icons
topbarIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const iconClass = icon.classList.contains('bi-chat') ? 'Chat' :
                         icon.classList.contains('bi-calendar3') ? 'Calendar' :
                         icon.classList.contains('bi-link-45deg') ? 'Links' :
                         icon.classList.contains('bi-bell') ? 'Notifications' : '';
        showNotification(`${iconClass} feature coming soon!`, 'info');
    });
});

// User Menu
if (userPill) {
    userPill.addEventListener('click', () => {
        showNotification('User profile menu coming soon!', 'info');
    });
}

// Course Cards (Discovery)
courseCards.forEach(card => {
    card.addEventListener('click', () => {
        const courseName = card.querySelector('.course-name')?.textContent;
        showNotification(`Opening course: ${courseName}`, 'success');
    });
});

// Stat Cards
statCards.forEach(card => {
    card.addEventListener('click', () => {
        const statLabel = card.querySelector('.stat-label')?.textContent;
        const statValue = card.querySelector('.stat-value')?.textContent;
        showNotification(`${statLabel}: ${statValue}`, 'info');
    });
});

// Filter Tabs
filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;
        filterCourses(filter);
        showNotification(`Showing ${filter} courses`, 'info');
    });
});

// Course Action Buttons
courseActionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.my-course-card');
        const courseTitle = card?.querySelector('.my-course-title')?.textContent;
        
        if (btn.classList.contains('btn-start')) {
            showNotification(`Starting course: ${courseTitle}`, 'success');
            btn.innerHTML = '<i class="bi bi-play-circle-fill"></i> Continue';
            btn.className = 'course-action-btn btn-continue';
            updateCourseProgress(card, 10);
        } else if (btn.classList.contains('btn-continue')) {
            showNotification(`Continuing course: ${courseTitle}`, 'success');
            updateCourseProgress(card, Math.min(parseInt(card.querySelector('.progress-fill')?.style.width || '0') + 20, 100));
        } else if (btn.classList.contains('btn-completed')) {
            showNotification(`Course already completed: ${courseTitle}`, 'info');
        }
    });
});

// Resume Button
if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
        showNotification('Resuming Digital Literacy course...', 'success');
    });
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'm' || e.key === 'M') {
        if (window.innerWidth <= 768 && sidebar) {
            sidebar.classList.toggle('active');
        }
    }
    if (e.key === '?' || e.key === '/') {
        showNotification('Keyboard shortcuts: M - Toggle menu, ? - Show help, Esc - Close notifications', 'info');
    }
    if (e.key === 'Escape') {
        document.querySelectorAll('.notification').forEach(notif => notif.remove());
    }
});

// Window Resize Handler
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && sidebar) {
            sidebar.classList.remove('active');
        }
        if (activityChart) activityChart.resize();
        if (donutChart) donutChart.resize();
    }, 250);
});

// Initialize on Load
window.addEventListener('load', () => {
    console.log('Admin Dashboard initialized');
    initCharts();
    renderSocialFeed();
    showNotification('Welcome back to MindScroll!', 'success');
    
    // Animate stat cards
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Export functions for debugging (optional)
window.dashboard = {
    showNotification,
    filterCourses,
    updateCourseProgress,
    initCharts
};