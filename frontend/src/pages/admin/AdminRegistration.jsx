import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebarNav from "@/components/AdminNav/AdminSidebarNav";
import { Box, HStack, Text, Table, Spinner, Button } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import AdminRegistrationDetail from "./AdminRegistrationDetail";

const AdminRegistration = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

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
    try {
      await axios.put(`/api/botpress/registrations/toggle/${item.id}`);

      // Refresh data
      fetchData();

      toaster.create({
        title: `Status email berhasil diubah!`,
        type: "success",
      });
    } catch (error) {
      console.error("Gagal update status email:", error);
      toaster.create({
        title: "Gagal mengubah status email!",
        type: "error",
      });
    }
  };

  return (
    <HStack align="start">
      <AdminSidebarNav inRegistration={true} />
      <Box
        flex="1"
        p={4}
        ml={{ base: "4", md: "300px" }}
        mt={{ base: "100px", md: "40px" }}
        overflowX="auto"
      >
        <Text
          as="h2"
          textAlign="center"
          fontSize="3xl"
          fontWeight="bold"
          mt={{ base: "0px", md: "50px" }}
        >
          Selamat datang di Admin Pendaftaran
        </Text>

        {data.length === 0 ? (
          <Box textAlign="center" mt={10}>
            <Spinner size="lg" color="purple.500" />
          </Box>
        ) : (
          <Box mt={10}>
            <Table.Root size="sm">
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
                    <Table.Cell>
                      {item.isEmailSent ? "Sudah Dikirim" : "Belum Dikirim"}
                    </Table.Cell>
                    <Table.Cell>
                      <HStack spacing={2}>
                        <AdminRegistrationDetail item={item} />
                        <Button
                          size="sm"
                          colorScheme={item.isEmailSent ? "yellow" : "green"}
                          variant="solid"
                          onClick={() => handleToggleEmailStatus(item)}
                        >
                          {item.isEmailSent ? "Batalkan" : "Tandai Terkirim"}
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
