import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import ClientNav from "@/components/ClientNavbar/ClientNav";
import Footer from "@/components/misc/Footer";

const ClientLayout = () => {
  return (
    <Flex direction="column" minH="100vh">
      {/* Navbar */}
      <ClientNav />

      {/* Konten utama */}
      <Box flex="1">
        <Outlet />
      </Box>

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default ClientLayout;
