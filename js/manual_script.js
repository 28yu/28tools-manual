// 既存のJavaScriptに以下を追加

// 言語切り替え機能
class LanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('28tools-language') || 'ja';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setLanguage(this.currentLang);
        this.updateUI();
    }

    setupEventListeners() {
        const languageBtn = document.getElementById('languageBtn');
        const languageDropdown = document.getElementById('languageDropdown');
        const languageOptions = document.querySelectorAll('.language-option');

        // ボタンクリックでドロップダウン表示/非表示
        languageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });

        // 言語選択
        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const lang = option.getAttribute('data-lang');
                this.setLanguage(lang);
                this.hideDropdown();
            });
        });

        // 外部クリックでドロップダウンを閉じる
        document.addEventListener('click', () => {
            this.hideDropdown();
        });

        // ESCキーでドロップダウンを閉じる
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideDropdown();
            }
        });
    }

    toggleDropdown() {
        const dropdown = document.getElementById('languageDropdown');
        const btn = document.getElementById('languageBtn');
        
        if (dropdown.classList.contains('show')) {
            this.hideDropdown();
        } else {
            this.showDropdown();
        }
    }

    showDropdown() {
        const dropdown = document.getElementById('languageDropdown');
        const btn = document.getElementById('languageBtn');
        
        dropdown.classList.add('show');
        btn.classList.add('active');
    }

    hideDropdown() {
        const dropdown = document.getElementById('languageDropdown');
        const btn = document.getElementById('languageBtn');
        
        dropdown.classList.remove('show');
        btn.classList.remove('active');
    }

    setLanguage(lang) {
        if (lang !== 'ja' && lang !== 'en') return;
        
        // アニメーション開始
        document.body.classList.add('language-switching');
        
        setTimeout(() => {
            this.currentLang = lang;
            localStorage.setItem('28tools-language', lang);
            
            // HTML lang属性を更新
            document.documentElement.lang = lang;
            
            // 全ての多言語要素を更新
            this.updateAllElements();
            
            // UIを更新
            this.updateUI();
            
            // アニメーション終了
            document.body.classList.remove('language-switching');
        }, 150);
    }

    updateAllElements() {
        const elements = document.querySelectorAll('[data-ja][data-en]');
        
        elements.forEach(element => {
            const text = element.getAttribute(`data-${this.currentLang}`);
            if (text) {
                if (element.tagName === 'TITLE') {
                    document.title = text;
                } else if (element.hasAttribute('content')) {
                    element.setAttribute('content', text);
                } else {
                    element.textContent = text;
                }
            }
        });
    }

    updateUI() {
        // 言語ボタンのテキストを更新
        const languageText = document.querySelector('.language-text');
        if (languageText) {
            languageText.textContent = this.currentLang === 'ja' ? '日本語' : 'English';
        }

        // チェックマークを更新
        const checkJa = document.getElementById('checkJa');
        const checkEn = document.getElementById('checkEn');
        
        if (checkJa && checkEn) {
            checkJa.classList.toggle('visible', this.currentLang === 'ja');
            checkEn.classList.toggle('visible', this.currentLang === 'en');
        }
    }
}

// 既存のDOMContentLoadedイベントリスナーに追加
document.addEventListener('DOMContentLoaded', function() {
    // 既存の機能
    setupSmoothScroll();
        // 言語切り替え機能を初期化
    new LanguageSwitcher();
});

// 既存のスムーススクロール機能（多言語対応版）
function setupSmoothScroll() {
    const featureCards = document.querySelectorAll('.feature-card.clickable');
    
    featureCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // スムーススクロール
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // ハイライト効果
                targetElement.style.backgroundColor = '#e3f2fd';
                setTimeout(() => {
                    targetElement.style.backgroundColor = '';
                }, 2000);
            }
        });
    });
}

// キーボードアクセシビリティ対応
document.addEventListener('keydown', function(e) {
    // Alt + L で言語切り替え
    if (e.altKey && e.key === 'l') {
        e.preventDefault();
        const languageBtn = document.getElementById('languageBtn');
        if (languageBtn) {
            languageBtn.click();
        }
    }
});

// 言語検出機能（初回訪問時）
function detectBrowserLanguage() {
    const savedLang = localStorage.getItem('28tools-language');
    if (savedLang) return savedLang;
    
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith('en') ? 'en' : 'ja';
}

// 既存のLanguageSwitcherクラスに以下のメソッドを追加

class LanguageSwitcher {
    constructor() {
        // 既存のコンストラクタ内容...
        
        // タブ機能の初期化を追加
        this.initTabs();
    }

    // 既存のメソッド...

    // タブ機能の初期化
    initTabs() {
        const tabs = document.querySelectorAll('.info-tab');
        const contents = document.querySelectorAll('.info-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.getAttribute('data-tab');
                
                // 全てのタブとコンテンツから active クラスを削除
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                
                // クリックされたタブとそのコンテンツに active クラスを追加
                tab.classList.add('active');
                document.getElementById(`${targetTab}-content`).classList.add('active');
            });
        });
    }

    // 言語切り替え時にタブテキストも更新
    setLanguage(lang) {
        // 既存の言語切り替え処理...
        
        // タブのテキストも更新
        const tabs = document.querySelectorAll('.info-tab[data-ja][data-en]');
        tabs.forEach(tab => {
            const text = tab.getAttribute(`data-${lang}`);
            if (text) {
                tab.textContent = text;
            }
        });
        
        // 既存の要素更新処理...
        const elements = document.querySelectorAll('[data-ja][data-en]');
        elements.forEach(element => {
            if (!element.classList.contains('info-tab')) { // タブは既に処理済み
                const text = element.getAttribute(`data-${lang}`);
                if (text) {
                    if (element.tagName === 'TITLE') {
                        document.title = text;
                    } else {
                        element.textContent = text;
                    }
                }
            }
        });
        
        // 既存の処理...
    }
}

// 既存のDOMContentLoaded処理に追加
document.addEventListener('DOMContentLoaded', function() {
    // 既存の初期化処理...
    
    // 言語切り替え機能の初期化（タブ機能も含む）
    const languageSwitcher = new LanguageSwitcher();
    
    // 既存のスムーススクロール処理...
});

// scrollToSection関数も既存のまま維持
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}
