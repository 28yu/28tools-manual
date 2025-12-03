/* 基本設定 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f8fafc;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* 言語切り替えボタン */
.language-switcher {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
}

.language-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: #334155;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.language-btn:hover {
    border-color: #3b82f6;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.language-icon {
    font-size: 16px;
}

.language-arrow {
    font-size: 12px;
    transition: transform 0.3s ease;
}

.language-btn.active .language-arrow {
    transform: rotate(180deg);
}

.language-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 4px;
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px);
    transition: all 0.3s ease;
    min-width: 120px;
}

.language-dropdown.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.language-option {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    cursor: pointer;
    font-size: 14px;
    color: #334155;
    transition: background-color 0.2s ease;
}

.language-option:hover {
    background-color: #f1f5f9;
}

.language-option:first-child {
    border-radius: 6px 6px 0 0;
}

.language-option:last-child {
    border-radius: 0 0 6px 6px;
}

.language-check {
    font-size: 12px;
    color: #10b981;
    width: 12px;
}

/* ヘッダー */
.header {
    text-align: center;
    margin-bottom: 40px;
    padding: 24px 0;
    background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
    color: white;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(37, 99, 235, 0.2);
}

.header h1 {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 8px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    font-weight: 400;
}

/* 情報タブセクション */
.info-tabs-section {
    margin-bottom: 60px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

/* タブナビゲーション */
.info-tabs {
    display: flex;
    background: #f1f5f9;
    border-bottom: 1px solid #e2e8f0;
}

.info-tab {
    flex: 1;
    padding: 16px 20px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: #64748b;
    transition: all 0.3s ease;
    position: relative;
    border-bottom: 3px solid transparent;
}

.info-tab:hover {
    background: #e2e8f0;
    color: #334155;
}

.info-tab.active {
    background: white;
    color: #2563eb;
    border-bottom-color: #2563eb;
}

/* タブコンテンツ */
.info-content {
    display: none;
    padding: 32px;
    background: white;
    min-height: 300px;
}

.info-content.active {
    display: block;
}

/* 機能一覧グリッド（簡易カード用） */
.functions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.function-card {
    display: flex;
    align-items: center;
    padding: 20px;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    color: inherit;
}

.function-card:hover {
    border-color: #3b82f6;
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
    transform: translateY(-2px);
}

.function-card:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
}

.function-icon {
    width: 48px;
    height: 48px;
    margin-right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.function-icon img {
    width: 32px;
    height: 32px;
    object-fit: contain;
}

.icon-fallback {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    border-radius: 6px;
    color: white;
}

.icon-fallback.grid { background: #10b981; }
.icon-fallback.sheet { background: #3b82f6; }
.icon-fallback.view { background: #8b5cf6; }
.icon-fallback.sectionbox { background: #f59e0b; }
.icon-fallback.viewport { background: #ef4444; }
.icon-fallback.cropbox { background: #06b6d4; }

.function-info h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 4px;
}

.function-info p {
    font-size: 0.9rem;
    color: #64748b;
    line-height: 1.4;
}

/* 機能詳細セクション（機能一覧タブ内） */
#functions-content .section {
    margin-bottom: 48px;
    padding: 32px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border: 1px solid #e2e8f0;
    background: #ffffff;
}

#functions-content .section:last-child {
    margin-bottom: 0;
}

#functions-content .section h2 {
    color: #1e293b;
    font-size: 1.6rem;
    margin-bottom: 20px;
    border-bottom: 3px solid #3b82f6;
    padding-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
}

#functions-content .function-description {
    margin-bottom: 24px;
    padding: 16px;
    background: #f8fafc;
    border-radius: 8px;
    border-left: 4px solid #3b82f6;
}

#functions-content .function-description p {
    font-size: 1rem;
    line-height: 1.7;
    color: #475569;
    margin: 0;
}

#functions-content .button-guide-compact {
    background: #ffffff;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px;
    margin: 24px 0;
}

#functions-content .button-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 12px;
}

#functions-content .button-row:last-child {
    margin-bottom: 0;
}

#functions-content .button-icon-box {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f1f5f9;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    flex-shrink: 0;
}

#functions-content .button-icon-img {
    width: 32px;
    height: 32px;
    object-fit: contain;
}

#functions-content .button-info-compact {
    flex: 1;
    font-size: 0.95rem;
    line-height: 1.5;
    color: #475569;
}

#functions-content .button-info-compact strong {
    color: #1e293b;
    font-weight: 600;
}

#functions-content .usage-steps {
    margin: 24px 0;
}

#functions-content .usage-steps h3 {
    color: #1e293b;
    font-size: 1.2rem;
    margin-bottom: 12px;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 6px;
}

#functions-content .usage-steps ol {
    padding-left: 20px;
    margin: 12px 0;
}

#functions-content .usage-steps li {
    margin: 8px 0;
    line-height: 1.6;
    color: #475569;
}

#functions-content .note-box {
    background: #eff6ff;
    border: 1px solid #3b82f6;
    border-radius: 8px;
    padding: 16px;
    margin: 20px 0;
}

#functions-content .note-box strong {
    color: #1e40af;
    font-weight: 600;
}

