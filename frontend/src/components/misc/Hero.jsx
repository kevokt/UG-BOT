import React from "react";
import {
  Box,
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  Container,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useColorModeValue } from "@/components/ui/color-mode";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <Box h={"90vh"} maxH={"800px"} position="relative">
      {/* Background Image */}
      <Flex
        w={"full"}
        h={"100%"}
        backgroundImage={"url('/welcome-image.png')"}
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
        position="relative"
      >
        {/* Overlay hitam transparan */}
        <Box
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bg={useColorModeValue("blackAlpha.600", "blackAlpha.700")} // Sesuaikan tingkat kegelapan: .400 - .800
          zIndex={0}
        />

        <Container maxW="6xl" h="100%" position="relative" zIndex={1}>
          <Flex
            direction="column"
            h="100%"
            justify="center"
            align={{ base: "center", md: "flex-end" }}
            textAlign={{ base: "center", md: "right" }}
            py={{ base: 8, md: 16 }}
          >
            <Stack
              maxW="2xl"
              spacing={6}
              align={{ base: "center", md: "flex-end" }}
            >
              <Text
                color="white"
                fontWeight={600}
                lineHeight={1.2}
                fontSize={useBreakpointValue({ base: "xl", md: "2xl" })}
                mb={8}
              >
                Dapatkan informasi seputar Universitas Gunadarma secara cepat
                dan interaktif. Chatbot cerdas kami siap membantu menjawab
                pertanyaanmu kapan saja!
              </Text>
              <Stack direction="row" spacing={4}>
                <Button
                  colorPalette={"blue"}
                  variant={useColorModeValue("solid", "surface")}
                  rounded="full"
                  onClick={() => navigate("/chat/information")}
                >
                  Chat - Informasi
                </Button>
                <Button
                  colorPalette={"purple"}
                  variant={useColorModeValue("solid", "surface")}
                  rounded="full"
                  onClick={() => navigate("/chat/registration")}
                >
                  Chat - Pendaftaran
                </Button>
              </Stack>
            </Stack>
          </Flex>
        </Container>
      </Flex>
    </Box>
  );
};

export default Hero;
