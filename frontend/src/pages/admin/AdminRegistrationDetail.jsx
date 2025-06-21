// components/AdminDialog/AdminRegistrationDetail.jsx
import { Dialog, Portal, Button, CloseButton, Box } from "@chakra-ui/react";

const AdminRegistrationDetail = ({ item }) => {
  if (!item) return null;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button size="sm" variant="outline">
          Detail
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Detail Pendaftaran</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Box fontSize="sm" lineHeight="1.8">
                <p>
                  <strong>Nama:</strong> {item.nama}
                </p>
                <p>
                  <strong>NIK:</strong> {item.nik}
                </p>
                <p>
                  <strong>Email:</strong> {item.email}
                </p>
                <p>
                  <strong>No HP:</strong> {item.nohp}
                </p>
                <p>
                  <strong>Tanggal Lahir:</strong> {item.tghLahir}
                </p>
                <p>
                  <strong>Jenis Kelamin:</strong> {item.jenisKelamin}
                </p>
                <p>
                  <strong>Alamat:</strong> {item.alamat}
                </p>
                <p>
                  <strong>Asal Sekolah:</strong> {item.asalSekolah}
                </p>
                <p>
                  <strong>Jurusan 1:</strong> {item.jurusan1}
                </p>
                <p>
                  <strong>Jurusan 2:</strong> {item.jurusan2}
                </p>
                <p>
                  <strong>Jalur Pendaftaran:</strong> {item.jalurPendaftaran}
                </p>
                <p>
                  <strong>Region:</strong> {item.region}
                </p>
                <p>
                  <strong>Email Terkirim:</strong>{" "}
                  {item.isEmailSent ? "Ya" : "Belum"}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(item.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Updated At:</strong>{" "}
                  {new Date(item.updatedAt).toLocaleString()}
                </p>
              </Box>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Ubah Status Email</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AdminRegistrationDetail;
