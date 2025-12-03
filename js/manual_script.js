// 言語切り替え機能
class LanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('28tools-language') || 'ja';
        this.isInitialized = false;
        this.init();
        this.initTabs();
        this.initFunctionCards();
    }

    init() {
        try {
            // DOM要素の取得
            this.languageBtn = document.getElementById('languageBtn');
            this.languageDropdown = document.getElementById('languageDropdown');
            this.checkJa = document.getElementById('checkJa');
            this.checkEn = document.getElementById('checkEn');

            // 要素が存在しない場合の処理
            if (!this.languageBtn || !this.languageDropdown) {
                console.warn('Language switcher elements not found');
                return;
            }

            // 初期言語設定
            this.setLanguage(this.currentLang);
            this.updateUI();

            // イベントリスナーの設定
            this.setupEventListeners();

            // キーボードショートカット
            this.setupKeyboardShortcuts();

            this.isInitialized = true;
            console.log('LanguageSwitcher initialized successfully');
        } catch (error) {
            console.error('LanguageSwitcher initialization error:', error);
        }
    }

    setupEventListeners() {
        // 言語ボタンクリック
        this.languageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });

        // 言語オプション選択
        const languageOptions = document.querySelectorAll('.language-option');
        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const lang = option.getAttribute('data-lang');
                if (lang && lang !== this.currentLang) {
                    this.setLanguage(lang);
                    this.hideDropdown();
                }
            });

            // キーボードナビゲーション
            option.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    option.click();
                }
            });
        });

        // ドロップダウン外クリックで閉じる
        document.addEventListener('click', (e) => {
            if (!this.languageDropdown.contains(e.target) && !this.languageBtn.contains(e.target)) {
                this.hideDropdown();
            }
        });

        // ドロップダウン内クリックで閉じない
        this.languageDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Alt + L で言語切り替え
            if (e.altKey && e.key.toLowerCase() === 'l') {
                e.preventDefault();
                const newLang = this.currentLang === 'ja' ? 'en' : 'ja';
                this.setLanguage(newLang);
            }

            // Escape でドロップダウンを閉じる
            if (e.key === 'Escape') {
                this.hideDropdown();
            }

            // Tab でドロップダウン内ナビゲーション
            if (e.key === 'Tab' && this.languageDropdown.classList.contains('show')) {
                const focusableElements = this.languageDropdown.querySelectorAll('.language-option');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        this.languageBtn.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        this.hideDropdown();
                    }
                }
            }
        });
    }

    toggleDropdown() {
        const isVisible = this.languageDropdown.classList.contains('show');
        if (isVisible) {
            this.hideDropdown();
        } else {
            this.showDropdown();
        }
    }

    showDropdown() {
        this.languageDropdown.classList.add('show');
        this.languageBtn.classList.add('active');
        
        // フォーカスを最初のオプションに移動
        setTimeout(() => {
            const firstOption = this.languageDropdown.querySelector('.language-option');
            if (firstOption) {
                firstOption.focus();
            }
        }, 100);
    }

    hideDropdown() {
        this.languageDropdown.classList.remove('show');
        this.languageBtn.classList.remove('active');
    }

    setLanguage(lang) {
        if (!lang || (lang !== 'ja' && lang !== 'en')) {
            console.warn('Invalid language:', lang);
            return;
        }

        const oldLang = this.currentLang;
        this.currentLang = lang;
        
        try {
            localStorage.setItem('28tools-language', lang);
        } catch (error) {
            console.warn('Could not save language preference:', error);
        }

        // HTML lang属性を更新
        document.documentElement.lang = lang;

        // タイトルを更新
        this.updateTitle(lang);

        // meta descriptionを更新
        this.updateMetaDescription(lang);

        // タブのテキストを更新
        this.updateTabs(lang);

        // 全ての多言語要素を更新
        this.updateAllElements(lang);

        // UIを更新
        this.updateUI();

        // カスタムイベントを発火
        this.dispatchLanguageChangeEvent(oldLang, lang);

        console.log(`Language changed from ${oldLang} to ${lang}`);
    }

    updateTitle(lang) {
        const titleElement = document.querySelector('title[data-ja][data-en]');
        if (titleElement) {
            const titleText = titleElement.getAttribute(`data-${lang}`);
            if (titleText) {
                document.title = titleText;
            }
        }
    }

    updateMetaDescription(lang) {
        const metaDesc = document.querySelector('meta[name="description"][data-ja][data-en]');
        if (metaDesc) {
            const descText = metaDesc.getAttribute(`data-${lang}`);
            if (descText) {
                metaDesc.setAttribute('content', descText);
            }
        }
    }

    updateTabs(lang) {
        const tabs = document.querySelectorAll('.info-tab[data-ja][data-en]');
        tabs.forEach(tab => {
            const text = tab.getAttribute(`data-${lang}`);
            if (text) {
                tab.textContent = text;
            }
        });
    }

    updateAllElements(lang) {
        const elements = document.querySelectorAll('[data-ja][data-en]');
        elements.forEach(element => {
            // 既に処理済みの要素をスキップ
            if (element.classList.contains('info-tab') || 
                element.tagName === 'TITLE' || 
                element.tagName === 'META') {
                return;
            }

            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                // HTMLコンテンツかテキストコンテンツかを判定
                if (text.includes('<') && text.includes('>')) {
                    element.innerHTML = text;
                } else {
                    element.textContent = text;
                }
            }
        });
    }

    updateUI() {
        // 言語ボタンのテキストを更新
        const languageText = this.languageBtn?.querySelector('.language-text');
        if (languageText) {
            languageText.textContent = this.currentLang === 'ja' ? '日本語' : 'English';
        }

        // チェックマークを更新
        if (this.checkJa && this.checkEn) {
            this.checkJa.textContent = this.currentLang === 'ja' ? '✓' : '';
            this.checkEn.textContent = this.currentLang === 'en' ? '✓' : '';
        }
    }

    dispatchLanguageChangeEvent(oldLang, newLang) {
        const event = new CustomEvent('languageChange', {
            detail: { oldLang, newLang }
        });
        document.dispatchEvent(event);
    }

    // タブ機能の初期化
    initTabs() {
        const tabs = document.querySelectorAll('.info-tab');
        const contents = document.querySelectorAll('.info-content');

        if (tabs.length === 0 || contents.length === 0) {
            console.warn('Tab elements not found');
            return;
        }

        tabs.forEach((tab, index) => {
            // クリックイベント
            tab.addEventListener('click', () => {
                this.switchTab(tab, tabs, contents);
            });

            // キーボードナビゲーション
            tab.addEventListener('keydown', (e) => {
                this.handleTabKeydown(e, tab, tabs, index);
            });

            // 初期のARIA属性を設定
            this.setupTabAria(tab, index, tabs.length);
        });

        // タブリストのARIA属性を設定
        const tabList = document.querySelector('.info-tabs');
        if (tabList) {
            tabList.setAttribute('role', 'tablist');
            tabList.setAttribute('aria-label', 'Information tabs');
        }

        // タブパネルのARIA属性を設定
        contents.forEach((content, index) => {
            content.setAttribute('role', 'tabpanel');
            content.setAttribute('aria-labelledby', tabs[index]?.id || `tab-${index}`);
            content.setAttribute('tabindex', '0');
        });

        console.log('Tabs initialized successfully');
    }

    switchTab(activeTab, allTabs, allContents) {
        const targetTab = activeTab.getAttribute('data-tab');
        
        // 全てのタブを非アクティブに
        allTabs.forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
            tab.setAttribute('tabindex', '-1');
        });
        
        // 全てのコンテンツを非表示に
        allContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // アクティブなタブとコンテンツを設定
        activeTab.classList.add('active');
        activeTab.setAttribute('aria-selected', 'true');
        activeTab.setAttribute('tabindex', '0');
        
        const targetContent = document.getElementById(`${targetTab}-content`);
        if (targetContent) {
            targetContent.classList.add('active');
            
            // フォーカス管理
            setTimeout(() => {
                targetContent.focus();
            }, 100);
        }

        // カスタムイベントを発火
        const event = new CustomEvent('tabChange', {
            detail: { activeTab: targetTab }
        });
        document.dispatchEvent(event);
    }

    handleTabKeydown(e, tab, allTabs, currentIndex) {
        let targetIndex = currentIndex;

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                targetIndex = currentIndex > 0 ? currentIndex - 1 : allTabs.length - 1;
                break;
            case 'ArrowRight':
                e.preventDefault();
                targetIndex = currentIndex < allTabs.length - 1 ? currentIndex + 1 : 0;
                break;
            case 'Home':
                e.preventDefault();
                targetIndex = 0;
                break;
            case 'End':
                e.preventDefault();
                targetIndex = allTabs.length - 1;
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                tab.click();
                return;
        }

        if (targetIndex !== currentIndex) {
            allTabs[targetIndex].focus();
        }
    }

    setupTabAria(tab, index, totalTabs) {
        if (!tab.id) {
            tab.id = `tab-${index}`;
        }
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
        tab.setAttribute('aria-setsize', totalTabs.toString());
        tab.setAttribute('aria-posinset', (index + 1).toString());
    }

    // 機能カードのクリック処理を初期化
    initFunctionCards() {
        // data-section属性を持つ機能カードの処理
        const functionCards = document.querySelectorAll('.function-card[data-section]');
        functionCards.forEach((card, index) => {
            const sectionId = card.getAttribute('data-section');
            if (sectionId) {
                this.setupFunctionCard(card, sectionId, index);
            }
        });

        // 既存のonclick属性を持つカードの処理（後方互換性）
        const functionCardsOnclick = document.querySelectorAll('.function-card[onclick]');
        functionCardsOnclick.forEach((card, index) => {
            const onclickValue = card.getAttribute('onclick');
            card.removeAttribute('onclick');
            
            if (onclickValue) {
                const sectionMatch = onclickValue.match(/scrollToSection\('([^']+)'\)/);
                if (sectionMatch && sectionMatch[1]) {
                    this.setupFunctionCard(card, sectionMatch[1], index);
                }
            }
        });

        console.log(`Function cards initialized: ${functionCards.length + functionCardsOnclick.length} cards`);
    }

    setupFunctionCard(card, sectionId, index) {
        // クリックイベント
        card.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleCardClick(card, sectionId);
        });

        // キーボードアクセシビリティ
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-describedby', `card-desc-${index}`);
        
        // 説明用の隠し要素を追加
        const description = card.querySelector('.function-info p');
        if (description && !description.id) {
            description.id = `card-desc-${index}`;
        }

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.handleCardClick(card, sectionId);
            }
        });

        // ホバー効果の強化
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-2px)';
        });

        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('highlight')) {
                card.style.transform = '';
            }
        });
    }

    handleCardClick(card, sectionId) {
        // カードにハイライト効果を追加
        card.classList.add('highlight');
        
        // ハイライト効果を一定時間後に削除
        setTimeout(() => {
            card.classList.remove('highlight');
            card.style.transform = '';
        }, 1000);

        // セクションにスクロール
        scrollToSection(sectionId);

        // アナリティクス用のカスタムイベント
        const event = new CustomEvent('cardClick', {
            detail: { sectionId, cardElement: card }
        });
        document.dispatchEvent(event);
    }

    // 公開メソッド
    getCurrentLanguage() {
        return this.currentLang;
    }

    isReady() {
        return this.isInitialized;
    }

    // 言語を強制的に設定（外部から呼び出し可能）
    forceSetLanguage(lang) {
        if (lang === 'ja' || lang === 'en') {
            this.setLanguage(lang);
            return true;
        }
        return false;
    }
}