#functions-content .note-box span {
    color: #1e40af;
}

#functions-content .icon-fallback {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    border-radius: 6px;
    color: white;
}

/* 情報詳細スタイル */
.info-detail h3 {
    color: #1e293b;
    margin-bottom: 24px;
    font-size: 1.5rem;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 8px;
}

.info-detail h4 {
    color: #334155;
    margin: 24px 0 16px 0;
    font-size: 1.2rem;
}

/* 動作環境リスト */
.requirement-list {
    display: grid;
    gap: 16px;
    margin: 24px 0;
}

.requirement-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: #f1f5f9;
    border-radius: 8px;
    border-left: 4px solid #2563eb;
}

.requirement-item strong {
    color: #1e293b;
    font-weight: 600;
    min-width: 140px;
}

.requirement-item span {
    color: #475569;
    text-align: right;
}

/* インストール・アンインストール手順 */
.install-method,
.uninstall-method {
    margin: 32px 0;
    padding: 24px;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
}

.install-steps,
.uninstall-steps {
    margin: 16px 0;
    padding-left: 20px;
}

.install-steps li,
.uninstall-steps li {
    margin: 12px 0;
    line-height: 1.6;
}

.install-steps code,
.uninstall-steps code {
    background: #1e293b;
    color: #e2e8f0;
    padding: 4px 8px;
    border-radius: 4px;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 0.9em;
    display: inline-block;
    margin: 2px 0;
}

/* トラブルシューティングボックス */
.troubleshooting-box {
    margin: 24px 0;
    padding: 20px;
    background: #fef3c7;
    border: 1px solid #f59e0b;
    border-radius: 8px;
}

.troubleshooting-box h4 {
    color: #92400e;
    margin-top: 0;
}

.troubleshooting-box ul {
    margin: 12px 0;
    padding-left: 20px;
}

.troubleshooting-box li {
    margin: 8px 0;
    color: #78350f;
}

/* バージョン情報 */
.version-info {
    display: grid;
    gap: 16px;
    margin: 24px 0;
}

.version-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: #f1f5f9;
    border-radius: 8px;
}

.version-item strong {
    color: #1e293b;
    font-weight: 600;
}

.version-number {
    background: #2563eb;
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.9em;
}

/* 更新履歴 */
.changelog {
    margin: 32px 0;
}

.changelog h4 {
    color: #1e293b;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 8px;
}

.changelog-item {
    margin: 24px 0;
    padding: 20px;
    background: #f8fafc;
    border-radius: 8px;
    border-left: 4px solid #10b981;
}

.changelog-version {
    font-size: 1.1em;
    font-weight: 600;
    color: #059669;
    margin-bottom: 4px;
}

.changelog-date {
    font-size: 0.9em;
    color: #6b7280;
    margin-bottom: 12px;
}

.changelog-content ul {
    margin: 0;
    padding-left: 20px;
}

.changelog-content li {
    margin: 8px 0;
    color: #374151;
    line-height: 1.5;
}

/* サポート情報 */
.support-info {
    margin: 32px 0;
    padding: 24px;
    background: #eff6ff;
    border: 1px solid #3b82f6;
    border-radius: 8px;
}

.support-info h4 {
    color: #1e40af;
    margin-top: 0;
}

.support-links {
    display: grid;
    gap: 12px;
    margin: 16px 0;
}

.support-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: white;
    border-radius: 6px;
}

.support-item strong {
    color: #1e40af;
    font-weight: 600;
    min-width: 100px;
}

.support-item a {
    color: #2563eb;
    text-decoration: none;
    font-size: 0.9em;
}

.support-item a:hover {
    text-decoration: underline;
}

/* 注意ボックス */
.note-box {
    background: #eff6ff;
    border: 1px solid #3b82f6;
    border-radius: 8px;
    padding: 16px;
    margin: 20px 0;
}

.note-box strong {
    color: #1e40af;
}

.note-box ul {
    margin: 12px 0;
    padding-left: 20px;
}

.note-box li {
    margin: 8px 0;
    color: #1e40af;
}

/* セクション（機能詳細用・タブ外） */
.section {
    background: white;
    border-radius: 12px;
    padding: 32px;
    margin-bottom: 32px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section h2 {
    color: #1e293b;
    font-size: 1.8rem;
    margin-bottom: 24px;
    border-bottom: 3px solid #3b82f6;
    padding-bottom: 12px;
}

.function-description {
    margin-bottom: 32px;
}

.function-description p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #475569;
}

/* ボタンガイド（タブ外） */
.button-guide-compact {
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 24px;
    margin: 24px 0;
}

.button-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
}

.button-row:last-child {
    margin-bottom: 0;
}

.button-icon-box {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    flex-shrink: 0;
}

.button-icon-img {
    width: 32px;
    height: 32px;
    object-fit: contain;
}

.button-info-compact {
    flex: 1;
    font-size: 0.95rem;
    line-height: 1.5;
    color: #475569;
}

.button-info-compact strong {
    color: #1e293b;
    font-weight: 600;
}

/* 使用手順 */
.usage-steps {
    margin: 32px 0;
}

