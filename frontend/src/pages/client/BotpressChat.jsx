"use client"; // if you're using Next.js

import React, { useEffect } from "react";

const BotpressChat = () => {
  return (
    <iframe
      title="Botpress Chat"
      src="/bot.html"
      style={{ border: "none", width: "100%", height: "90%" }}
    />
  );
};

export default BotpressChat;