// スムーススクロール機能（改良版）
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (!element) {
        console.warn(`Section with id "${sectionId}" not found`);
        return;
    }

    try {
        // 機能一覧タブがアクティブでない場合は切り替える
        const functionsTab = document.querySelector('.info-tab[data-tab="functions"]');
        const functionsContent = document.getElementById('functions-content');
        
        if (functionsTab && functionsContent && !functionsContent.classList.contains('active')) {
            // 全てのタブを非アクティブに
            document.querySelectorAll('.info-tab').forEach(tab => {
                tab.classList.remove('active');
                tab.setAttribute('aria-selected', 'false');
                tab.setAttribute('tabindex', '-1');
            });
            document.querySelectorAll('.info-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // 機能一覧タブをアクティブに
            functionsTab.classList.add('active');
            functionsTab.setAttribute('aria-selected', 'true');
            functionsTab.setAttribute('tabindex', '0');
            functionsContent.classList.add('active');
        }

        // スクロール実行
        setTimeout(() => {
            const headerOffset = 120; // ヘッダー + タブ分のオフセット
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            // スムーススクロールの実行
            if ('scrollBehavior' in document.documentElement.style) {
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            } else {
                // フォールバック: アニメーション付きスクロール
                smoothScrollTo(offsetPosition, 500);
            }

            // フォーカス管理
            setTimeout(() => {
                element.focus();
                element.scrollIntoView({ block: 'nearest' });
            }, 600);

        }, 150); // タブ切り替えアニメーション完了後

    } catch (error) {
        console.error('Error in scrollToSection:', error);
        // フォールバック: 通常のスクロール
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// スムーススクロールのポリフィル
function smoothScrollTo(targetPosition, duration = 500) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// 画像読み込みエラー処理
function handleImageError() {
    const images = document.querySelectorAll('img[onerror]');
    images.forEach(img => {
        if (!img.complete || img.naturalHeight === 0) {
            const fallback = img.nextElementSibling;
            if (fallback && fallback.classList.contains('icon-fallback')) {
                img.style.display = 'none';
                fallback.style.display = 'flex';
            }
        }
    });
}

// パフォーマンス最適化：Intersection Observer
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (!images.length) return;

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        images.forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    } else {
        // Intersection Observer未対応の場合は即座に読み込み
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// アクセシビリティ向上：フォーカス管理
function initAccessibility() {
    // スキップリンクの追加
    addSkipLink();
    
    // フォーカストラップの設定
    setupFocusTraps();
    
    // キーボードナビゲーションの強化
    enhanceKeyboardNavigation();
    
    // ARIA属性の動的更新
    updateAriaAttributes();
}

function addSkipLink() {
    const existingSkipLink = document.querySelector('.skip-link');
    if (existingSkipLink) return;

    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'メインコンテンツにスキップ';
    skipLink.className = 'skip-link';
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // メインコンテンツにIDを追加
    const container = document.querySelector('.container');
    if (container && !container.id) {
        container.id = 'main-content';
    }
}

function setupFocusTraps() {
    // 言語ドロップダウンのフォーカストラップ
    const languageDropdown = document.getElementById('languageDropdown');
    if (languageDropdown) {
        trapFocus(languageDropdown);
    }
}

function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

function enhanceKeyboardNavigation() {
    // Escapeキーでモーダルやドロップダウンを閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // 言語ドロップダウンを閉じる
            const languageDropdown = document.getElementById('languageDropdown');
            if (languageDropdown && languageDropdown.classList.contains('show')) {
                const languageBtn = document.getElementById('languageBtn');
                if (languageBtn) {
                    languageBtn.click();
                    languageBtn.focus();
                }
            }
        }
    });
}

