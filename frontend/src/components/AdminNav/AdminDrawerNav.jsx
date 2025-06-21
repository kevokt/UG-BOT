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
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { RiRobot2Line } from "react-icons/ri";
import { IoMdMenu } from "react-icons/io";
import { toaster } from "../ui/toaster";
import Logo from "../misc/Logo";

const AdminDrawerNav = ({ inDashboard, inPaket, inReservasi }) => {
  const fontColor = useColorModeValue("black", "whiteAlpha.900");
  const navigate = useNavigate();

  const navItems = [
    { to: "/admin", label: "Dashboard", isActive: inDashboard },
    { to: "/admin/paket", label: "Kelola Paket", isActive: inPaket },
    {
      to: "/admin/reservasi",
      label: "Kelola Reservasi",
      isActive: inReservasi,
    },
  ];

  const handleLogout = () => {
    if (window.confirm("Apakah anda yakin ingin keluar?")) {
      localStorage.removeItem("token");
      toaster.create({
        title: "Berhasil Logout",
        type: "success",
      });
      navigate("/login");
    }
  };

  return (
    <Box
      position="fixed"
      top={8}
      left={8}
      zIndex={1000}
      display={{ base: "flex", md: "none" }}
    >
      <Drawer.Root placement={"top"}>
        <Drawer.Trigger asChild>
          <Button variant="solid" colorPalette={"purple"} size="lg">
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
                  {navItems.map(({ to, label, isActive }) => (
                    <Link key={to} to={to}>
                      <Button
                        className="nav-button"
                        rounded={"full"}
                        colorPalette={"purple"}
                        variant={isActive ? "surface" : "ghost"}
                        fontSize={"sm"}
                        color={fontColor}
                        _hover={{
                          bg: useColorModeValue("purple.300", "purple.800"),
                        }}
                      >
                        <span>{label}</span>
                      </Button>
                    </Link>
                  ))}
                  <Button
                    className="nav-button"
                    rounded={"full"}
                    variant="ghost"
                    fontSize={"sm"}
                    color={fontColor}
                    _hover={{
                      bg: useColorModeValue("purple.300", "purple.800"),
                    }}
                    onClick={handleLogout}
                  >
                    <span>Logout</span>
                  </Button>
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

export default AdminDrawerNav;
