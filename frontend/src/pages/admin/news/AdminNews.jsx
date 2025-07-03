import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  HStack,
  VStack,
  Text,
  Table,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { useColorModeValue } from "@/components/ui/color-mode";
import AdminNewsDetail from "./AdminNewsDetail";

const AdminNews = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const variantButton = useColorModeValue("solid", "surface");

  const fetchNews = async () => {
    try {
      const response = await axios.get("/api/news");
      setNews(response.data.news);
    } catch (error) {
      console.error("Gagal mengambil data berita:", error);
      toaster.create({
        title: "Gagal mengambil data berita",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus berita ini?");
    if (!confirm) return;

    const promise = axios.delete(`/api/news/${id}`).then(() => fetchNews());

    toaster.promise(promise, {
      loading: { title: "Menghapus berita..." },
      success: { title: "Berita berhasil dihapus" },
      error: { title: "Gagal menghapus berita" },
    });
  };

  const handleToggleStatus = async (id) => {
    const promise = axios.put(`/api/news/toggle/${id}`).then(() => fetchNews());

    toaster.promise(promise, {
      loading: { title: "Mengubah status berita..." },
      success: { title: "Status berita berhasil diubah" },
      error: { title: "Gagal mengubah status berita" },
    });
  };

  return (
    <HStack align="start">
      <Box
        flex="1"
        p={4}
        ml={{ base: "unset", md: "300px" }}
        mt={{ base: "100px", md: "40px" }}
        mx={{ base: "4", "2xl": "auto" }}
        mr={{ base: "8", md: "60px" }}
        overflowX="auto"
        maxWidth={{ base: "100%", xl: "1000px" }}
        rounded={"lg"}
      >
        <Box position="sticky" left="0" zIndex="1">
          <Text
            as="h2"
            textAlign="center"
            fontSize="3xl"
            fontWeight="bold"
            mt={{ base: "0px", md: "50px" }}
          >
            Data Berita
          </Text>
          <Box my={6} textAlign="right">
            <Button
              colorPalette="green"
              variant={variantButton}
              width="120px"
              onClick={() => navigate("/admin/news/create")}
            >
              Tambah Berita
            </Button>
          </Box>
        </Box>

        {loading ? (
          <VStack textAlign="center" mt={10}>
            <Spinner
              size="md"
              color="purple.500"
              css={{ "--spinner-track-color": "colors.gray.200" }}
            />
            <Text color="purple.500">Loading...</Text>
          </VStack>
        ) : (
          <Box mt={10}>
            <Table.Root size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader width="20%">Judul</Table.ColumnHeader>
                  <Table.ColumnHeader width="20%">Penulis</Table.ColumnHeader>
                  <Table.ColumnHeader width="20%">Status</Table.ColumnHeader>
                  <Table.ColumnHeader width="40%">Aksi</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {news.map((item) => (
                  <Table.Row key={item._id}>
                    <Table.Cell>{item.title}</Table.Cell>
                    <Table.Cell>{item.author}</Table.Cell>
                    <Table.Cell color={item.isPublished ? "green" : "gray"}>
                      {item.isPublished ? "Published" : "Draft"}
                    </Table.Cell>
                    <Table.Cell>
                      <HStack spacing={2}>
                        <AdminNewsDetail item={item} />
                        <Button
                          size="sm"
                          colorPalette="blue"
                          variant={variantButton}
                          width="80px"
                          onClick={() =>
                            navigate(`/admin/news/edit/${item._id}`)
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          colorPalette={item.isPublished ? "yellow" : "green"}
                          variant={variantButton}
                          width="100px"
                          onClick={() => handleToggleStatus(item._id)}
                        >
                          {item.isPublished ? "Batalkan" : "Terbitkan"}
                        </Button>
                        <Button
                          size="sm"
                          colorPalette="red"
                          variant={variantButton}
                          width="80px"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </Button>
                      </HStack>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        )}
      </Box>
    </HStack>
  );
};

export default AdminNews;