function updateAriaAttributes() {
    // 動的に生成される要素のARIA属性を更新
    const functionCards = document.querySelectorAll('.function-card');
    functionCards.forEach((card, index) => {
        if (!card.getAttribute('aria-label')) {
            const title = card.querySelector('h3');
            const description = card.querySelector('p');
            if (title && description) {
                card.setAttribute('aria-label', `${title.textContent}: ${description.textContent}`);
            }
        }
    });
}

// エラーハンドリング
function initErrorHandling() {
    // 画像読み込みエラーの処理
    document.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG') {
            const img = e.target;
            const fallback = img.nextElementSibling;
            if (fallback && fallback.classList.contains('icon-fallback')) {
                img.style.display = 'none';
                fallback.style.display = 'flex';
            }
        }
    }, true);

    // JavaScript エラーの処理
    window.addEventListener('error', (e) => {
        console.error('JavaScript Error:', {
            message: e.message,
            filename: e.filename,
            lineno: e.lineno,
            colno: e.colno,
            error: e.error
        });
        
        // 本番環境では適切なエラー報告サービスに送信
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: e.message,
                fatal: false
            });
        }
    });

    // Promise rejection の処理
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled Promise Rejection:', e.reason);
        
        // 本番環境では適切なエラー報告サービスに送信
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: `Unhandled Promise: ${e.reason}`,
                fatal: false
            });
        }
    });
}