.usage-steps h3 {
    color: #1e293b;
    font-size: 1.3rem;
    margin-bottom: 16px;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 8px;
}

.usage-steps ol {
    padding-left: 24px;
    margin: 16px 0;
}

.usage-steps li {
    margin: 12px 0;
    line-height: 1.6;
    color: #475569;
}

.usage-steps strong {
    color: #1e293b;
    font-weight: 600;
}

/* スキップリンク */
.skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 1000;
    border-radius: 4px;
    font-size: 14px;
}

.skip-link:focus {
    top: 6px;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
    .language-switcher {
        top: 15px;
        right: 15px;
    }
    
    .language-btn {
        padding: 6px 12px;
        font-size: 13px;
    }
    
    .container {
        padding: 15px;
    }
    
    .header h1 {
        font-size: 2rem;
    }
    
    .subtitle {
        font-size: 1rem;
    }
    
    .info-tabs {
        flex-direction: column;
    }
    
    .info-tab {
        border-radius: 0;
        border-bottom: 1px solid #e2e8f0;
        border-left: 3px solid transparent;
    }
    
    .info-tab.active {
        border-bottom-color: #e2e8f0;
        border-left-color: #2563eb;
    }
    
    .info-tab:last-child {
        border-bottom: none;
    }
    
    .info-content {
        padding: 20px;
    }
    
    .requirement-item,
    .version-item,
    .support-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }
    
    .requirement-item span,
    .support-item a {
        text-align: left;
    }
    
    .functions-grid {
        grid-template-columns: 1fr;
    }
    
    .function-card {
        padding: 16px;
    }
    
    .function-icon {
        margin-right: 12px;
    }
    
    .section {
        padding: 20px;
        margin-bottom: 20px;
    }
    
    .section h2 {
        font-size: 1.5rem;
    }
    
    .button-guide-compact {
        padding: 16px;
    }
    
    .button-row {
        gap: 12px;
    }
    
    #functions-content .section {
        padding: 20px;
        margin-bottom: 32px;
    }
    
    #functions-content .section h2 {
        font-size: 1.4rem;
    }
    
    #functions-content .button-guide-compact {
        padding: 16px;
    }
    
    #functions-content .button-row {
        gap: 12px;
    }
    
    #functions-content .button-icon-box {
        width: 40px;
        height: 40px;
    }
    
    #functions-content .button-icon-img {
        width: 28px;
        height: 28px;
    }
    
    #functions-content .function-description {
        padding: 12px;
    }
}

@media (max-width: 480px) {
    .info-tabs {
        font-size: 12px;
    }
    
    .info-tab {
        padding: 12px 16px;
    }
    
    .install-method,
    .uninstall-method {
        padding: 16px;
    }
    
    .install-steps code,
    .uninstall-steps code {
        display: block;
        margin: 4px 0;
        word-break: break-all;
    }
    
    .function-card {
        flex-direction: column;
        text-align: center;
    }
    
    .function-icon {
        margin-right: 0;
        margin-bottom: 12px;
    }
    
    .header {
        padding: 16px 0;
        margin-bottom: 24px;
    }
    
    .header h1 {
        font-size: 1.8rem;
    }
    
    #functions-content .button-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }
    
    #functions-content .button-icon-box {
        align-self: center;
    }
    
    #functions-content .button-info-compact {
        text-align: center;
    }
}

/* スムーススクロール */
html {
    scroll-behavior: smooth;
}

/* フォーカス表示 */
.info-tab:focus,
.language-btn:focus,
.language-option:focus,
.function-card:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
}

/* アニメーション */
.function-card,
.info-tab,
.language-btn {
    transition: all 0.3s ease;
}

/* 印刷対応 */
@media print {
    .language-switcher {
        display: none;
    }
    
    .info-tabs {
        display: none;
    }
    
    .info-content {
        display: block !important;
        page-break-inside: avoid;
    }
    
    .section,
    #functions-content .section {
        page-break-inside: avoid;
        box-shadow: none;
        border: 1px solid #ccc;
        margin-bottom: 20px;
    }
    
    #functions-content .button-guide-compact {
        border: 1px solid #ccc;
        background: #f9f9f9;
    }
}

/* CSS変数（将来の拡張用） */
:root {
    --primary-color: #2563eb;
    --primary-hover: #1d4ed8;
    --secondary-color: #64748b;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --error-color: #ef4444;
    --info-color: #06b6d4;
    --background-color: #f8fafc;
    --surface-color: #ffffff;
    --border-color: #e2e8f0;
    --text-primary: #1e293b;
    --text-secondary: #475569;
    --text-muted: #64748b;
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --radius-sm: 6px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --animation-duration: 0.3s;
    --transition-duration: 0.3s;
}

/* ダークモード対応（将来の拡張用） */
@media (prefers-color-scheme: dark) {
    :root {
        --background-color: #0f172a;
        --surface-color: #1e293b;
        --border-color: #334155;
        --text-primary: #f1f5f9;
        --text-secondary: #cbd5e1;
        --text-muted: #94a3b8;
    }
}

/* アニメーション無効化対応 */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    html {
        scroll-behavior: auto;
    }
}
