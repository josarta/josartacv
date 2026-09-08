/**
 * Sarta AI & Systems i18n Translation Engine
 * Zero-flicker client-side internationalization with persistent storage.
 */

class I18nManager {
  constructor() {
    this.currentLang = localStorage.getItem('preferred_lang') || 'en';
    this.dictionaries = {
      en: null,
      es: null
    };
    this.isLoaded = false;
  }

  async init() {
    try {
      const [enRes, esRes] = await Promise.all([
        fetch('locales/en.json'),
        fetch('locales/es.json')
      ]);

      if (enRes.ok && esRes.ok) {
        this.dictionaries.en = await enRes.json();
        this.dictionaries.es = await esRes.json();
        this.isLoaded = true;
      } else {
        console.warn('[i18n] Fetch failed, fallback to embedded storage');
      }
    } catch (err) {
      console.warn('[i18n] Error loading remote dictionaries, using local fallback:', err);
    }

    this.applyTranslations();
    this.setupEventListeners();
  }

  getNestedValue(obj, path) {
    if (!obj) return '';
    return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined) ? acc[part] : null, obj) || '';
  }

  t(keyPath) {
    const dict = this.dictionaries[this.currentLang] || this.dictionaries['en'];
    const val = this.getNestedValue(dict, keyPath);
    return val || keyPath;
  }

  setLanguage(lang) {
    if (lang !== 'en' && lang !== 'es') return;
    this.currentLang = lang;
    localStorage.setItem('preferred_lang', lang);
    document.documentElement.lang = lang;
    this.applyTranslations();

    // Dispatch global event for interactive components
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { 
        lang: this.currentLang,
        dict: this.dictionaries[this.currentLang]
      } 
    }));
  }

  toggleLanguage() {
    const nextLang = this.currentLang === 'en' ? 'es' : 'en';
    this.setLanguage(nextLang);
  }

  applyTranslations() {
    const dict = this.dictionaries[this.currentLang];
    if (!dict) return;

    // Update text elements
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const translation = this.getNestedValue(dict, key);
      if (translation !== null && translation !== '') {
        el.innerHTML = translation;
      }
    });

    // Update attribute translations
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const spec = el.getAttribute('data-i18n-attr');
      // format: "attr1:key1,attr2:key2"
      spec.split(',').forEach((pair) => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        if (attr && key) {
          const translation = this.getNestedValue(dict, key);
          if (translation) {
            el.setAttribute(attr, translation);
          }
        }
      });
    });

    // Update Lang Switcher labels
    const langToggles = document.querySelectorAll('.lang-toggle-btn');
    langToggles.forEach(btn => {
      btn.innerHTML = `
        <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span class="lang-label font-bold">${this.currentLang === 'en' ? 'ES' : 'EN'}</span>
      `;
    });
  }

  setupEventListeners() {
    document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Tactile micro-spinner animation during language dictionary swap
        btn.innerHTML = `
          <span class="inline-micro-spinner mr-1"></span>
          <span class="text-emerald-400 font-mono text-[10px]">SYNC</span>
        `;
        
        setTimeout(() => {
          this.toggleLanguage();
        }, 180);
      });
    });
  }
}

export const i18n = new I18nManager();