// パフォーマンス監視
function initPerformanceMonitoring() {
    if (!('performance' in window)) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            try {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    const metrics = {
                        'DOM Content Loaded': Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                        'Load Complete': Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                        'Total Load Time': Math.round(perfData.loadEventEnd - perfData.fetchStart),
                        'DNS Lookup': Math.round(perfData.domainLookupEnd - perfData.domainLookupStart),
                        'TCP Connection': Math.round(perfData.connectEnd - perfData.connectStart),
                        'Server Response': Math.round(perfData.responseEnd - perfData.requestStart)
                    };
                    
                    console.log('Page Load Performance:', metrics);
                    
                    // Core Web Vitals
                    measureCoreWebVitals();
                }
            } catch (error) {
                console.warn('Performance monitoring error:', error);
            }
        }, 0);
    });
}

function measureCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
        try {
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', Math.round(lastEntry.startTime));
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

            // First Input Delay (FID)
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('FID:', Math.round(entry.processingStart - entry.startTime));
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });

            // Cumulative Layout Shift (CLS)
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                console.log('CLS:', clsValue);
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });

        } catch (error) {
            console.warn('Core Web Vitals measurement error:', error);
        }
    }
}

// 検索機能（将来の拡張用）
function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = e.target.value.toLowerCase().trim();
            performSearch(query);
        }, 300);
    });

    // 検索結果のハイライト
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = e.target.value.toLowerCase().trim();
            if (query) {
                highlightSearchResults(query);
            }
        }
    });
}

