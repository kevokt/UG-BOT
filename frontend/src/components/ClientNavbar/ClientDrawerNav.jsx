import {
  Box,
  Button,
  CloseButton,
  Drawer,
  Flex,
  Portal,
  Text,
  VStack,
  Center,
} from "@chakra-ui/react";
import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode";
import { Link } from "react-router-dom";
import { FaPaw } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import Logo from "@/components/misc/Logo";
import { clientNavItems } from "./ClientNavItems";
import { NavLink } from "react-router-dom";

const ClientDrawerNav = ({ active }) => {
  const fontColor = useColorModeValue("black", "whiteAlpha.900");

  return (
    <Box display={{ base: "flex", md: "none" }}>
      <Drawer.Root placement={"top"}>
        <Drawer.Trigger asChild>
          <Button variant="outline" size="sm">
            <IoMdMenu />
          </Button>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>
                  <Center>
                    <Logo />
                  </Center>
                </Drawer.Title>
              </Drawer.Header>

              <Drawer.Body>
                <VStack>
                  {clientNavItems.map(({ to, label }) => (
                    <NavLink
                      to={to}
                      key={label}
                      end
                      style={{ textDecoration: "none" }}
                    >
                      {({ isActive }) => (
                        <Button
                          className="nav-button"
                          rounded="full"
                          colorPalette="purple"
                          variant={isActive ? "surface" : "ghost"}
                          fontSize="sm"
                          color={fontColor}
                          _hover={{
                            bg: useColorModeValue("purple.300", "purple.800"),
                          }}
                        >
                          <span>{label}</span>
                        </Button>
                      )}
                    </NavLink>
                  ))}
                </VStack>
              </Drawer.Body>

              <Drawer.Footer>
                <ColorModeButton />
              </Drawer.Footer>

              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Box>
  );
};

export default ClientDrawerNav;
