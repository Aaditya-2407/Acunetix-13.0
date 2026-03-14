import { useEffect } from 'react';
import './Chatbot.css';

const BotpressChat = () => {
  useEffect(() => {
    const injectSrc = 'https://cdn.botpress.cloud/webchat/v3.6/inject.js';
    const botSrc = 'https://files.bpcontent.cloud/2026/03/02/17/20260302171104-QSWM51L5.js';

    const appendBotScript = () => {
      if (!document.querySelector('script[src*="bpcontent.cloud"]')) {
        const script2 = document.createElement('script');
        script2.src = botSrc;
        document.body.appendChild(script2);
      }
    };

    const injectLoaded = !!(window.botpress || window.botpressWebChat);
    const injectScript = document.querySelector('script[src*="cdn.botpress.cloud/webchat"]');

    if (injectLoaded) {
      appendBotScript();
    } else if (injectScript) {
      const existingInject = injectScript;
      const onInjectLoad = () => appendBotScript();
      existingInject.addEventListener('load', onInjectLoad);
      const waitForInject = setInterval(() => {
        if (window.botpress || window.botpressWebChat) {
          clearInterval(waitForInject);
          appendBotScript();
        }
      }, 150);
      // Fallback: if global never appears but inject tag exists, still attempt bot script.
      setTimeout(() => {
        clearInterval(waitForInject);
        appendBotScript();
        existingInject.removeEventListener('load', onInjectLoad);
      }, 8000);
    } else {
      const script1 = document.createElement('script');
      script1.src = injectSrc;
      script1.onload = appendBotScript;
      document.body.appendChild(script1);
    }

    const applyMobileSizing = () => {
      if (window.innerWidth > 768) return;

      const containers = document.querySelectorAll(
        '.bpChatContainer, #bp-web-widget-container, #bp-web-widget, [class*="WebchatContainer"], [class*="webchatContainer"]'
      );

      containers.forEach((el) => {
        el.style.setProperty('width', '74vw', 'important');
        el.style.setProperty('max-width', '280px', 'important');
        el.style.setProperty('height', '48vh', 'important');
        el.style.setProperty('max-height', '390px', 'important');
        el.style.setProperty('right', '10px', 'important');
        el.style.setProperty('bottom', '82px', 'important');
        el.style.setProperty('left', 'auto', 'important');
        el.style.setProperty('top', 'auto', 'important');
        el.style.setProperty('border-radius', '16px', 'important');
        el.style.setProperty('overflow', 'hidden', 'important');
      });

      document.querySelectorAll('.bpChatContainer iframe, #bp-web-widget-container iframe, #bp-web-widget iframe').forEach((iframe) => {
        iframe.style.setProperty('width', '100%', 'important');
        iframe.style.setProperty('height', '100%', 'important');
        iframe.style.setProperty('border-radius', '16px', 'important');
      });
    };

    applyMobileSizing();

    const sizeObserver = new MutationObserver(() => applyMobileSizing());
    sizeObserver.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] });

    const sizeInterval = setInterval(applyMobileSizing, 400);

    return () => {
      clearInterval(sizeInterval);
      sizeObserver.disconnect();
    };
  }, []);

  return null;
};

export default BotpressChat;
