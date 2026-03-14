import React, { useCallback, useEffect, useRef, useState } from 'react';
import jesterImg from '../assets/jester-logo.svg';
import './Chatbot.css';

const BOTPRESS_CONFIG = {
  botId: 'c4456a62-788d-4d14-92cc-fd64a5ec8ea5',
  clientId: '66fb1013-2168-44ff-8ed7-2b7466c4f09a',
  hideWidget: true,
  showCloseButton: false,
  enableConversationDeletion: false,
  stylesheet:
    'https://files.bpcontent.cloud/2026/03/02/18/20260302181655-406ZTFR6.css',
};

const BOTPRESS_SCRIPT_ID = 'botpress-webchat-script';
const BOTPRESS_SCRIPT_SRC = 'https://cdn.botpress.cloud/webchat/v1/inject.js';

const BotpressChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chatRootRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    const initEmbeddedChat = () => {
      if (initializedRef.current) return;

      const bp = window.botpressWebChat;
      const root = chatRootRef.current;
      if (!bp || !root) return;

      initializedRef.current = true;
      bp.init({
        ...BOTPRESS_CONFIG,
        rootElement: root,
      });
    };

    const existingScript = document.getElementById(BOTPRESS_SCRIPT_ID);
    if (window.botpressWebChat) {
      initEmbeddedChat();
      return;
    }

    if (existingScript) {
      existingScript.addEventListener('load', initEmbeddedChat);
      return () => existingScript.removeEventListener('load', initEmbeddedChat);
    }

    const script = document.createElement('script');
    script.id = BOTPRESS_SCRIPT_ID;
    script.src = BOTPRESS_SCRIPT_SRC;
    script.async = true;
    script.onload = initEmbeddedChat;
    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  useEffect(() => {
    const bp = window.botpressWebChat;
    if (!bp) return;

    if (isOpen) {
      if (typeof bp.open === 'function') {
        bp.open();
      } else if (typeof bp.sendEvent === 'function') {
        bp.sendEvent({ type: 'show' });
      }
    } else {
      if (typeof bp.close === 'function') {
        bp.close();
      } else if (typeof bp.sendEvent === 'function') {
        bp.sendEvent({ type: 'hide' });
      }
    }
  }, [isOpen]);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="botpress-shell">
      <div className={`botpress-panel ${isOpen ? 'is-open' : ''}`}>
        <div ref={chatRootRef} id="botpress-chat-root" className="botpress-chat-root" />
      </div>

      <div className="group fixed bottom-6 right-6 z-[9999]">
        <div className="absolute -inset-2 bg-[#00ffc8] rounded-full blur opacity-20 group-hover:opacity-60 animate-pulse transition duration-1000 group-hover:duration-200" />

        <button
          onClick={toggleChat}
          type="button"
          aria-controls="botpress-chat-root"
          aria-expanded={isOpen}
          className="relative flex items-center justify-center w-16 h-16 bg-black border-2 border-[#00ffc8] rounded-full shadow-[0_0_15px_rgba(0,255,200,0.4)] transform transition-transform group-hover:scale-110 active:scale-95 overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center p-1">
            <img
              src={jesterImg}
              alt="Jester Protocol AI"
              className="w-full h-full object-contain rounded-full border border-[#00ffc8]/50 animate-[spin_8s_linear_infinite]"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#00ffc8] rounded-full shadow-[0_0_10px_#00ffc8]" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default BotpressChat;