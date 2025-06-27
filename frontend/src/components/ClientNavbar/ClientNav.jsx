import React from "react";
import { Box, Flex, HStack, Button, Text } from "@chakra-ui/react";
import { FaPaw } from "react-icons/fa";
import { Link } from "react-router-dom";
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
      p={8}
      height="70px"
      shadow={"xs"}
    >
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
                  _hover={{ bg: useColorModeValue("purple.300", "purple.800") }}
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
    </Box>
  );
};

export default ClientNav;
