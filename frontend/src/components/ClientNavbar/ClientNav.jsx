import React from "react";
import { Box, Flex, HStack, Button, Text } from "@chakra-ui/react";
import { FaPaw } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ColorModeButton, useColorModeValue } from "../ui/color-mode";
import ClientDrawerNav from "./ClientDrawerNav";
import { clientNavItems } from "./ClientNavItems";
import Logo from "@/components/misc/Logo";

const ClientNav = ({ active }) => {
  const fontColor = useColorModeValue("black", "whiteAlpha.900");
  console.log("ClientNav active:", active);

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

        <HStack gap={2} display={{ base: "none", md: "flex" }}>
          <ColorModeButton />
          {clientNavItems.map(({ to, label, key, isGhost }) => (
            <Link to={to} key={label}>
              <Button
                className="nav-button"
                rounded={"full"}
                colorPalette={"purple"}
                variant={
                  isGhost ? "ghost" : active === key ? "surface" : "ghost"
                }
                fontSize={"sm"}
                color={fontColor}
                _hover={{ bg: useColorModeValue("purple.300", "purple.800") }}
              >
                <span>{label}</span>
              </Button>
            </Link>
          ))}
        </HStack>

        <ClientDrawerNav active={active} />
      </Flex>
    </Box>
  );
};

export default ClientNav;
