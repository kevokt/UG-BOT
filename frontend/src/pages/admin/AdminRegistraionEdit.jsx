import { useForm } from "react-hook-form";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  HStack,
  Text,
  Button,
  Field,
  Fieldset,
  Input,
  Stack,
  Center,
  NativeSelect,
} from "@chakra-ui/react";
import AdminSidebarNav from "@/components/AdminNavbar/AdminSidebarNav";
import { toaster } from "@/components/ui/toaster";
import { useColorModeValue } from "@/components/ui/color-mode";

const AdminRegistrationEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/botpress/registrations/${id}`);
        reset(res.data.data);
      } catch (err) {
        toaster.create({ title: "Gagal mengambil data", type: "error" });
      }
    };
    fetchData();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`/api/botpress/registrations/${id}`, data);
      toaster.create({ title: "Data berhasil diperbarui", type: "success" });
      navigate("/admin/registration");
    } catch (err) {
      toaster.create({ title: "Gagal memperbarui data", type: "error" });
    }
  };

  const fields = [
    ["nama", "Nama Lengkap"],
    ["nik", "NIK"],
    ["email", "Email"],
    ["nohp", "Nomor HP"],
    ["tghLahir", "Tanggal Lahir"],
    ["jenisKelamin", "Jenis Kelamin"],
    ["alamat", "Alamat"],
    ["asalSekolah", "Asal Sekolah"],
    ["jurusan1", "Jurusan 1"],
    ["jurusan2", "Jurusan 2"],
    ["jalurPendaftaran", "Jalur Pendaftaran"],
    ["region", "Region"],
  ];

  const pilihJalur = ["Pilih Jalur", "Jalur Lapor", "Jalur UTBK"];

  return (
    <HStack>
      <AdminSidebarNav active={"registration"} />
      <Box
        marginLeft={{ base: "8px", md: "250px" }}
        marginTop={{ base: "100px", md: "0px" }}
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
          Edit Data Pendaftaran
        </Text>

        <Center>
          <Box w="80%" maxW="800px">
            <Button
              mt={8}
              mb={4}
              onClick={() => navigate("/admin/registration")}
              colorPalette="red"
            >
              Kembali
            </Button>

            <Box
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              bg={useColorModeValue("gray.100", "blackAlpha.300")}
              p={8}
              rounded="2xl"
              shadow="2xl"
              mb="8"
            >
              <Fieldset.Root size="lg" w="100%">
                <Stack align="center">
                  <Fieldset.Legend>Edit Formulir</Fieldset.Legend>
                </Stack>

                <Fieldset.Content>
                  {fields.map(([name, label]) => (
                    <Field.Root key={name}>
                      <Field.Label>{label}</Field.Label>
                      <Input
                        {...register(name)}
                        placeholder={`Masukkan ${label}`}
                      />
                    </Field.Root>
                  ))}
                </Fieldset.Content>

                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  colorPalette="green"
                  alignSelf="flex-start"
                  mt={4}
                >
                  Simpan Perubahan
                </Button>
              </Fieldset.Root>
            </Box>
          </Box>
        </Center>
      </Box>
    </HStack>
  );
};

export default AdminRegistrationEdit;
