import React from "react";
import { Box } from "@chakra-ui/react";

const ChatRegistration = () => {
  return (
    <Box width="100%" height="calc(100vh - 64px - 80px)">
      <iframe
        src="https://cdn.botpress.cloud/webchat/v3.0/shareable.html?configUrl=https://files.bpcontent.cloud/2025/03/24/02/20250324021427-OG3JMDAL.json"
        width="100%"
        height="100%"
        style={{ border: "none", display: "block" }}
        title="UG-Bot Registration Chat"
      />
    </Box>
  );
};

export default ChatRegistration;
