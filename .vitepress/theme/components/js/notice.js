// Cookie 使用提醒脚本

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

    createNoticeElement()

  } catch (error) {
    console.error("无法显示Cookie提醒:", error)
  }

  function createNoticeElement() {
    // 获取当前页面语言
    const isEnglish = document.documentElement.lang === 'en-US'
    
    // 根据语言设置内容
    const title = isEnglish ? 'We use cookies' : '我们使用 Cookie'
    const content = isEnglish 
      ? 'We use cookies to enhance your browsing experience. By continuing to use our site, you consent to our use of cookies.'
      : '我们使用 Cookie 来改善您的浏览体验。继续使用我们的网站即表示您同意我们使用 Cookie。'
    const learnMore = isEnglish ? 'Learn more' : '了解更多'
    const acceptText = isEnglish ? 'Accept' : '接受'
    const policyUrl = isEnglish ? POLICY_URL_EN : POLICY_URL_ZH
    
    const noticeWrapper = document.createElement('div')
    noticeWrapper.id = 'cookie-notice'
    noticeWrapper.innerHTML = `
      <div class="notice-content">
        <h4>${title}</h4>
        <p>${content} <a href="${policyUrl}" target="_blank" rel="noopener noreferrer">${learnMore}</a></p>
        <div class="button-group">
          <button class="accept-button">${acceptText}</button>
          <button class="reject-button">${isEnglish ? 'Reject' : '拒绝'}</button>
        </div>
        <button class="close-button" aria-label="${isEnglish ? 'Close' : '关闭'}">&times;</button>
      </div>
    `
    
    const acceptButton = noticeWrapper.querySelector('.accept-button')
    const rejectButton = noticeWrapper.querySelector('.reject-button')
    const closeButton = noticeWrapper.querySelector('.close-button')
    
    const closeNotice = () => {
      noticeWrapper.classList.add('hiding')
      
      setTimeout(() => {
        document.body.removeChild(noticeWrapper)
        // 设置 localStorage 标记，30 天内不再显示
        localStorage.setItem(COOKIE_NOTICE_KEY, 'true')
        // 同时设置一个 cookie 用于服务端识别
        setCookie('nekroagent_cookie_consent', 'accepted', EXPIRY_DAYS)
      }, 300)
    }

    const rejectCookies = () => {
      // 关闭页面
      window.close();
    }
    
    acceptButton.onclick = closeNotice
    rejectButton.onclick = rejectCookies
    closeButton.onclick = rejectCookies

    // 创建并注入样式
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
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // 将提示框添加到页面
    document.body.appendChild(noticeWrapper);
  }
  
  // 设置 Cookie 的辅助函数
  function setCookie(name, value, days) {
    const expires = new Date()
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
  }
}