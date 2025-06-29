import React from "react";

import {
  Box,
  Center,
  Container,
  Stack,
  Text,
  Link,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

import { useColorModeValue } from "@/components/ui/color-mode";
import Logo from "./Logo";

export default function SmallCentered() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.800")}
      color={useColorModeValue("gray.800", "gray.400")}
      mt={20}
      boxShadow={"lg"}
      id="footer"
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <Center>
          <Logo />
        </Center>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW="6xl"
          py={4}
          direction={{ base: "column", md: "row" }}
          justify={{ base: "center", md: "flex-end" }}
          align="center"
        >
          <Stack spacing={1} textAlign={{ base: "center", md: "right" }}>
            <Text fontSize={{ base: "0.5rem", md: "0.75rem" }}>
              Aplikasi ini merupakan proyek tugas akhir dan tidak berafiliasi
              resmi dengan Universitas Gunadarma.
            </Text>
            <HStack spacing={2} justify={{ base: "center", md: "flex-end" }}>
              <Icon as={FaGithub} boxSize={4} color="gray.500" />
              <Link
                href="https://github.com/kevokt"
                isExternal
                fontSize={{ base: "0.5rem", md: "0.75rem" }}
                color="blue.500"
                fontWeight="medium"
                _hover={{ color: "blue.600", textDecoration: "underline" }}
              >
                github.com/kevokt
              </Link>
            </HStack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
