// public/js/translate.js
class TranslationManager {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLanguage') || 'ar';
        this.translations = {
            ar: { dir: 'rtl', name: 'العربية' },
            en: { dir: 'ltr', name: 'English' },
            zh: { dir: 'ltr', name: '中文' },
            ja: { dir: 'ltr', name: '日本語' },
            de: { dir: 'ltr', name: 'Deutsch' },
            fr: { dir: 'ltr', name: 'Français' },
            es: { dir: 'ltr', name: 'Español' }
        };
    }
    
    init() {
        this.setupLanguageDropdown();
        this.applySavedLanguage();
    }
    
    setupLanguageDropdown() {
        const btn = document.getElementById('languageBtn');
        const dropdown = document.getElementById('languageDropdown');
        
        if (btn && dropdown) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('show');
            });
            
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.language-selector')) {
                    dropdown.classList.remove('show');
                }
            });
            
            dropdown.querySelectorAll('.lang-option').forEach(option => {
                option.addEventListener('click', () => {
                    const langCode = option.dataset.lang;
                    const langName = option.querySelector('span:last-child').textContent;
                    this.changeLanguage(langCode, langName);
                });
            });
        }
    }
    
    changeLanguage(langCode, langName) {
        this.currentLang = langCode;
        
        // تحديث الزر
        const currentLangSpan = document.querySelector('.current-lang');
        if (currentLangSpan) {
            currentLangSpan.textContent = langName;
        }
        
        // تحديث اتجاه الصفحة
        document.documentElement.dir = this.translations[langCode].dir;
        document.documentElement.lang = langCode;
        
        // حفظ التفضيل
        localStorage.setItem('preferredLanguage', langCode);
        localStorage.setItem('preferredLanguageName', langName);
        
        // إغلاق القائمة
        document.getElementById('languageDropdown')?.classList.remove('show');
        
        // تحديث العناصر النشطة
        this.updateActiveLanguage();
        
        // إرسال حدث لتحديث الترجمة
        window.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { lang: langCode } 
        }));
    }
    
    updateActiveLanguage() {
        const langOptions = document.querySelectorAll('.lang-option');
        langOptions.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.lang === this.currentLang) {
                option.classList.add('active');
            }
        });
    }
    
    applySavedLanguage() {
        const savedLang = localStorage.getItem('preferredLanguage') || 'ar';
        const savedLangName = localStorage.getItem('preferredLanguageName') || 'العربية';
        this.changeLanguage(savedLang, savedLangName);
    }
}

// تهيئة مدير الترجمة
const translationManager = new TranslationManager();
document.addEventListener('DOMContentLoaded', () => translationManager.init());