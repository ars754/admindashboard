document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item-custom');
    navItems.forEach(btn => {
        btn.addEventListener('click', () => {
            navItems.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const page = btn.dataset.page;
            document.querySelector('.topbar h1').textContent =
            page.charAt(0).toUpperCase() + page.slice(1);
            // On mobile, close sidebar after navigation
            if (window.innerWidth <= 700) {
                document.getElementById('sidebar').classList.remove('open');
                }    
        });
    });
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.getElementById('sidebar');
if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        });
// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 700 && !sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        sidebar.classList.remove('open');
        }
    });
  }
/* ---- Filter Tabs ---- */
const filterTabs = document.querySelectorAll('.filter-tab');
const courseCards = document.querySelectorAll('.my-course-card');
filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    const filter = tab.dataset.filter;
    courseCards.forEach(card => {
        if (filter === 'all') {
            card.style.display = 'flex';
        } 
        else if (filter === 'pending') {
            const status = card.dataset.status;
            card.style.display =
            (status === 'in-progress' || status === 'not-started') ? 'flex' : 'none';
        } 
        else if (filter === 'category') {
          // Show all for demo
          card.style.display = 'flex';
        } else {
          card.style.display = 'flex';
        }
      });
    });
  });
  /* ---- Donut Chart (My Progress) ---- */
  const donutCanvas = document.getElementById('donutChart');
  if (donutCanvas && window.Chart) {
    new Chart(donutCanvas, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [30, 50, 20],
          backgroundColor: ['#2D9CDB', '#F2994A', '#bdbdbd'],
          borderWidth: 0,
          hoverOffset: 4,
          borderRadius: 4,
        }]
      },
      options: {
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const labels = ['Not Started', 'Completed', 'In Progress'];
                return ` ${labels[ctx.dataIndex]}: ${ctx.raw}%`;
              }
            }
          }
        },
        animation: {
          animateRotate: true,
          duration: 900,
          easing: 'easeInOutQuart'
        }
      }
    });
  }

  /* ---- Activity Line Chart ---- */
  const activityCanvas = document.getElementById('activityChart');
  if (activityCanvas && window.Chart) {
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    new Chart(activityCanvas, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Time Spent',
            data: [1.2, 2.1, 0.8, 2.8, 1.9, 3.2, 2.5],
            borderColor: '#2D9CDB',
            backgroundColor: 'rgba(45,156,219,0.08)',
            borderWidth: 2.5,
            tension: 0.45,
            fill: true,
            pointRadius: 3,
            pointHoverRadius: 5,
            pointBackgroundColor: '#2D9CDB',
          },
          {
            label: 'Courses',
            data: [0.5, 1.5, 1.0, 2.0, 1.2, 2.5, 1.8],
            borderColor: '#F2994A',
            backgroundColor: 'rgba(242,153,74,0.06)',
            borderWidth: 2.5,
            tension: 0.45,
            fill: true,
            pointRadius: 3,
            pointHoverRadius: 5,
            pointBackgroundColor: '#F2994A',
          },
          {
            label: 'Quizzes',
            data: [0.8, 0.4, 1.3, 0.9, 1.6, 1.1, 2.0],
            borderColor: '#9b59b6',
            backgroundColor: 'rgba(155,89,182,0.05)',
            borderWidth: 2.5,
            tension: 0.45,
            fill: true,
            pointRadius: 3,
            pointHoverRadius: 5,
            pointBackgroundColor: '#9b59b6',
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: '#fff',
            titleColor: '#1a1a2e',
            bodyColor: '#666',
            borderColor: '#e8ecf0',
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${ctx.raw}h`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 10 }, color: '#aaa' }
          },
          y: {
            display: false,
            grid: { color: '#f0f0f0' }
          }
        },
        animation: { duration: 900, easing: 'easeInOutQuart' }
      }
    });
  }

  /* ---- Social Wall Feed ---- */
  const socialFeedEl = document.getElementById('socialFeed');
  const socialPosts = [
    { name: 'Team UI/UX',            emoji: '🖥️', text: 'Just finished the React hooks module!' },
    { name: 'Team Digital Literacy', emoji: '📖', text: 'Just finished the React hooks module!' },
    { name: 'Team Web Development',  emoji: '🌐', text: 'Just finished the React hooks module!' },
    { name: 'Team Digital Marketing',emoji: '📢', text: 'Just finished the React hooks module!' },
    { name: 'Team Law',              emoji: '⚖️', text: 'Just finished the React hooks module!' },
    { name: 'Team Marketing Research',emoji:'📊', text: 'Just finished the React hooks module!' },
    { name: 'Team Finance',          emoji: '💰', text: 'Just finished the React hooks module!' },
    { name: 'Team Data Science',     emoji: '🔬', text: 'Just finished the Python ML module!'  },
    { name: 'Team HR',               emoji: '👥', text: 'Completed the Leadership course!'      },
  ];

  if (socialFeedEl) {
    socialFeedEl.innerHTML = socialPosts.map((p, i) => `
      <div class="social-post" style="animation: fade-in-up 0.3s ${i * 0.05}s both">
        <div class="social-avatar">${p.emoji}</div>
        <div class="social-post-content">
          <div class="social-post-name">${p.name}</div>
          <div class="social-post-text">${p.text}</div>
          <div class="social-post-actions">
            <button class="social-action like-btn" data-index="${i}">
              <i class="bi bi-hand-thumbs-up"></i> Likes
            </button>
            <button class="social-action">
              <i class="bi bi-chat-square-text"></i> Comment
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Like button toggle
    socialFeedEl.querySelectorAll('.like-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('liked');
        if (btn.classList.contains('liked')) {
          btn.style.color = '#2D9CDB';
          btn.style.background = '#e8f4fc';
          btn.innerHTML = '<i class="bi bi-hand-thumbs-up-fill"></i> Liked';
        } else {
          btn.style.color = '';
          btn.style.background = '';
          btn.innerHTML = '<i class="bi bi-hand-thumbs-up"></i> Likes';
        }
      });
    });
  }

  /* ---- Resume Banner Progress ---- */
  // Already set inline; just ensure animation
  const resumeBar = document.querySelector('.resume-progress-bar div');
  if (resumeBar) {
    resumeBar.style.width = '0%';
    requestAnimationFrame(() => {
      setTimeout(() => { resumeBar.style.transition = 'width 0.8s ease'; resumeBar.style.width = '40%'; }, 200);
    });
  }

  /* ---- Course Action Buttons (Start / Continue) ---- */
  document.querySelectorAll('.course-action-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.my-course-card');
      const fill = card.querySelector('.progress-fill');
      const label = card.querySelector('.progress-label span');

      if (btn.classList.contains('btn-start')) {
        fill.style.width = '5%';
        if (label) { label.textContent = '5%'; label.style.color = 'var(--brand-blue)'; }
        btn.className = 'course-action-btn btn-continue';
        btn.innerHTML = '<i class="bi bi-play-circle-fill"></i> Continue';
        card.dataset.status = 'in-progress';
      } else if (btn.classList.contains('btn-continue')) {
        // Simulate a bit more progress
        const curr = parseFloat(fill.style.width) || 30;
        const next = Math.min(curr + 15, 100);
        fill.style.width = next + '%';
        if (label) {
          label.textContent = next + '%';
          if (next === 100) {
            label.style.color = 'var(--accent-green)';
            fill.style.background = 'var(--accent-green)';
            btn.className = 'course-action-btn btn-completed';
            btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Completed';
            card.dataset.status = 'completed';
          }
        }
      }
    });
  });

  /* ---- Ask AI Button ---- */
  const askAiBtn = document.querySelector('.ask-ai-btn');
  if (askAiBtn) {
    askAiBtn.addEventListener('click', () => {
      // Simple modal-like alert for demo purposes
      const msg = document.createElement('div');
      msg.style.cssText = `
        position:fixed; bottom:24px; right:24px; z-index:9999;
        background:#1a1a2e; color:#fff; padding:14px 20px;
        border-radius:12px; font-size:0.85rem; font-weight:600;
        box-shadow:0 8px 24px rgba(0,0,0,0.18);
        animation: fade-in-up 0.3s both;
        display:flex; align-items:center; gap:10px;
      `;
      msg.innerHTML = '<span style="font-size:1.2rem">🤖</span> AI assistant is coming soon!';
      document.body.appendChild(msg);
      setTimeout(() => {
        msg.style.transition = 'opacity 0.4s';
        msg.style.opacity = '0';
        setTimeout(() => msg.remove(), 400);
      }, 2500);
    });
  }

  /* ---- Topbar Icons ---- */
  document.querySelectorAll('.topbar-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      icon.style.transform = 'scale(0.85)';
      setTimeout(() => { icon.style.transform = ''; }, 150);
    });
  });

});