import { Dialog, Portal, Button, CloseButton, Box } from "@chakra-ui/react";
import { RiMailLine, RiWhatsappFill } from "react-icons/ri";
import { MdOutlineMail } from "react-icons/md";
import { useColorModeValue } from "@/components/ui/color-mode";

const AdminRegistrationDetail = ({ item }) => {
  if (!item) return null;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          size="sm"
          variant={useColorModeValue("surface", "surface")}
          colorPalette={"gray"}
        >
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
                  {item.isEmailSent ? "Sudah" : "Belum"}
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
              Contact Options:
              <Button
                variant="solid"
                as={"a"}
                target={"_blank"}
                colorPalette={"green"}
                rel="noopener noreferrer"
                href={`https://wa.me/${item.nohp}`}
              >
                <RiWhatsappFill /> Whatsapp
              </Button>
              <Button
                variant="solid"
                as="a"
                target="_blank"
                colorPalette={
                  item.jalurPendaftaran.trim() === "Jalur Rapor"
                    ? "green"
                    : "blue"
                }
                rel="noopener noreferrer"
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${
                  item.email
                }&su=${encodeURIComponent(
                  `Konfirmasi Verifikasi ${item.jalurPendaftaran.trim()}`
                )}&body=${encodeURIComponent(
                  `Halo ${item.nama.trim()},\n\n${
                    item.jalurPendaftaran.trim() === "Jalur Rapor"
                      ? `Selamat! Data Anda untuk Jalur Rapor telah berhasil kami verifikasi.\n\nBiaya pendaftaran akan segera kami kirimkan ke rekening XXX XXX XXX.`
                      : `Data Anda untuk Jalur UTBK telah berhasil kami verifikasi.\n\nBiaya pendaftaran akan segera kami kirimkan ke rekening XXX XXX XXX.`
                  }\n\nApabila ada pertanyaan lebih lanjut, silakan hubungi tim kami.\n\nSalam,\nTim Penerimaan UG-Bot`
                )}`}
              >
                <RiMailLine />{" "}
                {item.jalurPendaftaran.trim() === "Jalur Rapor"
                  ? "Email (Rapor)"
                  : "Email (UTBK)"}
              </Button>
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
