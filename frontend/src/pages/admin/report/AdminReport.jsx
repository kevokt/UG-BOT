"use client";

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
  NativeSelect,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { useColorModeValue } from "@/components/ui/color-mode";
import AdminReportDetail from "./AdminReportDetail";

const statusOptions = [
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "in_progress" },
  { label: "Resolved", value: "resolved" },
];

const AdminReport = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const variantButton = useColorModeValue("solid", "surface");

  const fetchReports = async () => {
    try {
      const response = await axios.get("/api/report");
      console.log("Fetched reports:", response.data.reports[0]);
      setReports(response.data.reports);
    } catch (error) {
      console.error("Gagal mengambil data laporan:", error);
      toaster.create({
        title: "Gagal mengambil data laporan",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus laporan ini?");
    if (!confirm) return;

    const promise = axios
      .delete(`/api/report/${id}`)
      .then(() => fetchReports());

    toaster.promise(promise, {
      loading: { title: "Menghapus laporan..." },
      success: { title: "Laporan berhasil dihapus" },
      error: { title: "Gagal menghapus laporan" },
    });
  };

  const handleStatusChange = async (id, newStatus) => {
    const promise = axios
      .put(`/api/report/${id}/status`, { status: newStatus })
      .then(() => fetchReports());

    toaster.promise(promise, {
      loading: { title: "Memperbarui status..." },
      success: { title: "Status berhasil diperbarui" },
      error: { title: "Gagal memperbarui status" },
    });
  };

  const kategoriList = [
    { label: "Informasi tidak sesuai", value: "informasi" },
    { label: "Bot tidak merespons", value: "bot_tidak_merespons" },
    { label: "Kesalahan teknis (bug)", value: "bug" },
    { label: "Masalah Pendaftaran", value: "pendaftaran" },
    { label: "Lainnya", value: "lainnya" },
  ];

  const getKategoriLabel = (value) => {
    const kategori = kategoriList.find((item) => item.value === value);
    return kategori ? kategori.label : value;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "red";
      case "in_progress":
        return "blue";
      case "resolved":
        return "green";
      default:
        return "gray";
    }
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
            Laporan Masalah Pengguna
          </Text>
        </Box>

        {loading ? (
          <VStack textAlign="center" mt={10}>
            <Spinner size="md" color="purple.500" />
            <Text color="purple.500">Loading...</Text>
          </VStack>
        ) : (
          <Box mt={10}>
            <Table.Root size="md">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Email</Table.ColumnHeader>
                  <Table.ColumnHeader>Kategori</Table.ColumnHeader>
                  <Table.ColumnHeader>Status</Table.ColumnHeader>
                  <Table.ColumnHeader>Aksi</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {reports.map((item) => (
                  <Table.Row key={item._id}>
                    <Table.Cell>{item.email}</Table.Cell>
                    <Table.Cell>
                      {getKategoriLabel(item.kategoriMasalah)}
                    </Table.Cell>
                    <Table.Cell textTransform="capitalize">
                      <NativeSelect.Root
                        size="sm"
                        width="150px"
                        color={getStatusColor(item.status)}
                      >
                        <NativeSelect.Field
                          value={item.status}
                          onChange={(e) =>
                            handleStatusChange(item._id, e.target.value)
                          }
                          style={{ fontWeight: "bolder" }}
                        >
                          {statusOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    </Table.Cell>
                    <Table.Cell>
                      <HStack spacing={2}>
                        <AdminReportDetail item={item} />
                        <Button
                          size="sm"
                          colorPalette="red"
                          variant={variantButton}
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

export default AdminReport;
