const I18n = (function() {
    'use strict';

    let currentLang = localStorage.getItem('nn-lang') || 'en';

    const translations = {
        en: {
            'logo-title': 'Neural Networks',
            'logo-subtitle': 'Interactive Masterclass',
            'built-with': 'Built with <span class="heart">♥</span> by AI Agents',
            'hero-badge': '<span class="badge-dot"></span> 📊 → 🧠 For Data Analytics Professionals',
            'hero-title': 'Master <span class="gradient-text">Neural Networks</span>',
            'hero-subtitle': 'An interactive journey from classical analytics to cutting-edge deep learning. Built for professors and professionals who already speak the language of data.',
            'stat-sections': 'Sections',
            'stat-topics': 'Topics',
            'stat-demos': 'Interactive Demos',
            'stat-insights': 'Insights',
            'start-button': 'Begin Your Journey <span class="arrow">→</span>',
            'roadmap-title': 'Course Roadmap',
            'nav-welcome': 'Welcome',
            'back-to-home': '🏠 Back to Home',
            'coming-soon': '🚧 Section {id} Coming Soon',
            'coming-soon-desc': 'This section is being built by our AI agents. Check back shortly!',
            'interactive-demo': '🎮 Interactive Demo <span class="demo-badge">LIVE</span>'
        },
        ar: {
            'logo-title': 'الشبكات العصبية',
            'logo-subtitle': 'دورة تفاعلية متقدمة',
            'built-with': 'تم الإنشاء بـ <span class="heart">♥</span> بواسطة وكلاء الذكاء الاصطناعي',
            'hero-badge': '<span class="badge-dot"></span> 📊 → 🧠 لمحترفي تحليل البيانات',
            'hero-title': 'احترف <span class="gradient-text">الشبكات العصبية</span>',
            'hero-subtitle': 'رحلة تفاعلية من التحليل الكلاسيكي إلى التعلم العميق المتطور. مصممة للأساتذة والمحترفين الذين يتحدثون لغة البيانات.',
            'stat-sections': 'أقسام',
            'stat-topics': 'مواضيع',
            'stat-demos': 'عروض تفاعلية',
            'stat-insights': 'رؤى',
            'start-button': 'ابدأ رحلتك <span class="arrow">←</span>',
            'roadmap-title': 'خريطة الدورة',
            'nav-welcome': 'مرحباً',
            'back-to-home': '🏠 العودة للرئيسية',
            'coming-soon': '🚧 القسم {id} قريباً',
            'coming-soon-desc': 'يتم بناء هذا القسم بواسطة وكلاء الذكاء الاصطناعي. عد قريباً!',
            'interactive-demo': '🎮 عرض تفاعلي <span class="demo-badge">مباشر</span>'
        }
    };

    function t(key, params = {}) {
        let text = translations[currentLang][key] || translations['en'][key] || key;
        Object.keys(params).forEach(p => {
            text = text.replace(`{${p}}`, params[p]);
        });
        return text;
    }

    function setLanguage(lang) {
        if (lang !== 'en' && lang !== 'ar') return;
        currentLang = lang;
        localStorage.setItem('nn-lang', lang);
        
        // Update DOM direction and lang
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Update static translations
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.innerHTML = t(key);
        });
        
        // Re-render NeuralApp if initialized
        if (window.NeuralApp && window.NeuralApp.reRender) {
            window.NeuralApp.reRender();
        }
    }

    function getLanguage() {
        return currentLang;
    }

    function toggleLanguage() {
        setLanguage(currentLang === 'en' ? 'ar' : 'en');
    }

    return {
        t,
        setLanguage,
        getLanguage,
        toggleLanguage
    };
})();
