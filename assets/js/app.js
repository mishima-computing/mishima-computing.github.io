const CLOUDFLARE_WEB_ANALYTICS_TOKEN = '02ab2c59c50c4d02a6ce497849d891eb';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initCardGlowEffects();
  initModals();
  initContactForm();
  initCloudflareWebAnalytics();
});

/* --- CLOUDFLARE WEB ANALYTICS --- */
function initCloudflareWebAnalytics() {
  const token = CLOUDFLARE_WEB_ANALYTICS_TOKEN.trim();
  if (!token) return;
  if (document.querySelector('script[data-cf-beacon]')) return;

  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  script.setAttribute('data-cf-beacon', JSON.stringify({ token }));
  document.body.appendChild(script);
}

/* --- THEME CONTROLLER (LIGHT/DARK) --- */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  
  if (theme === 'light') {
    themeToggle.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `; // Show Moon icon when in light mode (to toggle to dark)
  } else {
    themeToggle.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `; // Show Sun icon when in dark mode (to toggle to light)
  }
}

/* --- LANGUAGE CONTROLLER (JP/EN) --- */
function initLanguage() {
  const langToggle = document.getElementById('lang-toggle');
  if (!langToggle) return;

  // Determine initial language:
  // 1. Check if there's a saved language preference.
  // 2. If not, check browser language setting. Default to 'en' if browser language is not Japanese.
  let defaultLang = 'ja';
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang && !browserLang.toLowerCase().startsWith('ja')) {
    defaultLang = 'en';
  }
  
  const savedLang = localStorage.getItem('lang') || defaultLang;
  setLanguage(savedLang);

  langToggle.addEventListener('click', () => {
    const currentLang = document.documentElement.getAttribute('lang') || 'ja';
    const newLang = currentLang === 'ja' ? 'en' : 'ja';
    setLanguage(newLang);
  });
}

function setLanguage(lang) {
  document.documentElement.setAttribute('lang', lang);
  localStorage.setItem('lang', lang);
  
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    if (lang === 'ja') {
      langToggle.innerHTML = `<span>EN</span>`;
      langToggle.setAttribute('aria-label', 'Switch to English');
    } else {
      langToggle.innerHTML = `<span>JA</span>`;
      langToggle.setAttribute('aria-label', '日本語に切り替え');
    }
  }

  // Dynamically update placeholder for the contact message textarea
  const messageTextarea = document.getElementById('contact-message');
  if (messageTextarea) {
    if (lang === 'ja') {
      messageTextarea.setAttribute('placeholder', 'ご相談内容やお見積のご要件をご自由にご記入ください...');
    } else {
      messageTextarea.setAttribute('placeholder', 'Please describe your inquiry, project scope, or estimation requirements...');
    }
  }
}

/* --- DYNAMIC GLASS CARD GLOW EFFECTS --- */
function initCardGlowEffects() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });
}

