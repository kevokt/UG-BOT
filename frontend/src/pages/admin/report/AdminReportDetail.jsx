"use client";

import {
  Dialog,
  Portal,
  Button,
  CloseButton,
  Box,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

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

const AdminReportDetail = ({ item }) => {
  if (!item) return null;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          size="sm"
          variant={useColorModeValue("surface", "surface")}
          colorPalette={"gray"}
          mr={2}
        >
          Detail
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="lg">
            <Dialog.Header>
              <Dialog.Title>Detail Laporan</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack align="start" spacing={3} fontSize="sm">
                <Text>
                  <strong>Nama:</strong> {item.namaLengkap || "-"}
                </Text>
                <Text>
                  <strong>Email:</strong> {item.email}
                </Text>
                <Text>
                  <strong>No HP:</strong> {item.nomorTelepon || "-"}
                </Text>
                <Text>
                  <strong>Kategori:</strong>{" "}
                  {getKategoriLabel(item.kategoriMasalah)}
                </Text>
                <Text>
                  <strong>Status:</strong>{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    {item.status}
                  </span>
                </Text>
                <Text whiteSpace="pre-line">
                  <strong>Pesan:</strong> {item.pesan || "Tidak ada pesan"}
                </Text>
                <Text>
                  <strong>Dibuat:</strong>{" "}
                  {new Date(item.createdAt).toLocaleString()}
                </Text>
                <Text>
                  <strong>Terakhir Diupdate:</strong>{" "}
                  {new Date(item.updatedAt).toLocaleString()}
                </Text>
              </VStack>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" position="absolute" top="2" right="2" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AdminReportDetail;
