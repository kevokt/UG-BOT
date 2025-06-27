import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebarNav from "@/components/AdminNavbar/AdminSidebarNav";
import { Box, HStack, Text } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

const AdminNews = () => {
  const [data, setData] = useState([]);

  return (
    <HStack>
      <Box
        marginLeft={{ base: "4", md: "300px" }}
        marginTop={{ base: "100px", md: "40px" }}
      >
        <Text
          as={"h2"}
          textAlign={"center"}
          fontSize={"3xl"}
          fontWeight={"bolder"}
          marginTop={{ base: "0px", md: "50px" }}
        >
          Selamat datang di Admin News
        </Text>
      </Box>
    </HStack>
  );
};

export default AdminNews;
