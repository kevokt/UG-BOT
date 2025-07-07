"use client";

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
  Textarea,
  Select as CSelect,
  Portal,
  createListCollection,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useColorModeValue } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/toaster";
import axios from "axios";
import { useState } from "react";

const kategoriList = createListCollection({
  items: [
    { label: "Informasi tidak sesuai", value: "informasi" },
    { label: "Bot tidak merespons", value: "bot_tidak_merespons" },
    { label: "Kesalahan teknis (bug)", value: "bug" },
    { label: "Masalah Pendaftaran", value: "pendaftaran" },
    { label: "Lainnya", value: "lainnya" },
  ],
});

const Report = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      namaLengkap: "",
      email: "",
      nomorTelepon: "",
      kategoriMasalah: "",
      pesan: "",
      website: "", // Honeypot field
    },
  });

  const [status, setStatus] = useState("");

  const onSubmit = async (data) => {
    if (data.website) {
      console.warn("Spam terdeteksi, form tidak dikirim");
      return;
    }
    const promise = axios.post("/api/report", data);

    promise
      .then(() => {
        setStatus("success");
        reset();
      })
      .catch(() => {
        setStatus("error");
      });

    toaster.promise(promise, {
      loading: {
        title: "Mengirim laporan...",
        description: "Silakan tunggu",
      },
      success: {
        title: "Laporan berhasil dikirim!",
        description: "Terima kasih atas laporannya.",
      },
      error: {
        title: "Gagal mengirim laporan",
        description: "Coba lagi nanti.",
      },
    });
  };

  return (
    <HStack>
      <Box mx="auto" maxWidth="1200px" width="98vw" minH="80vh" mb={12}>
        <Text
          as="h2"
          textAlign="center"
          fontSize="3xl"
          fontWeight="bolder"
          mt="50px"
        >
          Lapor Masalah
        </Text>

        <Center>
          <Box w={{ base: "95%", md: "80%" }} maxW="800px">
            <Box
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              bg={useColorModeValue("gray.100", "blackAlpha.400")}
              p={8}
              rounded="2xl"
              shadow="2xl"
              mb="8"
            >
              <Fieldset.Root size="lg" w="100%">
                <Stack align="center">
                  <Fieldset.Legend>Formulir Laporan Masalah</Fieldset.Legend>
                </Stack>

                <Fieldset.Content>
                  {/* Honeypot hidden field */}
                  <Input
                    {...register("website")}
                    name="website"
                    autoComplete="off"
                    tabIndex={-1}
                    style={{ display: "none" }}
                  />

                  <Field.Root>
                    <Field.Label>Nama Lengkap</Field.Label>
                    <Input
                      autoComplete="off"
                      {...register("namaLengkap")}
                      placeholder="Masukkan nama Anda"
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      Email <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      {...register("email", { required: true })}
                      type="email"
                      autoComplete="off"
                      placeholder="example@email.com"
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Nomor Telepon</Field.Label>
                    <Input
                      {...register("nomorTelepon")}
                      autoComplete="off"
                      placeholder="08xxxxxxxxxx"
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      Kategori Masalah <Field.RequiredIndicator />
                    </Field.Label>
                    <Controller
                      control={control}
                      name="kategoriMasalah"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <CSelect.Root collection={kategoriList}>
                          <CSelect.HiddenSelect
                            name={field.name}
                            value={field.value ?? ""}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                          <CSelect.Control>
                            <CSelect.Trigger>
                              <CSelect.ValueText placeholder="Pilih kategori masalah" />
                            </CSelect.Trigger>
                            <CSelect.IndicatorGroup>
                              <CSelect.Indicator />
                            </CSelect.IndicatorGroup>
                          </CSelect.Control>
                          <Portal>
                            <CSelect.Positioner>
                              <CSelect.Content>
                                {kategoriList.items.map((item) => (
                                  <CSelect.Item item={item} key={item.value}>
                                    {item.label}
                                    <CSelect.ItemIndicator />
                                  </CSelect.Item>
                                ))}
                              </CSelect.Content>
                            </CSelect.Positioner>
                          </Portal>
                        </CSelect.Root>
                      )}
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      Pesan / Deskripsi Masalah <Field.RequiredIndicator />
                    </Field.Label>
                    <Textarea
                      {...register("pesan", { required: true })}
                      placeholder="Jelaskan masalah yang Anda alami..."
                      rows={5}
                    />
                  </Field.Root>
                </Fieldset.Content>

                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  colorPalette="green"
                  alignSelf="flex-start"
                  mt={4}
                  variant={useColorModeValue("solid", "surface")}
                >
                  Kirim Laporan
                </Button>

                {status === "success" && (
                  <Text color="green.500" mt={4}>
                    Laporan berhasil dikirim. Terima kasih atas laporannya!
                  </Text>
                )}
                {status === "error" && (
                  <Text color="red.500" mt={4}>
                    Gagal mengirim laporan. Coba lagi nanti.
                  </Text>
                )}
              </Fieldset.Root>
            </Box>
          </Box>
        </Center>
      </Box>
    </HStack>
  );
};

export default Report;
