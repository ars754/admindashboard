document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    initializeSocialFeed();
    initializeFilters();
    initializeNavigation();
    initializeMobileMenu();
    });
function initializeCharts() {
    const dCtx = document.getElementById('donutChart');
    if (dCtx) {
        new Chart(dCtx, {
            type: 'doughnut',
            data: {
                datasets: [{ 
                    data: [40, 35, 25], 
                    backgroundColor: ['#2D9CDB', '#F2994A', '#BDBDBD'],
                    borderWidth: 0, 
                    hoverOffset: 4 
                    }]},
                options: {
                    cutout: '70%', 
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: { 
                        legend: { display: false }, 
                        tooltip: { enabled: true } 
                        }
                    }});
            }
const aCtx = document.getElementById('activityChart');
    if (aCtx) {
        new Chart(aCtx, {
            type: 'line',
            data: {
                labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
                datasets: [
                    {
                    label: 'Learning',
                    data: [20, 45, 30, 70, 55, 80, 60],
                    borderColor: '#2D9CDB',
                    backgroundColor: 'rgba(45,156,219,.07)',
                    fill: true,
                    tension: 0.45,
                    pointRadius: 0,
                    borderWidth: 2
                    },
                    {
                    label: 'Activity',
                    data: [40, 25, 60, 45, 75, 50, 90],
                    borderColor: '#6FCF97',
                    backgroundColor: 'rgba(111,207,151,.07)',
                    fill: true,
                    tension: 0.45,
                    pointRadius: 0,
                    borderWidth: 2
                    }
                ]},
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { 
                        legend: { display: false },
                        tooltip: { enabled: true }
                        },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    }}
                });
            }
        }
function initializeSocialFeed() {
    const teams = [
        { name: 'Team UI/UX', color: '#2D9CDB', icon: '💻', message: 'Just finished the React hooks module!' },
        { name: 'Team Digital Literacy', color: '#6FCF97', icon: '📖', message: 'Completed the advanced CSS course!' },
        { name: 'Team Web development', color: '#F2994A', icon: '🌐', message: 'Started working on the new project' },
        { name: 'Team Digital Marketing', color: '#EB5757', icon: '📣', message: 'Shared valuable insights about SEO' },
        { name: 'Team Law', color: '#1A1A2E', icon: '⚖️', message: 'Updated the compliance documentation' },
        { name: 'Team Marketing Research', color: '#9B51E0', icon: '📊', message: 'Analyzed Q4 market trends' },
        { name: 'Team Finance', color: '#219653', icon: '💰', message: 'Prepared quarterly budget report' }
    ];
    const feed = document.getElementById('socialFeed');
        if (feed) {
            teams.forEach((t, index) => {
                feed.innerHTML += `
                    <div class="social-item" style="animation-delay: ${index * 0.1}s">
                      <div class="social-avatar" style="background:${t.color}">${t.icon}</div>
                        <div style="flex:1;min-width:0">
                          <div class="social-team">${t.name}</div>
                            <div class="social-msg">${t.message}</div>
                              <div class="social-actions">
                                <button class="social-action-btn" onclick="handleLike(this)">
                                  <i class="bi bi-hand-thumbs-up"></i> <span class="like-count">0</span> Likes
                                </button>
                                <button class="social-action-btn" onclick="handleComment(this)">
                                  <i class="bi bi-chat-left-text"></i> Comment
                                </button>
                              </div>
                            </div>
                          </div>`;
                });
            }
        }
function initializeFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const courseCards = document.querySelectorAll('.my-course-card');        
    filterTabs.forEach(btn => {
        btn.addEventListener('click', function() {
            filterTabs.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filterValue = this.getAttribute('data-filter');
            courseCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = '';
                }
                else {
                    const status = card.getAttribute('data-status');
                    if (filterValue === 'pending') {
                        card.style.display = (status === 'not-started' || status === 'in-progress') ? '' : 'none';
                        } 
                    else {
                        card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item-custom');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            const page = this.getAttribute('data-page');
            console.log(`Navigating to ${page} page`);
            showNotification(`Loading ${page} page...`, 'info');
            });
        });
    }
function initializeMobileMenu() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');       
    if (mobileBtn && sidebar) {
        mobileBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !mobileBtn.contains(e.target)) {
            sidebar.classList.remove('open');
            }
        }});
    }}
    window.handleLike = function(button) {
        const likeSpan = button.querySelector('.like-count');
        let currentLikes = parseInt(likeSpan.textContent);
        currentLikes++;
        likeSpan.textContent = currentLikes;
        button.style.transform = 'scale(1.1)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
        showNotification('Liked!', 'success');
    };   
    window.handleComment = function(button) {
        const comment = prompt('Write your comment:');
        if (comment && comment.trim()) {
            showNotification('Comment added!', 'success');
            }
    };
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27AE60' : '#2D9CDB'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            `;
        document.body.appendChild(notification);
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
                }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
                }
            `;
        document.head.appendChild(style);
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'd':
                e.preventDefault();
                document.querySelector('.nav-item-custom.active')?.click();
                break;
            case 's':
                e.preventDefault();
                showNotification('Search feature coming soon!', 'info');
                break;
            }
        }
    });
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
            }
        });
    });    
lazyImages.forEach(img => imageObserver.observe(img));