function performSearch(query) {
    const searchableElements = document.querySelectorAll('.function-card, .section, .info-detail');
    
    if (!query) {
        // 検索クエリが空の場合は全て表示
        searchableElements.forEach(el => {
            el.style.display = '';
            removeHighlight(el);
        });
        return;
    }

    let hasResults = false;

    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        const isMatch = text.includes(query);
        
        element.style.display = isMatch ? '' : 'none';
        
        if (isMatch) {
            hasResults = true;
            highlightText(element, query);
        } else {
            removeHighlight(element);
        }
    });

    // 検索結果がない場合の処理
    if (!hasResults) {
        showNoResultsMessage();
    } else {
        hideNoResultsMessage();
    }
}

function highlightSearchResults(query) {
    const firstMatch = document.querySelector('.function-card:not([style*="display: none"]), .section:not([style*="display: none"])');
    if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstMatch.focus();
    }
}

function highlightText(element, query) {
    // 既存のハイライトを削除
    removeHighlight(element);
    
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    let node;
    
    while (node = walker.nextNode()) {
        if (node.nodeValue.toLowerCase().includes(query)) {
            textNodes.push(node);
        }
    }
    
    textNodes.forEach(textNode => {
        const parent = textNode.parentNode;
        const text = textNode.nodeValue;
        const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
        const highlightedText = text.replace(regex, '<mark class="search-highlight">$1</mark>');
        
        if (highlightedText !== text) {
            const span = document.createElement('span');
            span.innerHTML = highlightedText;
            span.className = 'search-highlighted-content';
            parent.replaceChild(span, textNode);
        }
    });
}

function removeHighlight(element) {
    const highlights = element.querySelectorAll('.search-highlighted-content');
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize();
    });
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function showNoResultsMessage() {
    let noResultsEl = document.getElementById('no-search-results');
    if (!noResultsEl) {
        noResultsEl = document.createElement('div');
        noResultsEl.id = 'no-search-results';
        noResultsEl.className = 'no-results-message';
        noResultsEl.innerHTML = `
            <div class="no-results-content">
                <h3>検索結果が見つかりません</h3>
                <p>別のキーワードで検索してみてください。</p>
            </div>
        `;
        document.querySelector('.info-content.active').appendChild(noResultsEl);
    }
    noResultsEl.style.display = 'block';
}

