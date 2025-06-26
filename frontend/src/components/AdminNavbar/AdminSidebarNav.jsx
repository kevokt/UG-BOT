import React from "react";
import { Box, Flex, VStack, Button, Text } from "@chakra-ui/react";
import { FaPaw } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ColorModeButton, useColorModeValue } from "../ui/color-mode";
import { toaster } from "../ui/toaster";
import AdminDrawerNav from "./AdminDrawerNav";
import Logo from "../misc/Logo";
import { adminNavItems } from "./adminNavItems";

const AdminSidebarNav = ({ active }) => {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const hoverBg = useColorModeValue("purple.300", "purple.800");
  const fontColor = useColorModeValue("black", "whiteAlpha.900");
  const navigate = useNavigate();

  const navItems = [
    { to: "/admin", label: "Dashboard", name: "dashboard" },
    { to: "/admin/news", label: "Kelola Berita", name: "news" },
    { to: "/admin/report", label: "Kelola Laporan", name: "report" },
    {
      to: "/admin/registration",
      label: "Kelola Pendaftaran",
      name: "registration",
    },
  ];

  return (
    <>
      <AdminDrawerNav active={active} />
      <Box
        position="fixed"
        left="0"
        top="0"
        height="100vh"
        width="250px"
        bg={bgColor}
        shadow="md"
        p={5}
        display={{ base: "none", md: "block" }}
      >
        <Flex direction="column" justify="space-between" h="100%">
          <Box>
            <Flex justify="center" align="center" w="full" mb={10} mt={3}>
              <Logo />
            </Flex>
            <VStack spacing={4}>
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.to}
                    as={RouterLink}
                    to={item.to}
                    w="200px"
                    variant={active === item.name ? "surface" : "ghost"}
                    colorPalette="purple"
                    justifyContent="flex-start"
                    gap={4}
                    _hover={{ bg: hoverBg }}
                  >
                    <Icon />
                    {item.label}
                  </Button>
                );
              })}

              <Button
                w="200px"
                variant="ghost"
                colorPalette="red"
                justifyContent="center"
                _hover={{ bg: useColorModeValue("red.300", "red.700") }}
                onClick={() => {
                  if (window.confirm("Apakah anda yakin ingin keluar?")) {
                    localStorage.removeItem("token");
                    toaster.create({
                      title: "Berhasil Logout",
                      type: "success",
                    });
                    navigate("/login");
                  }
                }}
              >
                Logout
              </Button>
            </VStack>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <ColorModeButton />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AdminSidebarNav;
