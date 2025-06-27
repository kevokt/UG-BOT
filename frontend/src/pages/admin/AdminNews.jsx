import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebarNav from "../../components/AdminNavbar/AdminSidebarNav";
import {
  Box,
  HStack,
  Text,
  Button,
  SimpleGrid,
  Card,
  Flex,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { useColorModeValue } from "@/components/ui/color-mode";

const AdminNewsCreate = () => {
  const navigate = useNavigate();
  const [pakets, setPakets] = useState([]);

  // Fetch data dari backend
  //   useEffect(() => {
  //     const fetchPakets = async () => {
  //       try {
  //         const res = await axios.get("http://localhost:3000/api/paket");
  //         setPakets(res.data.reverse());
  //       } catch (error) {
  //         console.error("Gagal memuat data paket:", error);
  //       }
  //     };

  //     fetchPakets();
  //   }, []);

  async function handleDelete(id) {
    const confirm = window.confirm("Yakin ingin menghapus paket ini?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/api/paket/${id}`);
      setPakets(pakets.filter((p) => p._id !== id));
      toaster.create({
        title: "Paket berhasil dihapus!",
        type: "success",
      });
    } catch (err) {
      console.error("Gagal menghapus paket:", err);
      toaster.create({
        title: "Gagal menghapus paket",
        type: "error",
      });
    }
  }

  return (
    <HStack>
      <Box
        marginLeft={{ base: "8px", md: "250px" }}
        marginTop={{ base: "100px", md: "40px" }}
        mx={{ base: "none", "2xl": "auto" }}
        maxWidth={"1200px"}
        width={"98vw"}
        paddingLeft={{ base: "0", "2xl": "8" }}
      >
        <Text
          as="h2"
          textAlign="center"
          fontSize="3xl"
          fontWeight="bolder"
          mt={{ base: "0px", md: "50px" }}
        >
          Data Berita
        </Text>

        <Box px={{ base: "24px", md: "48px", "2xl": "64px" }} mt={10}>
          <Flex justify="space-between" align="center" mb={6} flexWrap="wrap">
            <Button
              colorPalette="green"
              onClick={() => navigate("/admin/news/create")}
            >
              Create Berita
            </Button>
          </Flex>
        </Box>
      </Box>
    </HStack>
  );
};

export default AdminNewsCreate;