function hideNoResultsMessage() {
    const noResultsEl = document.getElementById('no-search-results');
    if (noResultsEl) {
        noResultsEl.style.display = 'none';
    }
}

// ダークモード対応（将来の拡張用）
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!darkModeToggle) return;

    const isDarkMode = localStorage.getItem('28tools-dark-mode') === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        updateDarkModeToggle(true);
    }

    darkModeToggle.addEventListener('click', () => {
        const isNowDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('28tools-dark-mode', isNowDark);
        updateDarkModeToggle(isNowDark);
        
        // カスタムイベントを発火
        const event = new CustomEvent('darkModeChange', {
            detail: { isDark: isNowDark }
        });
        document.dispatchEvent(event);
    });
}

function updateDarkModeToggle(isDark) {
    const toggle = document.getElementById('dark-mode-toggle');
    if (toggle) {
        toggle.textContent = isDark ? '☀️' : '🌙';
        toggle.setAttribute('aria-label', isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え');
    }
}

// 印刷対応
function initPrintSupport() {
    // 印刷前の処理
    window.addEventListener('beforeprint', () => {
        // 全てのタブコンテンツを表示
        document.querySelectorAll('.info-content').forEach(content => {
            content.style.display = 'block';
        });
        
        // 言語ドロップダウンを閉じる
        const languageDropdown = document.getElementById('languageDropdown');
        if (languageDropdown) {
            languageDropdown.classList.remove('show');
        }
        
        // 検索ハイライトを削除
        document.querySelectorAll('.search-highlighted-content').forEach(el => {
            removeHighlight(el.parentElement);
        });
        
        console.log('Preparing for print...');
    });

    // 印刷後の処理
    window.addEventListener('afterprint', () => {
        // 元の表示状態に戻す
        document.querySelectorAll('.info-content').forEach(content => {
            if (!content.classList.contains('active')) {
                content.style.display = 'none';
            }
        });
        
        console.log('Print completed, restored normal view');
    });

    // 印刷ボタンがある場合の処理
    const printBtn = document.getElementById('print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
}

// 外部リンクの処理
function initExternalLinks() {
    const links = document.querySelectorAll('a[href^="http"]');
    
    links.forEach(link => {
        // 外部リンクの判定
        const isExternal = !link.hostname.includes('28yu.github.io') && 
                          !link.hostname.includes('localhost') &&
                          link.hostname !== window.location.hostname;
        
        if (isExternal) {
            // 外部リンクの設定
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            
            // 外部リンクアイコンを追加
            if (!link.querySelector('.external-link-icon')) {
                const icon = document.createElement('span');
                icon.className = 'external-link-icon';
                icon.textContent = ' ↗';
                icon.style.fontSize = '0.8em';
                icon.setAttribute('aria-label', '外部リンク');
                link.appendChild(icon);
            }
            
            // 警告メッセージ（オプション）
            link.addEventListener('click', (e) => {
                const shouldWarn = link.getAttribute('data-warn-external') === 'true';
                if (shouldWarn) {
                    const confirmed = confirm('外部サイトに移動します。よろしいですか？');
                    if (!confirmed) {
                        e.preventDefault();
                    }
                }
            });
        }
    });
}

// アニメーション制御
function initAnimations() {
    // ユーザーのアニメーション設定を確認
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function updateAnimations(mediaQuery) {
        if (mediaQuery.matches) {
            document.documentElement.style.setProperty('--animation-duration', '0s');
            document.documentElement.style.setProperty('--transition-duration', '0s');
            document.body.classList.add('reduce-motion');
        } else {
            document.documentElement.style.removeProperty('--animation-duration');
            document.documentElement.style.removeProperty('--transition-duration');
            document.body.classList.remove('reduce-motion');
        }
    }
    
    // 初期設定
    updateAnimations(prefersReducedMotion);
    
    // 設定変更の監視
    prefersReducedMotion.addEventListener('change', updateAnimations);
}

// Intersection Observerを使用したアニメーション
function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;
    
    const animatedElements = document.querySelectorAll('.function-card, .section, .info-detail');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });
}

