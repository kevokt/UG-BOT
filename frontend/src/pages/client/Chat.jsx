import React from "react";
import { Box, Text, VStack, Flex } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

const Chat = () => {
  const boxData = [
    {
      title: "Chat - Knowledge",
      image: "/chat-menu-img/chat-knowledge.webp",
      link: "https://cdn.botpress.cloud/webchat/v3.0/shareable.html?configUrl=https://files.bpcontent.cloud/2025/03/24/02/20250324021427-OG3JMDAL.json",
    },
    {
      title: "Chat - Registration",
      image: "/chat-menu-img/chat-registration.jpg",
      link: "https://cdn.botpress.cloud/webchat/v3.0/shareable.html?configUrl=https://files.bpcontent.cloud/2025/05/18/09/20250518091222-IQ6PKRQ3.json",
    },
  ];

  const textColor = useColorModeValue("black", "white");

  const bgGradient = useColorModeValue(
    "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.5))",
    "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.7))"
  );

  return (
    <Flex minH="80vh" justify="center" align="center" py={10} px={4}>
      <VStack spacing={2} w="100%">
        {boxData.map((item, index) => (
          <Box
            as={"a"}
            href={item.link}
            key={index}
            w={{ base: "90%", md: "550px", lg: "700px" }}
            h="230px"
            mt={5}
            mb={3}
            position="relative"
            borderRadius="xl"
            overflow="hidden"
            boxShadow="md"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-5px) scale(1.03)",
              boxShadow: "lg",
            }}
          >
            <Box
              position="absolute"
              top={0}
              left={0}
              w="100%"
              h="100%"
              bgImage={`url(${item.image})`}
              bgSize="cover"
              bgPos="center"
              zIndex={1}
            />
            <Box
              position="absolute"
              top={0}
              left={0}
              w="100%"
              h="100%"
              background={bgGradient}
              zIndex={2}
            />
            <Text
              position="absolute"
              right={4}
              top="50%"
              transform="translateY(-50%)"
              color={textColor}
              fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
              fontWeight="bolder"
              fontFamily={"Exo, sans-serif"}
              zIndex={3}
              textAlign="right"
            >
              {item.title}
            </Text>
          </Box>
        ))}
      </VStack>
    </Flex>
  );
};

export default Chat;