/* --- MODALS CONTROLLER --- */
const reportContents = {
  'report-agents': {
    title: {
      ja: 'スケールする自律型マルチエージェントシステムの設計',
      en: 'Designing Autonomous Multi-Agent Systems for Scale'
    },
    date: '2026.05.15',
    category: 'Agent Systems',
    body: {
      ja: `
        <p>本報告書では、複数のLLMエージェントが協調して複雑なソフトウェア開発タスクを自律的に遂行するためのシステムアーキテクチャについて論じます。</p>
        <h3>1. マルチエージェント協調の課題</h3>
        <p>単一のエージェントシステムではコンテキスト制限や無限ループ、指示の逸脱といった問題が発生しがちですが、役割を分担した複数のエージェントをメッセージングシステムで繋ぐことにより、これらを劇的に改善できます。</p>
        <h3>2. 状態管理と調停（Orchestration）</h3>
        <p>本設計では中央調停（Orchestrator）モデルを採用し、各子エージェント（リサーチャー、プログラマー、レビュアーなど）に対してタスクの割り振りと状態監視を行います。エージェント間通信には構造化されたJSONスキーマを使用し、エラー検出時には自動で自己修復プロセスがトリガーされます。</p>
        <h3>3. 今後の展望</h3>
        <p>現在は静的な役割定義に基づいた運用ですが、タスクの内容に応じてオンデマンドで新たな専門エージェントを動的に生成・編成するメタエージェントシステムの開発を進めています。</p>
      `,
      en: `
        <p>This report discusses the system architecture required to enable multiple LLM agents to collaborate and autonomously execute complex software development tasks at scale.</p>
        <h3>1. Challenges in Multi-Agent Collaboration</h3>
        <p>Single-agent systems often suffer from context limitations, infinite loop traps, and instruction drift. Allocating highly focused, specific roles to multiple agents linked via structured messaging mitigates these challenges remarkably.</p>
        <h3>2. State Management and Orchestration</h3>
        <p>Our design employs a centralized Orchestrator model that assigns tasks and monitors state changes for sub-agents (e.g., Researcher, Coder, Reviewer). Agent communication leverages rigid JSON schemas, and a self-healing protocol is automatically triggered upon detecting system errors.</p>
        <h3>3. Future Directions</h3>
        <p>While roles are currently statically defined, we are actively developing meta-agent pipelines capable of dynamically spawning and orchestrating specialized specialized sub-agents on demand based on runtime task definitions.</p>
      `
    }
  },
  'report-cloud': {
    title: {
      ja: 'AI推論における分散クラウド基盤のベンチマーク',
      en: 'Benchmarking Distributed Cloud Infrastructures for AI Inference'
    },
    date: '2026.04.28',
    category: 'Cloud Infrastructure',
    body: {
      ja: `
        <p>大規模言語モデル（LLM）のローカルサービングおよびクラウドエッジにおける推論パフォーマンスを最大化するための、最新GPU/NPUクラスタのベンチマーク比較を行いました。</p>
        <h3>1. 検証アプローチ</h3>
        <p>各種コンテナオーケストレーション基盤（Kubernetesおよび軽量なK3s）を使用し、エッジデバイスからハイパースケーラーGPU環境にまたがるハイブリッド推論ネットワークを構築。RTT（往復遅延）とスループット（Tokens/Sec）を測定しました。</p>
        <h3>2. 知見と最適化結果</h3>
        <p>vLLMエンジンを用いた動的バッチング（Continuous Batching）の導入により、並行リクエスト処理効率が従来比で最大2.4倍向上。また、Mishimaで開発したエッジ負荷分散プロキシにより、高遅延環境下でもエラー率0%の安定稼働を達成しました。</p>
      `,
      en: `
        <p>We conducted benchmarking studies across modern GPU/NPU clusters to maximize inference performance for large language models (LLMs) in local-serving and edge-cloud configurations.</p>
        <h3>1. Verification Methodology</h3>
        <p>Using container orchestration platforms (Kubernetes and lightweight K3s), we constructed a hybrid inference network spanning edge devices to hyperscaler GPU environments. We measured round-trip time (RTT) and throughput (Tokens per Second).</p>
        <h3>2. Findings and Optimization Results</h3>
        <p>Integrating the vLLM engine with Continuous Batching improved concurrent request handling throughput by up to 2.4x. Furthermore, Mishima's proprietary edge load-balancing proxy achieved an error rate of 0% even under severe high-latency network testing.</p>
      `
    }
  },
  'report-validation': {
    title: {
      ja: 'ミッションクリティカルな業務システムにおける自律テスト手法',
      en: 'Autonomous Testing Methodologies in Mission-Critical Systems'
    },
    date: '2026.03.10',
    category: 'Technical Validation',
    body: {
      ja: `
        <p>金融および社会基盤に関わるシステム開発において、人手によるテスト仕様書作成から脱却し、AIエージェントが要件定義書から直接テストシナリオを構築して実行するアプローチの有効性を検証しました。</p>
        <h3>1. テスト生成AIモデルの開発</h3>
        <p>システムの仕様書およびコードベースをインプットとし、考えられる境界値テスト、例外処理ルートをエージェントが深層解析。Playwrightを用いたE2Eブラウザテストスクリプトを自動出力させます。</p>
        <h3>2. 検証結果</h3>
        <p>テストカバレッジ率は手動テスト設計時の72%から89%へと大幅に向上し、人手作業コストは約65%削減。回帰テストの信頼性を爆発的に高めることが確認されました。</p>
      `,
      en: `
        <p>In developing mission-critical systems for financial and social infrastructure, we validated an approach that shifts away from manual test specification toward autonomous AI agents generating and executing test scenarios directly from system requirements.</p>
        <h3>1. Autonomous Test Generation Engine</h3>
        <p>Our agent analyzes codebase directories and system design specs to locate boundary-value test paths and error-handling routines. It then automatically outputs and executes Playwright E2E browser tests.</p>
        <h3>2. Validation Results</h3>
        <p>Overall test coverage improved dramatically from 72% (manual design) to 89%, while associated labor costs dropped by approximately 65%. Regression testing reliability has achieved unprecedented robustness.</p>
      `
    }
  }
};