// ツールチップ機能
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        let tooltip = null;
        
        element.addEventListener('mouseenter', () => {
            tooltip = createTooltip(element.getAttribute('data-tooltip'));
            document.body.appendChild(tooltip);
            positionTooltip(element, tooltip);
        });
        
        element.addEventListener('mouseleave', () => {
            if (tooltip) {
                tooltip.remove();
                tooltip = null;
            }
        });
        
        element.addEventListener('focus', () => {
            if (!tooltip) {
                tooltip = createTooltip(element.getAttribute('data-tooltip'));
                document.body.appendChild(tooltip);
                positionTooltip(element, tooltip);
            }
        });
        
        element.addEventListener('blur', () => {
            if (tooltip) {
                tooltip.remove();
                tooltip = null;
            }
        });
    });
}

function createTooltip(text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip-popup';
    tooltip.textContent = text;
    tooltip.setAttribute('role', 'tooltip');
    return tooltip;
}

function positionTooltip(element, tooltip) {
    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
    let top = rect.top - tooltipRect.height - 8;
    
    // 画面端での調整
    if (left < 8) left = 8;
    if (left + tooltipRect.width > window.innerWidth - 8) {
        left = window.innerWidth - tooltipRect.width - 8;
    }
    if (top < 8) {
        top = rect.bottom + 8;
    }
    
    tooltip.style.left = `${left + window.scrollX}px`;
    tooltip.style.top = `${top + window.scrollY}px`;
}

// フォーム検証（将来の拡張用）
function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
            }
        });
        
        // リアルタイム検証
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    });
}

function validateForm(form) {
    const fields = form.querySelectorAll('[required], [data-validate]');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    
    // 必須チェック
    if (required && !value) {
        showFieldError(field, 'この項目は必須です');
        return false;
    }
    
    // タイプ別検証
    if (value) {
        switch (type) {
            case 'email':
                if (!isValidEmail(value)) {
                    showFieldError(field, '有効なメールアドレスを入力してください');
                    return false;
                }
                break;
            case 'url':
                if (!isValidUrl(value)) {
                    showFieldError(field, '有効なURLを入力してください');
                    return false;
                }
                break;
        }
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error-state');
    
    let errorEl = field.parentNode.querySelector('.error-message');
    if (!errorEl) {
        errorEl = document.createElement('div');
        errorEl.className = 'error-message';
        field.parentNode.appendChild(errorEl);
    }
    errorEl.textContent = message;
}

function clearFieldError(field) {
    field.classList.remove('error-state');
    const errorEl = field.parentNode.querySelector('.error-message');
    if (errorEl) {
        errorEl.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// ローカルストレージ管理
class StorageManager {
    constructor(prefix = '28tools-') {
        this.prefix = prefix;
    }
    
    set(key, value) {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(this.prefix + key, serializedValue);
            return true;
        } catch (error) {
            console.warn('Storage set error:', error);
            return false;
        }
    }
    
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(this.prefix + key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.warn('Storage get error:', error);
            return defaultValue;
        }
    }
    
    remove(key) {
        try {
            localStorage.removeItem(this.prefix + key);
            return true;
        } catch (error) {
            console.warn('Storage remove error:', error);
            return false;
        }
    }
    
    clear() {
        try {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(this.prefix)) {
                    localStorage.removeItem(key);
                }
            });
            return true;
        } catch (error) {
            console.warn('Storage clear error:', error);
            return false;
        }
    }
}

// アナリティクス（将来の拡張用）
function initAnalytics() {
    // Google Analytics 4の設定例
    if (typeof gtag !== 'undefined') {
        // ページビュー
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: document.title,
            page_location: window.location.href
        });
        
        // カスタムイベントの設定
        document.addEventListener('cardClick', (e) => {
            gtag('event', 'card_click', {
                section_id: e.detail.sectionId,
                event_category: 'engagement'
            });
        });
        
        document.addEventListener('tabChange', (e) => {
            gtag('event', 'tab_change', {
                tab_name: e.detail.activeTab,
                event_category: 'navigation'
            });
        });
        
        document.addEventListener('languageChange', (e) => {
            gtag('event', 'language_change', {
                old_language: e.detail.oldLang,
                new_language: e.detail.newLang,
                event_category: 'localization'
            });
        });
    }
}

