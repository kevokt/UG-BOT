import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebarNav from "@/components/AdminNavbar/AdminSidebarNav";
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
import AdminRegistrationDetail from "./AdminRegistrationDetail";
import { useNavigate } from "react-router-dom";
import { useColorModeValue } from "@/components/ui/color-mode";

const AdminRegistration = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/botpress/registrations");
      setData(response.data.data);
    } catch (error) {
      console.error("Gagal fetch data:", error);
      toaster.create({
        title: "Gagal mengambil data!",
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleEmailStatus = async (item) => {
    const promise = axios
      .put(`/api/botpress/registrations/toggle/${item.id}`)
      .then(() => {
        fetchData(); // Refresh data setelah berhasil
      });

    toaster.promise(promise, {
      loading: {
        title: "Mengubah status email...",
        description: "Silakan tunggu",
      },
      success: {
        title: "Berhasil!",
        description: "Status email berhasil diubah",
      },
      error: {
        title: "Gagal!",
        description: "Tidak dapat mengubah status email",
      },
    });
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Apakah kamu yakin ingin menghapus data ini?"
    );
    if (!confirm) return;

    const promise = axios
      .post(`/api/botpress/registrations/delete/${id}`)
      .then(() => {
        fetchData(); // Refresh data setelah delete berhasil
      });

    toaster.promise(promise, {
      loading: {
        title: "Menghapus data...",
        description: "Sedang menghapus data dari server",
      },
      success: {
        title: "Berhasil!",
        description: "Data berhasil dihapus",
      },
      error: {
        title: "Gagal!",
        description: "Tidak dapat menghapus data",
      },
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
            Data Pendaftaran
          </Text>
        </Box>
        {data.length === 0 ? (
          <VStack textAlign="center" mt={10}>
            <Spinner
              size="md"
              color="purple.500"
              css={{ "--spinner-track-color": "colors.gray.200" }}
            />
            <Text color={"purple.500"}>Loading...</Text>
          </VStack>
        ) : (
          <Box mt={10}>
            <Table.Root size="md" striped>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Nama</Table.ColumnHeader>
                  <Table.ColumnHeader>Jurusan 1</Table.ColumnHeader>
                  <Table.ColumnHeader>Jurusan 2</Table.ColumnHeader>
                  <Table.ColumnHeader>Jalur</Table.ColumnHeader>
                  <Table.ColumnHeader>Region</Table.ColumnHeader>
                  <Table.ColumnHeader>Status Email</Table.ColumnHeader>
                  <Table.ColumnHeader>Aksi</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data.map((item, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{item.nama?.trim()}</Table.Cell>
                    <Table.Cell>{item.jurusan1}</Table.Cell>
                    <Table.Cell>{item.jurusan2}</Table.Cell>
                    <Table.Cell>{item.jalurPendaftaran}</Table.Cell>
                    <Table.Cell>{item.region}</Table.Cell>
                    <Table.Cell color={item.isEmailSent ? "green" : "red"}>
                      {item.isEmailSent ? "Sudah Dikirim" : "Belum Dikirim"}
                    </Table.Cell>
                    <Table.Cell>
                      <HStack spacing={2}>
                        <AdminRegistrationDetail
                          key={item.updatedAt}
                          item={item}
                        />
                        <Button
                          size="sm"
                          colorPalette={item.isEmailSent ? "yellow" : "green"}
                          variant={useColorModeValue("solid", "surface")}
                          width="80px"
                          onClick={() => handleToggleEmailStatus(item)}
                        >
                          {item.isEmailSent ? "Batalkan" : "Terkirim"}
                        </Button>
                        <Button
                          size="sm"
                          colorPalette="blue"
                          variant={useColorModeValue("solid", "surface")}
                          width="80px"
                          onClick={() =>
                            navigate(`/admin/registration/edit/${item.id}`)
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          colorPalette="red"
                          variant={useColorModeValue("solid", "surface")}
                          width="80px"
                          onClick={() => handleDelete(item.id)}
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

export default AdminRegistration;
