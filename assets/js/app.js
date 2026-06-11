const CLOUDFLARE_WEB_ANALYTICS_TOKEN = '02ab2c59c50c4d02a6ce497849d891eb';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
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

  const savedTheme = localStorage.getItem('theme');
  const currentTheme = savedTheme || document.documentElement.getAttribute('data-theme') || 'light';
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
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
    if (currentLang === 'ja') {
      messageInput.value =
        "無料でAI検索・HP診断を依頼する\n\n" +
        "【対象サイトURL】:\n" +
        "【ご相談内容】:\n";
    } else {
      messageInput.value =
        "Request a Free AI Search & HP Diagnostic\n\n" +
        "[Website URL]:\n" +
        "[Inquiry Details]:\n";
    }
  } else if (subject === 'technical_validation' && messageInput) {
    const currentLang = document.documentElement.getAttribute('lang') || 'ja';

    if (currentLang === 'ja') {
      messageInput.value =
        "技術検証（PoC）およびシステム構築について相談する\n\n" +
        "【対象システム・課題の概要】:\n" +
        "【ご希望の検証内容・ご要件】:\n";
    } else {
      messageInput.value =
        "Consult about Technical Validation (PoC) & System Development\n\n" +
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
        const card = document.getElementById('contact-form-card');
        card.innerHTML = `
          <div class="success-message">
            <div class="success-mark">✓</div>
            <h3 class="lang-ja">送信が完了しました！</h3>
            <h3 class="lang-en">Message Sent Successfully!</h3>
            <p class="lang-ja">
              お問い合わせいただき誠にありがとうございます。<br>内容を確認の上、折り返しご連絡差し上げます。
            </p>
            <p class="lang-en">
              Thank you for reaching out to Mishima Computing.<br>We have received your message and will respond to you shortly.
            </p>
            <button type="button" class="btn btn-secondary js-reset-contact">
              <span class="lang-ja">もう一度送信する</span>
              <span class="lang-en">Send Another Message</span>
            </button>
          </div>
        `;
        const resetButton = card.querySelector('.js-reset-contact');
        if (resetButton) {
          resetButton.addEventListener('click', () => window.location.reload());
        }
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