// サービスワーカー登録（PWA対応・将来の拡張用）
function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                    
                    // 更新チェック
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                showUpdateNotification();
                            }
                        });
                    });
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
        <div class="update-content">
            <span>新しいバージョンが利用可能です</span>
            <button onclick="window.location.reload()">更新</button>
            <button onclick="this.parentElement.parentElement.remove()">後で</button>
        </div>
    `;
    document.body.appendChild(notification);
}

// メイン初期化関数
function initializeApp() {
    try {
        console.log('Initializing 28 Tools Manual...');
        
        // コア機能の初期化
        const languageSwitcher = new LanguageSwitcher();
        
        // ストレージマネージャーの初期化
        window.storageManager = new StorageManager();
        
        // その他の機能初期化
        handleImageError();
        initLazyLoading();
        initAccessibility();
        initErrorHandling();
        initPerformanceMonitoring();
        initSearch();
        initDarkMode();
        initPrintSupport();
        initExternalLinks();
        initAnimations();
        initScrollAnimations();
        initTooltips();
        initFormValidation();
        initAnalytics();
        
        // PWA機能（コメントアウト - 必要に応じて有効化）
        // initServiceWorker();
        
        // 初期化完了のイベント
        const event = new CustomEvent('appInitialized', {
            detail: { timestamp: Date.now() }
        });
        document.dispatchEvent(event);
        
        console.log('28 Tools Manual initialized successfully');
        
    } catch (error) {
        console.error('Initialization error:', error);
        
        // フォールバック: 基本機能のみ初期化
        try {
            new LanguageSwitcher();
            handleImageError();
            console.log('Fallback initialization completed');
        } catch (fallbackError) {
            console.error('Fallback initialization failed:', fallbackError);
        }
    }
}

// DOM読み込み完了後に初期化実行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// ページ表示時の処理（戻るボタン対応）
window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
        // ページがキャッシュから復元された場合の処理
        handleImageError();
        console.log('Page restored from cache');
    }
});

// リサイズ対応
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // リサイズ後の処理
        const event = new CustomEvent('windowResize', {
            detail: { 
                width: window.innerWidth, 
                height: window.innerHeight 
            }
        });
        document.dispatchEvent(event);
    }, 250);
});

// ページ離脱時の処理
window.addEventListener('beforeunload', (e) => {
    // 必要に応じてデータの保存など
    console.log('Page unloading...');
});

// ユーティリティ関数
const utils = {
    // デバウンス関数
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // スロットル関数
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // 要素の表示状態チェック
    isElementVisible: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // 要素が画面内にあるかチェック
    isInViewport: (element, threshold = 0) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        return (
            rect.top <= windowHeight - threshold &&
            rect.bottom >= threshold &&
            rect.left <= windowWidth - threshold &&
            rect.right >= threshold
        );
    },

    // スムーズスクロール（ポリフィル）
    smoothScrollTo: (element, duration = 500) => {
        const targetPosition = element.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    },

    // 文字列のサニタイズ
    sanitizeString: (str) => {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    // 日付フォーマット
    formatDate: (date, locale = 'ja-JP') => {
        return new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    },

    // 数値フォーマット
    formatNumber: (num, locale = 'ja-JP') => {
        return new Intl.NumberFormat(locale).format(num);
    }
};

// グローバルに公開（デバッグ用）
window.Tools28Manual = {
    utils,
    scrollToSection,
    LanguageSwitcher,
    StorageManager,
    version: '1.0.0',
    
    // デバッグ用メソッド
    debug: {
        getLanguage: () => window.languageSwitcher?.getCurrentLanguage(),
        setLanguage: (lang) => window.languageSwitcher?.forceSetLanguage(lang),
        getStorage: () => window.storageManager,
        clearStorage: () => window.storageManager?.clear(),
        logPerformance: () => {
            if ('performance' in window) {
                console.table(performance.getEntriesByType('navigation')[0]);
            }
        }
    }
};

// 開発環境でのデバッグ情報
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Development mode detected');
    window.addEventListener('load', () => {
        console.log('Available debug methods:', Object.keys(window.Tools28Manual.debug));
    });
}
