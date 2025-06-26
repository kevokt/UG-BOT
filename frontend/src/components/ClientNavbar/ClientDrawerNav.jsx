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
                  {clientNavItems.map(({ to, label, key, isGhost }) => (
                    <Link to={to} key={label}>
                      <Button
                        className="nav-button"
                        rounded="full"
                        colorPalette="purple"
                        variant={
                          isGhost
                            ? "ghost"
                            : active === key
                            ? "surface"
                            : "ghost"
                        }
                        fontSize="sm"
                        color={fontColor}
                        _hover={{
                          bg: useColorModeValue("purple.300", "purple.800"),
                        }}
                      >
                        <span>{label}</span>
                      </Button>
                    </Link>
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
