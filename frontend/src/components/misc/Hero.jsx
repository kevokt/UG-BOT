import React from "react";
import {
  Box,
  Stack,
  Flex,
  Button,
  Text,
  VStack,
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
        backgroundImage={
          "url(https://images.unsplash.com/photo-1581887936036-3f4f7f0b6679?q=80&w=1062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
        }
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

        {/* Konten */}
        <VStack
          w={"full"}
          justify={"center"}
          px={useBreakpointValue({ base: 4, md: 8 })}
          position="relative"
          zIndex={1}
        >
          <Stack maxW={"2xl"} align={"center"} spacing={6}>
            <Text
              color={"white"}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: "2xl", md: "3xl" })}
              mb={8}
              textAlign={"center"}
            >
              Grooming Hewan Jadi Lebih Mudah, Bersih, dan Menyenangkan.
              Jadwalkan layanan grooming terbaik untuk anabulmu bersama
              Pawfection!
            </Text>
            <Stack direction={"row"} justify="center">
              <Button
                bg={"blue.400"}
                rounded={"full"}
                color={"white"}
                _hover={{ bg: "blue.500" }}
                onClick={() => navigate("/layanan")}
              >
                Lihat Layanan
              </Button>
              <Button
                bg={"green.500"}
                rounded={"full"}
                color={"white"}
                _hover={{ bg: "green.600" }}
                onClick={() => navigate("/reservasi")}
              >
                Lakukan Reservasi
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Hero;
