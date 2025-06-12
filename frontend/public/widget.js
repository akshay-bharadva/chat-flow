(function () {
  "use strict";

  const API_BASE_URL = "http://localhost:8000/api";
  const IFRAME_BASE_URL = "http://localhost:3001"; // URL of our Next.js app for the iframe content

  let state = {
    isOpen: false,
  };

  function init() {
    const config = window.ChatBotConfig;
    if (!config || !config.botId) {
      console.error("ChatFlow Widget: botId is not configured.");
      return;
    }

    fetch(`${API_BASE_URL}/widget/${config.botId}/config`)
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw new Error(err.detail || 'Chatbot not found or disabled.') });
        }
        return response.json();
      })
      .then(widgetConfig => {
        createUI(config.botId, widgetConfig);
      })
      .catch(error => {
        console.error("ChatFlow Widget Error:", error.message);
      });
  }

  function createUI(botId, config) {
    const theme = {
      primary: config.primaryColor || '#3B82F6',
      textOnPrimary: '#FFFFFF',
    };

    // --- Create CSS ---
    const style = document.createElement('style');
    style.innerHTML = `
      .cf-widget-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
      }
      .cf-chat-button {
        background-color: ${theme.primary};
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: none;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform 0.2s;
      }
      .cf-chat-button:hover {
        transform: scale(1.1);
      }
      .cf-chat-button svg {
        width: 32px;
        height: 32px;
        stroke: ${theme.textOnPrimary};
        stroke-width: 2;
      }
      .cf-chat-window {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 400px;
        height: 80vh;
        max-height: 600px;
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        overflow: hidden;
        display: none;
        flex-direction: column;
        transition: opacity 0.3s, transform 0.3s;
        transform: translateY(20px);
        opacity: 0;
      }
      .cf-chat-window.open {
        display: flex;
        transform: translateY(0);
        opacity: 1;
      }
      .cf-chat-window iframe {
        width: 100%;
        height: 100%;
        border: none;
      }
    `;
    document.head.appendChild(style);

    // --- Create DOM Elements ---
    const container = document.createElement('div');
    container.className = 'cf-widget-container';
    
    // Chat Window (IFrame)
    const chatWindow = document.createElement('div');
    chatWindow.className = 'cf-chat-window';
    const iframe = document.createElement('iframe');
    iframe.src = `${IFRAME_BASE_URL}/chatbot-iframe/${botId}`; // We need to create this page in Next.js
    chatWindow.appendChild(iframe);

    // Chat Button
    const chatButton = document.createElement('button');
    chatButton.className = 'cf-chat-button';
    chatButton.innerHTML = `<svg fill="none" viewBox="0 0 24 24"><path d="M17 3.34a10 10 0 1 1 -14.995 8.984a1.5 1.5 0 0 1 0 -2.668a1 1 0 0 0 0 -1.332a10 10 0 0 1 14.995 -4.984z"></path></svg>`;

    // --- Event Listener ---
    chatButton.addEventListener('click', () => {
      state.isOpen = !state.isOpen;
      if (state.isOpen) {
        chatWindow.classList.add('open');
        chatButton.innerHTML = `<svg fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"></path></svg>`;
      } else {
        chatWindow.classList.remove('open');
        chatButton.innerHTML = `<svg fill="none" viewBox="0 0 24 24"><path d="M17 3.34a10 10 0 1 1 -14.995 8.984a1.5 1.5 0 0 1 0 -2.668a1 1 0 0 0 0 -1.332a10 10 0 0 1 14.995 -4.984z"></path></svg>`;
      }
    });

    // --- Append to Body ---
    container.appendChild(chatWindow);
    container.appendChild(chatButton);
    document.body.appendChild(container);
  }

  // --- Run ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();