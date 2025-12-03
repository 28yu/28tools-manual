// 言語切り替え機能
class LanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('28tools-language') || 'ja';
        this.init();
        this.initTabs();
        this.initFunctionCards();
    }

    init() {
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
                const lang = option.getAttribute('data-lang');
                this.setLanguage(lang);
                this.hideDropdown();
            });
        });

        // ドロップダウン外クリックで閉じる
        document.addEventListener('click', () => {
            this.hideDropdown();
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
    }

    hideDropdown() {
        this.languageDropdown.classList.remove('show');
        this.languageBtn.classList.remove('active');
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('28tools-language', lang);

        // HTML lang属性を更新
        document.documentElement.lang = lang;

        // タイトルを更新
        const titleElement = document.querySelector('title[data-ja][data-en]');
        if (titleElement) {
            const titleText = titleElement.getAttribute(`data-${lang}`);
            if (titleText) {
                document.title = titleText;
            }
        }

        // meta descriptionを更新
        const metaDesc = document.querySelector('meta[name="description"][data-ja][data-en]');
        if (metaDesc) {
            const descText = metaDesc.getAttribute(`data-${lang}`);
            if (descText) {
                metaDesc.setAttribute('content', descText);
            }
        }

        // タブのテキストを更新
        const tabs = document.querySelectorAll('.info-tab[data-ja][data-en]');
        tabs.forEach(tab => {
            const text = tab.getAttribute(`data-${lang}`);
            if (text) {
                tab.textContent = text;
            }
        });

        // 全ての多言語要素を更新
        const elements = document.querySelectorAll('[data-ja][data-en]');
        elements.forEach(element => {
            // タブは既に処理済みなのでスキップ
            if (element.classList.contains('info-tab')) {
                return;
            }

            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                if (element.tagName === 'TITLE') {
                    // タイトルは既に処理済み
                    return;
                } else if (element.tagName === 'META') {
                    // メタタグは既に処理済み
                    return;
                } else {
                    element.textContent = text;
                }
            }
        });

        this.updateUI();
    }

    updateUI() {
        // 言語ボタンのテキストを更新
        const languageText = this.languageBtn.querySelector('.language-text');
        if (languageText) {
            languageText.textContent = this.currentLang === 'ja' ? '日本語' : 'English';
        }

        // チェックマークを更新
        if (this.checkJa && this.checkEn) {
            this.checkJa.textContent = this.currentLang === 'ja' ? '✓' : '';
            this.checkEn.textContent = this.currentLang === 'en' ? '✓' : '';
        }
    }

    // タブ機能の初期化
    initTabs() {
        const tabs = document.querySelectorAll('.info-tab');
        const contents = document.querySelectorAll('.info-content');

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                const targetTab = tab.getAttribute('data-tab');
                
                // 全てのタブとコンテンツから active クラスを削除
                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                    t.setAttribute('tabindex', '-1');
                });
                contents.forEach(c => c.classList.remove('active'));
                
                // クリックされたタブとそのコンテンツに active クラスを追加
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
                tab.setAttribute('tabindex', '0');
                
                const targetContent = document.getElementById(`${targetTab}-content`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });

            // キーボードナビゲーション
            tab.addEventListener('keydown', (e) => {
                let targetIndex = index;

                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        targetIndex = index > 0 ? index - 1 : tabs.length - 1;
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        targetIndex = index < tabs.length - 1 ? index + 1 : 0;
                        break;
                    case 'Home':
                        e.preventDefault();
                        targetIndex = 0;
                        break;
                    case 'End':
                        e.preventDefault();
                        targetIndex = tabs.length - 1;
                        break;
                    case 'Enter':
                    case ' ':
                        e.preventDefault();
                        tab.click();
                        return;
                }

                if (targetIndex !== index) {
                    tabs[targetIndex].focus();
                }
            });

            // 初期のタブインデックスとARIA属性を設定
            tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
            tab.setAttribute('role', 'tab');
            tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        });

        // ARIA属性を設定
        const tabList = document.querySelector('.info-tabs');
        if (tabList) {
            tabList.setAttribute('role', 'tablist');
        }

        contents.forEach((content, index) => {
            content.setAttribute('role', 'tabpanel');
            content.setAttribute('aria-labelledby', tabs[index]?.id || `tab-${index}`);
        });
    }

    // 機能カードのクリック処理を初期化
    initFunctionCards() {
        // 既存の機能カード（簡易版）のクリック処理
        const functionCards = document.querySelectorAll('.function-card[onclick]');
        functionCards.forEach(card => {
            // onclick属性を削除してイベントリスナーで処理
            const onclickValue = card.getAttribute('onclick');
            card.removeAttribute('onclick');
            
            if (onclickValue) {
                const sectionId = onclickValue.match(/scrollToSection\('([^']+)'\)/);
                if (sectionId && sectionId[1]) {
                    card.addEventListener('click', (e) => {
                        e.preventDefault();
                        scrollToSection(sectionId[1]);
                    });
                    
                    // キーボードアクセシビリティ
                    card.setAttribute('tabindex', '0');
                    card.setAttribute('role', 'button');
                    card.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            scrollToSection(sectionId[1]);
                        }
                    });
                }
            }
        });

        // 機能カード（onclick属性なし）の処理
        const functionCardsNoOnclick = document.querySelectorAll('.function-card:not([onclick])');
        functionCardsNoOnclick.forEach(card => {
            // data-section属性がある場合の処理
            const sectionId = card.getAttribute('data-section');
            if (sectionId) {
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    scrollToSection(sectionId);
                });
                
                card.setAttribute('tabindex', '0');
                card.setAttribute('role', 'button');
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        scrollToSection(sectionId);
                    }
                });
            }
        });
    }
}

