export function showCookieNotice() {
  // 配置项
  const COOKIE_NOTICE_KEY = 'hasSeenCookieNotice'
  const EXPIRY_DAYS = 30 // Cookie 过期时间（天）
  const POLICY_URL_ZH = '/docs/01_intro/privacy.html'
  const POLICY_URL_EN = '/en/docs/01_intro/privacy.html'

  try {
    // 检查用户是否已经看过提示
    if (localStorage.getItem(COOKIE_NOTICE_KEY) === 'true') {
      return
    }

    // 检查是否已存在元素，如果存在则只更新内容
    let noticeWrapper = document.getElementById('cookie-notice')

    if (!noticeWrapper) {
      noticeWrapper = createNoticeContainer()
      // 只有在没有元素时才添加，避免重复添加
      if (!document.getElementById('cookie-notice')) {
        document.body.appendChild(noticeWrapper)
      }
      injectStyles()
    }

    updateNoticeContent(noticeWrapper)

  } catch (error) {
    console.error("无法显示Cookie提醒:", error)
  }

  function createNoticeContainer() {
    const wrapper = document.createElement('div')
    wrapper.id = 'cookie-notice'
    wrapper.innerHTML = `
      <div class="notice-content">
        <h4 id="cookie-notice-title"></h4>
        <p id="cookie-notice-text"></p>
        <div class="button-group">
          <button class="accept-button"></button>
          <button class="reject-button"></button>
        </div>
        <button class="close-button" aria-label="Close">&times;</button>
      </div>
    `
    // 绑定事件 (只需要绑定一次)
    const acceptButton = wrapper.querySelector('.accept-button')
    const rejectButton = wrapper.querySelector('.reject-button')
    const closeButton = wrapper.querySelector('.close-button')

    const closeNotice = () => {
      wrapper.classList.add('hiding')
      setTimeout(() => {
        if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper)
        localStorage.setItem(COOKIE_NOTICE_KEY, 'true')
        setCookie('nekroagent_cookie_consent', 'accepted', EXPIRY_DAYS)
      }, 300)
    }

    const rejectCookies = () => {
      const isEnglish = document.documentElement.lang === 'en-US' || window.location.pathname.startsWith('/en/')
      const isJapanese = document.documentElement.lang === 'ja-JP' || window.location.pathname.startsWith('/ja/')

      let message = '请使用浏览器相关功能关闭 Cookie'
      if (isEnglish) {
        message = 'Please use your browser settings to disable cookies.'
      } else if (isJapanese) {
        message = 'ブラウザの設定でクッキーを無効にしてください。'
      }
      alert(message)
    }

    if (acceptButton) acceptButton.onclick = closeNotice
    if (rejectButton) rejectButton.onclick = rejectCookies
    if (closeButton) closeButton.onclick = rejectCookies

    return wrapper
  }

  function updateNoticeContent(wrapper) {
    if (!wrapper) return

    // 获取当前页面语言 (VitePress 会在 html 标签上设置 lang)
    // 也可以通过检查 URL 路径来辅助判断
    const isEnglish = document.documentElement.lang === 'en-US' || window.location.pathname.startsWith('/en/')
    const isJapanese = document.documentElement.lang === 'ja-JP' || window.location.pathname.startsWith('/ja/')


    // 内容配置
    let config = {
      title: '我们使用 Cookie',
      content: '我们使用 Cookie 来改善您的浏览体验。继续使用我们的网站即表示您同意我们使用 Cookie。',
      learnMore: '了解更多',
      accept: '接受',
      reject: '拒绝',
      close: '关闭',
      policyUrl: POLICY_URL_ZH
    }

    if (isEnglish) {
      config = {
        title: 'We use cookies',
        content: 'We use cookies to enhance your browsing experience. By continuing to use our site, you consent to our use of cookies.',
        learnMore: 'Learn more',
        accept: 'Accept',
        reject: 'Reject',
        close: 'Close',
        policyUrl: POLICY_URL_EN
      }
    } else if (isJapanese) {
      config = {
        title: 'Cookieを使用します',
        content: '当サイトでは、閲覧体験を向上させるためにCookieを使用しています。サイトの利用を継続することで、Cookieの使用に同意したことになります。',
        learnMore: '詳細を見る',
        accept: '同意する',
        reject: '拒否する',
        close: '閉じる',
        policyUrl: '/ja/docs/01_intro/privacy.html'
      }
    }

    // 更新 DOM
    const titleEl = wrapper.querySelector('#cookie-notice-title')
    const contentEl = wrapper.querySelector('#cookie-notice-text')
    const acceptBtn = wrapper.querySelector('.accept-button')
    const rejectBtn = wrapper.querySelector('.reject-button')
    const closeBtn = wrapper.querySelector('.close-button')

    if (titleEl) titleEl.textContent = config.title
    if (contentEl) {
      contentEl.innerHTML = `${config.content} <a href="${config.policyUrl}" target="_blank" rel="noopener noreferrer">${config.learnMore}</a>`
    }
    if (acceptBtn) acceptBtn.textContent = config.accept
    if (rejectBtn) rejectBtn.textContent = config.reject
    if (closeBtn) closeBtn.setAttribute('aria-label', config.close)
  }

  function injectStyles() {
    if (document.getElementById('cookie-notice-style')) return

    const styles = `
      #cookie-notice {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        animation: notice-fade-in 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
      #cookie-notice.hiding {
        opacity: 0;
        transform: scale(0.95);
      }
      .notice-content {
        background: rgba(28, 28, 30, 0.9);
        color: #fff;
        padding: 20px 24px;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px) saturate(180%);
        -webkit-backdrop-filter: blur(10px) saturate(180%);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        max-width: 360px;
        position: relative;
      }
      /* 浅色模式下的样式 */
      html:not(.dark) .notice-content {
        background: rgba(255, 255, 255, 0.9);
        color: #111827;
        border: 1px solid rgba(0, 0, 0, 0.05);
      }
      .notice-content h4 {
        margin: 0 0 10px 0;
        font-size: 1.1rem;
        font-weight: 600;
      }
      .notice-content p {
        margin: 0 0 8px 0;
        font-size: 0.9rem;
        line-height: 1.6;
        opacity: 0.9;
      }
      .notice-content a {
        color: #E56464;
        text-decoration: none;
        font-weight: 500;
        border-bottom: 1px solid transparent;
        transition: border-bottom 0.2s;
      }
      .notice-content a:hover {
        border-bottom-color: #E56464;
      }
      .button-group {
        display: flex;
        gap: 10px;
        margin-top: 10px;
      }
      .accept-button, .reject-button {
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 500;
        padding: 8px 16px;
        transition: background-color 0.2s;
      }
      .accept-button {
        background: #E56464;
        color: white;
      }
      .accept-button:hover {
        background: #d45353;
      }
      .reject-button {
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
      }
      html:not(.dark) .reject-button {
        background: rgba(0, 0, 0, 0.05);
        color: #333;
      }
      .reject-button:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      html:not(.dark) .reject-button:hover {
        background: rgba(0, 0, 0, 0.1);
      }
      .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        border: none;
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        line-height: 30px;
        text-align: center;
        transition: background-color 0.2s;
        z-index: 1;
      }
      html:not(.dark) .close-button {
        background: rgba(0, 0, 0, 0.05);
        color: #333;
      }
      .close-button:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      html:not(.dark) .close-button:hover {
        background: rgba(0, 0, 0, 0.1);
      }

      /* 动画 */
      @keyframes notice-fade-in {
        from {
          opacity: 0;
          transform: translateY(20px) scale(0.98);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      /* 响应式：小屏幕上占满宽度 */
      @media (max-width: 768px) {
        #cookie-notice {
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
        }
        .notice-content {
            border-radius: 16px 16px 0 0;
            max-width: 100%;
        }
      }
    `;
    // 检查是否已经style标签 (避免重复注入样式但是没有ID的情况)
    if (!document.getElementById('cookie-notice-style')) {
      const styleSheet = document.createElement("style");
      styleSheet.id = 'cookie-notice-style'
      styleSheet.type = "text/css";
      styleSheet.innerText = styles;
      document.head.appendChild(styleSheet);
    }
  }

  // 设置 Cookie 的辅助函数
  function setCookie(name, value, days) {
    const expires = new Date()
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
  }
}