/* ============================================================
   NEURAL NETWORK MASTERCLASS — Core Application Logic
   Navigation, rendering, background animation, progress tracking
   ============================================================ */

const NeuralApp = (function () {
    'use strict';

    // ── Section Registry ──────────────────────────────────────
    const sections = {};
    const sectionMeta = [
        { id: 1,  icon: '🌉', titleEn: 'From Analytics to Neural Networks', subtitleEn: 'Bridge what you know to the neural world', titleAr: 'من تحليل البيانات للشبكات العصبية', subtitleAr: 'اربط بين معرفتك السابقة وعالم الذكاء الاصطناعي' },
        { id: 2,  icon: '🧠', titleEn: 'Foundations of Neural Networks',    subtitleEn: 'Neurons, layers, and forward propagation', titleAr: 'أساسيات الشبكات العصبية', subtitleAr: 'الخلايا، الطبقات، والانتشار الأمامي' },
        { id: 3,  icon: '⚡', titleEn: 'Activation & Loss Functions',       subtitleEn: 'The mathematical engine room', titleAr: 'دوال التنشيط وحساب الخسارة', subtitleAr: 'المحرك الرياضي للشبكات العصبية' },
        { id: 4,  icon: '🔄', titleEn: 'Training & Backpropagation',       subtitleEn: 'How neural networks learn from data', titleAr: 'التدريب والانتشار الخلفي', subtitleAr: 'كيف تتعلم الشبكات من البيانات' },
        { id: 5,  icon: '🛡️', titleEn: 'Regularization & Generalization',  subtitleEn: 'Preventing overfitting, building robustness', titleAr: 'التنظيم والتعميم', subtitleAr: 'منع فرط التخصيص وبناء نماذج قوية' },
        { id: 6,  icon: '👁️', titleEn: 'Convolutional Neural Networks',     subtitleEn: 'Spatial pattern recognition for images', titleAr: 'الشبكات العصبية التلافيفية', subtitleAr: 'التعرف على الأنماط المكانية للصور' },
        { id: 7,  icon: '📝', titleEn: 'Recurrent Networks & Sequences',   subtitleEn: 'Modeling time-series and text', titleAr: 'الشبكات المتكررة والسلاسل', subtitleAr: 'نمذجة السلاسل الزمنية والنصوص' },
        { id: 8,  icon: '🤖', titleEn: 'Transformers & Attention',         subtitleEn: 'The architecture powering modern AI', titleAr: 'المحولات والانتباه', subtitleAr: 'البنية التي تشغل الذكاء الاصطناعي الحديث' },
        { id: 9,  icon: '🎨', titleEn: 'Generative Models & Modern AI',    subtitleEn: 'Creating new data: images, text, and beyond', titleAr: 'النماذج التوليدية', subtitleAr: 'إنشاء بيانات جديدة: صور، نصوص، والمزيد' },
        { id: 10, icon: '🔍', titleEn: 'Interpretability, Ethics & Analytics', subtitleEn: 'Making neural networks trustworthy', titleAr: 'قابلية التفسير والأخلاقيات', subtitleAr: 'جعل الشبكات العصبية جديرة بالثقة' },
    ];
    
    function getMeta(sec) {
        const lang = I18n.getLanguage();
        return {
            title: lang === 'ar' ? sec.titleAr : sec.titleEn,
            subtitle: lang === 'ar' ? sec.subtitleAr : sec.subtitleEn
        };
    }

    // ── State ─────────────────────────────────────────────────
    let currentSection = 'welcome';
    let completedSections = new Set();
    let activeDemo = null;
    let bgAnimationId = null;

    // ── Public API ────────────────────────────────────────────
    function registerSection(config) {
        sections[config.id] = config;
    }

    function init() {
        buildNav();
        buildPreviewGrid();
        initBackground();
        initScrollTop();
        initSidebarToggle();
        bindNavigation();
        loadStateFromStorage();
        
        const langBtn = document.getElementById('langToggle');
        if (langBtn) {
            langBtn.addEventListener('click', () => {
                I18n.toggleLanguage();
                langBtn.textContent = I18n.getLanguage() === 'en' ? 'ع' : 'EN';
            });
            langBtn.textContent = I18n.getLanguage() === 'en' ? 'ع' : 'EN';
        }
        I18n.setLanguage(I18n.getLanguage());

        handleHashNavigation();
    }
    
    function reRender() {
        buildNav();
        buildPreviewGrid();
        updateProgress();
        if (currentSection !== 'welcome') {
            renderSection(currentSection);
        }
        
        // Re-apply active states
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        const navItem = document.getElementById(currentSection === 'welcome' ? 'nav-welcome' : `nav-${currentSection}`);
        if (navItem) navItem.classList.add('active');
    }

    // ── Navigation ────────────────────────────────────────────
    function buildNav() {
        const nav = document.getElementById('nav');
        // Clear old generated items
        nav.querySelectorAll('a:not(#nav-welcome)').forEach(el => el.remove());
        // Update welcome label
        const welcomeLabel = document.querySelector('#nav-welcome .nav-label');
        if (welcomeLabel) welcomeLabel.textContent = I18n.t('nav-welcome');
        
        sectionMeta.forEach((sec) => {
            const a = document.createElement('a');
            a.href = `#section-${sec.id}`;
            a.className = 'nav-item';
            a.dataset.section = sec.id;
            a.id = `nav-${sec.id}`;
            const meta = getMeta(sec);
            a.innerHTML = `
                <span class="nav-icon">${sec.icon}</span>
                <span class="nav-label">${meta.title}</span>
                <span class="nav-status"></span>
            `;
            nav.appendChild(a);
        });
        
        // Bind new nav items
        nav.querySelectorAll('a:not(#nav-welcome)').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo(item.dataset.section);
            });
        });
    }

    function buildPreviewGrid() {
        const grid = document.getElementById('sectionGrid');
        if (!grid) return;
        grid.innerHTML = ''; // clear for rerender
        sectionMeta.forEach((sec) => {
            const card = document.createElement('div');
            card.className = 'preview-card';
            card.dataset.section = sec.id;
            const meta = getMeta(sec);
            card.innerHTML = `
                <div class="preview-card-header">
                    <span class="preview-card-number">${String(sec.id).padStart(2, '0')}</span>
                    <span class="preview-card-icon">${sec.icon}</span>
                </div>
                <h3>${meta.title}</h3>
                <p>${meta.subtitle}</p>
            `;
            card.addEventListener('click', () => navigateTo(sec.id));
            grid.appendChild(card);
        });
    }

    function bindNavigation() {
        // Nav items
        document.querySelectorAll('.nav-item').forEach((item) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const sec = item.dataset.section;
                navigateTo(sec);
            });
        });

        // Start button
        const startBtn = document.getElementById('startButton');
        if (startBtn) {
            startBtn.addEventListener('click', () => navigateTo(1));
        }

        // Hash change
        window.addEventListener('hashchange', handleHashNavigation);
    }

    function handleHashNavigation() {
        const hash = window.location.hash;
        if (hash) {
            const match = hash.match(/^#section-(\d+|welcome)$/);
            if (match) {
                const target = match[1] === 'welcome' ? 'welcome' : parseInt(match[1]);
                navigateTo(target, false);
            }
        }
    }

    function navigateTo(sectionId, updateHash = true) {
        if (String(sectionId) === String(currentSection)) return;

        // Destroy previous demo
        if (activeDemo && activeDemo.destroyDemo) {
            activeDemo.destroyDemo();
            activeDemo = null;
        }

        // Hide current section
        const allPages = document.querySelectorAll('.page-section');
        allPages.forEach((p) => p.classList.remove('active'));

        // Update nav
        document.querySelectorAll('.nav-item').forEach((n) => n.classList.remove('active'));

        if (sectionId === 'welcome') {
            document.getElementById('section-welcome').classList.add('active');
            document.getElementById('nav-welcome').classList.add('active');
        } else {
            const numId = parseInt(sectionId);
            renderSection(numId);
            const navItem = document.getElementById(`nav-${numId}`);
            if (navItem) navItem.classList.add('active');

            // Mark as visited
            completedSections.add(numId);
            updateProgress();
            saveStateToStorage();
        }

        currentSection = sectionId;
        if (updateHash) {
            window.location.hash = sectionId === 'welcome' ? '#section-welcome' : `#section-${sectionId}`;
        }

        // Scroll to top of main
        document.getElementById('mainContent').scrollTo({ top: 0, behavior: 'smooth' });

        // Close mobile sidebar
        closeSidebar();
    }

    function renderSection(id) {
        const container = document.getElementById('sectionContainer');
        const section = sections[id];
        const meta = sectionMeta.find((s) => s.id === id);
        const lang = I18n.getLanguage();
        const contentHtml = (lang === 'ar' && section.contentAr) ? section.contentAr : section.content;
        const metaLocal = getMeta(meta);

        if (!section || !meta) {
            container.innerHTML = `
                <div class="page-section section-page active" style="text-align:center; padding: 4rem;">
                    <h2 style="margin-bottom:1rem;">${I18n.t('coming-soon', {id})}</h2>
                    <p>${I18n.t('coming-soon-desc')}</p>
                    ${buildSectionNav(id)}
                </div>
            `;
            return;
        }

        // Remove previous dynamic sections
        const existing = container.querySelector('.page-section');
        if (existing) existing.remove();

        const page = document.createElement('section');
        page.className = 'page-section section-page active';
        page.id = `section-${id}`;
        page.innerHTML = `
            <div class="section-header">
                <div class="section-badge">${String(id).padStart(2, '0')} / 10</div>
                <h2><span class="section-icon">${meta.icon}</span>${metaLocal.title}</h2>
                <p>${metaLocal.subtitle}</p>
            </div>
            <div class="section-body">
                ${contentHtml}
            </div>
            <div class="demo-container" id="demo-area-${id}">
                <div class="demo-header">
                    <div class="demo-title">
                        ${I18n.t('interactive-demo')}
                    </div>
                </div>
                <div class="demo-canvas-container">
                    <canvas id="demo-canvas-${id}" width="900" height="450"></canvas>
                </div>
                <div class="demo-controls" id="demo-controls-${id}"></div>
            </div>
            ${buildSectionNav(id)}
        `;

        container.innerHTML = '';
        container.appendChild(page);

        // Render math via KaTeX
        renderMath(page);

        // Init demo
        if (section.initDemo) {
            try {
                const demoArea = document.getElementById(`demo-area-${id}`);
                section.initDemo(demoArea);
                activeDemo = section;
            } catch (err) {
                console.warn(`Demo init failed for section ${id}:`, err);
            }
        }

        // Bind section nav buttons
        page.querySelectorAll('.section-nav-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const target = btn.dataset.target;
                if (target === 'welcome') navigateTo('welcome');
                else navigateTo(parseInt(target));
            });
        });

        // Init collapsibles
        initCollapsibles(page);
        // Init tabs
        initTabs(page);
    }

    function buildSectionNav(currentId) {
        const prevId = currentId > 1 ? currentId - 1 : 'welcome';
        const nextId = currentId < 10 ? currentId + 1 : null;
        
        let prevLabel = I18n.t('nav-welcome');
        if (currentId > 1) prevLabel = getMeta(sectionMeta[currentId - 2]).title;
        
        let nextLabel = null;
        if (nextId) nextLabel = getMeta(sectionMeta[nextId - 1]).title;

        return `
            <div class="section-nav">
                <button class="section-nav-btn prev" data-target="${prevId}">
                    ← ${prevLabel}
                </button>
                ${nextId ? `
                    <button class="section-nav-btn next" data-target="${nextId}">
                        ${nextLabel} →
                    </button>
                ` : `
                    <button class="section-nav-btn next" data-target="welcome">
                        ${I18n.t('back-to-home')}
                    </button>
                `}
            </div>
        `;
    }

    // ── Math Rendering ────────────────────────────────────────
    function renderMath(container) {
        if (typeof katex === 'undefined') return;

        // Block math: <span class="math-display">...</span>
        container.querySelectorAll('.math-display').forEach((el) => {
            try {
                katex.render(el.textContent, el, { displayMode: true, throwOnError: false });
            } catch (e) { /* ignore */ }
        });

        // Inline math: <span class="math-inline">...</span>
        container.querySelectorAll('.math-inline').forEach((el) => {
            try {
                katex.render(el.textContent, el, { displayMode: false, throwOnError: false });
            } catch (e) { /* ignore */ }
        });
    }

    // ── Collapsibles ──────────────────────────────────────────
    function initCollapsibles(container) {
        container.querySelectorAll('.collapsible-trigger').forEach((trigger) => {
            trigger.addEventListener('click', () => {
                const content = trigger.nextElementSibling;
                const isOpen = trigger.classList.contains('open');
                trigger.classList.toggle('open');
                content.classList.toggle('open');
            });
        });
    }

    // ── Tabs ──────────────────────────────────────────────────
    function initTabs(container) {
        container.querySelectorAll('.tabs').forEach((tabGroup) => {
            const buttons = tabGroup.querySelectorAll('.tab-btn');
            const panels = tabGroup.querySelectorAll('.tab-panel');
            buttons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    buttons.forEach((b) => b.classList.remove('active'));
                    panels.forEach((p) => p.classList.remove('active'));
                    btn.classList.add('active');
                    const target = tabGroup.querySelector(`#${btn.dataset.tab}`);
                    if (target) target.classList.add('active');
                });
            });
        });
    }

    // ── Progress Tracking ─────────────────────────────────────
    function updateProgress() {
        const count = completedSections.size;
        const fill = document.getElementById('progressFill');
        const text = document.getElementById('progressText');
        if (fill) fill.style.width = `${(count / 10) * 100}%`;
        if (text) text.textContent = `${count} / 10 ${I18n.t('stat-sections')}`;

        // Update nav completed states
        completedSections.forEach((id) => {
            const navItem = document.getElementById(`nav-${id}`);
            if (navItem) navItem.classList.add('completed');
        });
    }

    // ── State Persistence ─────────────────────────────────────
    function saveStateToStorage() {
        try {
            localStorage.setItem('nn-masterclass-completed', JSON.stringify([...completedSections]));
        } catch (e) { /* ignore */ }
    }

    function loadStateFromStorage() {
        try {
            const stored = localStorage.getItem('nn-masterclass-completed');
            if (stored) {
                const arr = JSON.parse(stored);
                arr.forEach((id) => completedSections.add(id));
                updateProgress();
            }
        } catch (e) { /* ignore */ }
    }

    // ── Sidebar Toggle (Mobile) ───────────────────────────────
    function initSidebarToggle() {
        const toggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        if (!toggle || !sidebar) return;

        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            toggle.classList.toggle('open');
        });

        // Close on outside click
        document.getElementById('mainContent').addEventListener('click', closeSidebar);
    }

    function closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        const toggle = document.getElementById('sidebarToggle');
        if (sidebar) sidebar.classList.remove('open');
        if (toggle) toggle.classList.remove('open');
    }

    // ── Scroll to Top ─────────────────────────────────────────
    function initScrollTop() {
        const btn = document.getElementById('scrollTop');
        const main = document.getElementById('mainContent');
        if (!btn || !main) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ── Neural Network Background ─────────────────────────────
    function initBackground() {
        const canvas = document.getElementById('neuralBg');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];
        const PARTICLE_COUNT = 60;
        const CONNECTION_DIST = 150;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 2 + 1,
                hue: Math.random() > 0.5 ? 190 : 270, // cyan or purple
            };
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(createParticle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update & draw particles
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, 0.6)`;
                ctx.fill();
            });

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONNECTION_DIST) {
                        const alpha = 1 - dist / CONNECTION_DIST;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `hsla(200, 80%, 65%, ${alpha * 0.15})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            bgAnimationId = requestAnimationFrame(animate);
        }

        resize();
        initParticles();
        animate();

        window.addEventListener('resize', () => {
            resize();
            initParticles();
        });
    }

    // ── Expose API ────────────────────────────────────────────
    return {
        init,
        reRender,
        registerSection,
        navigateTo,
        sections,
        sectionMeta,
    };
})();

// Make globally accessible
window.NeuralApp = NeuralApp;