// スムーススクロール機能（修正版）
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
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

        // 少し遅延してからスクロール（タブ切り替えアニメーション完了後）
        setTimeout(() => {
            const headerOffset = 100; // ヘッダー分のオフセット
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }, 150);
    }
}

// 画像読み込みエラー処理
function handleImageError() {
    document.querySelectorAll('img[onerror]').forEach(img => {
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
    
    if ('IntersectionObserver' in window) {
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

        images.forEach(img => imageObserver.observe(img));
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
    // フォーカストラップ（モーダル用）
    const trapFocus = (element) => {
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
    };

    // 言語ドロップダウンのフォーカストラップ
    const languageDropdown = document.getElementById('languageDropdown');
    if (languageDropdown) {
        trapFocus(languageDropdown);
    }

    // スキップリンクの追加
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
    if (container) {
        container.id = 'main-content';
    }
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
        console.error('JavaScript Error:', e.error);
        // 本番環境では適切なエラー報告サービスに送信
    });

    // Promise rejection の処理
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled Promise Rejection:', e.reason);
        // 本番環境では適切なエラー報告サービスに送信
    });
}

// パフォーマンス監視
function initPerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('Page Load Performance:', {
                        'DOM Content Loaded': perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                        'Load Complete': perfData.loadEventEnd - perfData.loadEventStart,
                        'Total Load Time': perfData.loadEventEnd - perfData.fetchStart
                    });
                }
            }, 0);
        });
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
}

function performSearch(query) {
    if (!query) {
        // 検索クエリが空の場合は全て表示
        document.querySelectorAll('.function-card, .section').forEach(el => {
            el.style.display = '';
        });
        return;
    }

    // 機能カードの検索
    document.querySelectorAll('.function-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? '' : 'none';
    });

    // セクションの検索
    document.querySelectorAll('.section').forEach(section => {
        const text = section.textContent.toLowerCase();
        section.style.display = text.includes(query) ? '' : 'none';
    });
}

// ダークモード対応（将来の拡張用）
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!darkModeToggle) return;

    const isDarkMode = localStorage.getItem('28tools-dark-mode') === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isNowDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('28tools-dark-mode', isNowDark);
    });
}

// 印刷対応
function initPrintSupport() {
    // 印刷前にすべてのタブコンテンツを表示
    window.addEventListener('beforeprint', () => {
        document.querySelectorAll('.info-content').forEach(content => {
            content.style.display = 'block';
        });
    });

    // 印刷後に元の表示に戻す
    window.addEventListener('afterprint', () => {
        document.querySelectorAll('.info-content').forEach(content => {
            if (!content.classList.contains('active')) {
                content.style.display = 'none';
            }
        });
    });
}

// 外部リンクの処理
function initExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        // 外部リンクに target="_blank" を追加
        if (!link.hostname.includes('28yu.github.io')) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            
            // アクセシビリティ向上：外部リンクであることを示す
            if (!link.textContent.includes('(外部リンク)') && !link.textContent.includes('(external)')) {
                const indicator = document.createElement('span');
                indicator.textContent = ' ↗';
                indicator.style.fontSize = '0.8em';
                indicator.setAttribute('aria-label', '外部リンク');
                link.appendChild(indicator);
            }
        }
    });
}

// アニメーション制御
function initAnimations() {
    // ユーザーがアニメーションを無効にしている場合は尊重
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0s');
        document.documentElement.style.setProperty('--transition-duration', '0s');
    }

    // 設定変更の監視
    prefersReducedMotion.addEventListener('change', (e) => {
        if (e.matches) {
            document.documentElement.style.setProperty('--animation-duration', '0s');
            document.documentElement.style.setProperty('--transition-duration', '0s');
        } else {
            document.documentElement.style.removeProperty('--animation-duration');
            document.documentElement.style.removeProperty('--transition-duration');
        }
    });
}

// サービスワーカー登録（PWA対応・将来の拡張用）
function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// メイン初期化関数
function initializeApp() {
    try {
        // 言語切り替え機能とタブ機能の初期化
        const languageSwitcher = new LanguageSwitcher();
        
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
        
        // PWA機能（コメントアウト - 必要に応じて有効化）
        // initServiceWorker();
        
        console.log('28 Tools Manual initialized successfully');
    } catch (error) {
        console.error('Initialization error:', error);
    }
}

// DOM読み込み完了後に初期化実行
document.addEventListener('DOMContentLoaded', initializeApp);

// ページ表示時の処理（戻るボタン対応）
window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
        // ページがキャッシュから復元された場合の処理
        handleImageError();
    }
});

// リサイズ対応
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // リサイズ後の処理（必要に応じて）
        console.log('Window resized');
    }, 250);
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
    }
};

// グローバルに公開（デバッグ用）
window.Tools28Manual = {
    utils,
    scrollToSection,
    LanguageSwitcher
};
