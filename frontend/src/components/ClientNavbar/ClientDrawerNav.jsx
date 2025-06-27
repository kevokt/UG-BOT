import {
  Box,
  Button,
  CloseButton,
  Drawer,
  Flex,
  Portal,
  VStack,
  Center,
} from "@chakra-ui/react";
import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode";
import { IoMdMenu } from "react-icons/io";
import Logo from "@/components/misc/Logo";
import { clientNavItems } from "./ClientNavItems";
import { NavLink } from "react-router-dom";

const ClientDrawerNav = () => {
  const fontColor = useColorModeValue("black", "whiteAlpha.900");

  return (
    <Box display={{ base: "flex", md: "none" }}>
      <Drawer.Root placement="top">
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

              <Drawer.Context>
                {(store) => (
                  <>
                    <Drawer.Body>
                      <VStack>
                        {clientNavItems.map(({ to, label, icon: Icon }) => (
                          <NavLink
                            to={to}
                            key={label}
                            style={{
                              textDecoration: "none",
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            onClick={() => store.setOpen(false)} // ✅ Close drawer on click
                          >
                            {({ isActive }) => (
                              <Button
                                className="nav-button"
                                rounded="full"
                                width={{ base: "100%", sm: "300px" }}
                                colorPalette="purple"
                                variant={isActive ? "surface" : "ghost"}
                                fontSize="sm"
                                color={fontColor}
                                _hover={{
                                  bg: useColorModeValue(
                                    "purple.300",
                                    "purple.800"
                                  ),
                                }}
                              >
                                <Icon />
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
                  </>
                )}
              </Drawer.Context>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Box>
  );
};

export default ClientDrawerNav;
