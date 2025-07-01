"use client"; // only if you're using Next.js

import React, { useEffect } from "react";

const BotpressChat = () => {
  useEffect(() => {
    const containerId = "webchat-container";

    const loadBotpress = () => {
      // Wait until the container is available
      const checkContainer = setInterval(() => {
        const container = document.getElementById(containerId);
        if (container && window.botpress) {
          clearInterval(checkContainer);

          // Optional: Close any existing chat first
          window.botpress.close();

          // Initialize the chatbot in the specific container
          window.botpress.init({
            botId: "189bebe1-0aca-48b5-8530-7ac195117a32",
            clientId: "5da43137-e3e8-4067-b9e3-f11729391fc2",
            container: `#${containerId}`,
            configuration: {
              website: {},
              variant: "soft",
              themeMode: "light",
              fontFamily: "inter",
            },
          });

          window.botpress.on("webchat:ready", () => {
            window.botpress.open(); // Optional auto-open
          });
        }
      }, 100); // Retry every 100ms until ready
    };

    // Inject script only once
    if (!document.getElementById("botpress-script")) {
      const script = document.createElement("script");
      script.id = "botpress-script";
      script.src = "https://cdn.botpress.cloud/webchat/v3.0/inject.js";
      script.async = true;
      script.onload = loadBotpress;
      document.body.appendChild(script);
    } else {
      loadBotpress();
    }
  }, []);

  return (
    <div
      id="webchat-container"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <style>{`
        .bpFab {
          display: none !important;
        }
        .bpWebchat {
          position: relative !important;
          width: 100% !important;
          height: 100% !important;
          top: unset !important;
          left: unset !important;
          right: unset !important;
          bottom: unset !important;
        }
      `}</style>
    </div>
  );
};

export default BotpressChat;