function initModals() {
  const modal = document.getElementById('report-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close');
  const backdrop = modal.querySelector('.modal-backdrop');
  const reportCards = document.querySelectorAll('.report-card');

  function openModal(reportId) {
    const report = reportContents[reportId];
    if (!report) return;

    const currentLang = document.documentElement.getAttribute('lang') || 'ja';
    
    modal.querySelector('.modal-title-text').innerHTML = `
      <span class="lang-ja">${report.title.ja}</span>
      <span class="lang-en">${report.title.en}</span>
    `;
    modal.querySelector('.modal-date').textContent = report.date;
    modal.querySelector('.modal-category').textContent = report.category;
    modal.querySelector('.modal-body-content').innerHTML = `
      <div class="lang-ja">${report.body.ja}</div>
      <div class="lang-en">${report.body.en}</div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock scroll
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scroll
  }

  reportCards.forEach(card => {
    card.addEventListener('click', () => {
      const reportId = card.getAttribute('data-report-id');
      openModal(reportId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --- SECURE CONTACT FORM AJAX HANDLER --- */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  // Prepopulate message from URL if present
  const urlParams = new URLSearchParams(window.location.search);
  const subject = urlParams.get('subject');
  const src = urlParams.get('src');
  const source = src ? src.trim().slice(0, 120) : '';
  const sourceInput = document.getElementById('contact-source');
  const messageInput = document.getElementById('contact-message');
  if (sourceInput) {
    sourceInput.value = source;
  }

  if (subject === 'free_diagnostic' && messageInput) {
    const currentLang = document.documentElement.getAttribute('lang') || 'ja';
    const jaSourceLine = source ? `【流入元】:${source}\n` : '';
    const enSourceLine = source ? `[Source]: ${source}\n` : '';

    if (currentLang === 'ja') {
      messageInput.value =
        "無料でAI検索・HP診断を依頼する\n\n" +
        jaSourceLine +
        "【対象サイトURL】:\n" +
        "【ご相談内容】:\n";
    } else {
      messageInput.value =
        "Request a Free AI Search & HP Diagnostic\n\n" +
        enSourceLine +
        "[Website URL]:\n" +
        "[Inquiry Details]:\n";
    }
  } else if (subject === 'technical_validation' && messageInput) {
    const currentLang = document.documentElement.getAttribute('lang') || 'ja';
    const jaSourceLine = source ? `【流入元】:${source}\n` : '';
    const enSourceLine = source ? `[Source]: ${source}\n` : '';

    if (currentLang === 'ja') {
      messageInput.value =
        "技術検証（PoC）およびシステム構築について相談する\n\n" +
        jaSourceLine +
        "【対象システム・課題の概要】:\n" +
        "【ご希望の検証内容・ご要件】:\n";
    } else {
      messageInput.value =
        "Consult about Technical Validation (PoC) & System Development\n\n" +
        enSourceLine +
        "[System / Challenge Overview]:\n" +
        "[Validation Requirements]:\n";
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="lang-ja">送信中...</span>
      <span class="lang-en">Sending...</span>
    `;
    
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      source: formData.get('source')
    };
    
    const action = form.getAttribute('action');
    
    try {
      if (action.includes('YOUR_')) {
        throw new Error('Endpoint not configured');
      }
      
      let response;
      if (action.startsWith('https://formsubmit.co/')) {
        // FormSubmit AJAX handling
        response = await fetch(action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
      } else {
        // Custom Serverless API JSON Post (e.g. Cloudflare Worker or API Gateway)
        response = await fetch(action, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
      }
      
      if (response.ok) {
        // Render beautiful success message right inside the card
        const card = document.getElementById('contact-form-card');
        card.innerHTML = `
          <div style="text-align: center; padding: 4rem 1rem;">
            <div style="font-size: 3.5rem; margin-bottom: 1.5rem; color: var(--primary); text-shadow: 0 0 20px var(--primary-glow);">✓</div>
            <h3 class="lang-ja" style="font-size: 1.8rem; margin-bottom: 1rem;">送信が完了しました！</h3>
            <h3 class="lang-en" style="font-size: 1.8rem; margin-bottom: 1rem;">Message Sent Successfully!</h3>
            <p class="lang-ja" style="max-width: 480px; margin: 0 auto; color: var(--text-secondary); line-height: 1.8;">
              お問い合わせいただき誠にありがとうございます。<br>内容を確認の上、折り返しご連絡差し上げます。
            </p>
            <p class="lang-en" style="max-width: 480px; margin: 0 auto; color: var(--text-secondary); line-height: 1.8;">
              Thank you for reaching out to Mishima Computing.<br>We have received your message and will respond to you shortly.
            </p>
            <button class="btn btn-secondary" onclick="window.location.reload()" style="margin-top: 2.5rem; padding: 0.75rem 2rem; font-size: 0.9rem;">
              <span class="lang-ja">もう一度送信する</span>
              <span class="lang-en">Send Another Message</span>
            </button>
          </div>
        `;
      } else {
        throw new Error('Server responded with error');
      }
    } catch (error) {
      console.error(error);
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      
      alert(document.documentElement.lang === 'ja'
        ? '送信に失敗しました。宛先エンドポイントの設定をご確認いただくか、GitHub Organizationから直接ご連絡ください。'
        : 'Failed to send message. Please check the endpoint configuration or contact us directly via our GitHub Organization.'
      );
    }
  });
}
