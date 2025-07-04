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
import { useNavigate, NavLink } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { toaster } from "../ui/toaster";
import Logo from "../misc/Logo";
import { adminNavItems } from "./adminNavItems";

const AdminDrawerNav = () => {
  const fontColor = useColorModeValue("black", "whiteAlpha.900");
  const hoverBg = useColorModeValue("purple.300", "purple.800");
  const redHoverBg = useColorModeValue("red.300", "red.800");
  const navigate = useNavigate();

  return (
    <Box
      position="fixed"
      top={8}
      left={8}
      zIndex={1000}
      display={{ base: "flex", md: "none" }}
    >
      <Drawer.Root placement="top">
        <Drawer.Trigger asChild>
          <Button variant="surface" colorPalette="purple" size="lg">
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
                      <VStack spacing={3}>
                        {adminNavItems.map(({ to, label, icon: Icon }) => (
                          <NavLink
                            to={to}
                            key={to}
                            end={to === "/admin"}
                            style={{ textDecoration: "none" }}
                            onClick={() => store.setOpen(false)}
                          >
                            {({ isActive }) => (
                              <Button
                              as="div"
                                w={{ base: "full", sm: "300px" }}
                                mx={{ base: "unset", sm: "auto" }}
                                gap={2}
                                rounded="full"
                                colorPalette="purple"
                                variant={isActive ? "surface" : "ghost"}
                                fontSize="sm"
                                _hover={{ bg: hoverBg }}
                              >
                                <Icon />
                                {label}
                              </Button>
                            )}
                          </NavLink>
                        ))}

                        <Box display="flex" justifyContent="center" w="full">
                          <Button
                            w={{ base: "full", sm: "300px" }}
                            mx={{ base: "unset", sm: "auto" }}
                            gap={2}
                            fontSize="sm"
                            colorPalette="red"
                            rounded="full"
                            variant="ghost"
                            _hover={{ bg: redHoverBg }}
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Apakah anda yakin ingin keluar?"
                                )
                              ) {
                                localStorage.removeItem("token");
                                toaster.create({
                                  title: "Berhasil Logout",
                                  type: "success",
                                });
                                store.setOpen(false);
                                navigate("/login");
                              }
                            }}
                          >
                            <FiLogOut />
                            Logout
                          </Button>
                        </Box>
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

export default AdminDrawerNav;
