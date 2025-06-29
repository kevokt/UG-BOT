import React from "react";
import { Box, Flex, HStack, Button, Text, Container } from "@chakra-ui/react";
import { ColorModeButton, useColorModeValue } from "../ui/color-mode";
import ClientDrawerNav from "./ClientDrawerNav";
import { clientNavItems } from "./ClientNavItems";
import Logo from "@/components/misc/Logo";
import { NavLink } from "react-router-dom"; // ⬅️ import this

const ClientNav = ({ active }) => {
  const fontColor = useColorModeValue("black", "whiteAlpha.900");

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.800")}
      py={4}
      px={4}
      shadow={"xs"}
    >
      <Container maxW="6xl">
        <Flex align="center" justify="space-between" height="100%">
          <Flex align="center" gap={2} color="purple.500">
            <Logo />
          </Flex>

          <HStack gap={0} display={{ base: "none", md: "flex" }}>
            <ColorModeButton />
            {clientNavItems.map(({ to, label, icon: Icon }) => (
              <NavLink to={to} key={label} style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <Button
                    className="nav-button"
                    rounded={"full"}
                    width={"100px"}
                    colorPalette={"purple"}
                    variant={isActive ? "surface" : "ghost"}
                    fontSize={"sm"}
                    color={fontColor}
                    _hover={{
                      bg: useColorModeValue("purple.300", "purple.800"),
                    }}
                  >
                    <Icon />
                    <span>{label}</span>
                  </Button>
                )}
              </NavLink>
            ))}
          </HStack>

          <ClientDrawerNav active={active} />
        </Flex>
      </Container>
    </Box>
  );
};

export default ClientNav;
