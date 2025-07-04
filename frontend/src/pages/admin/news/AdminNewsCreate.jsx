import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
  Switch,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { useColorModeValue } from "@/components/ui/color-mode";
import axios from "@/utils/axiosAuth";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const AdminNewsCreate = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      title: "",
      author: "",
      content: "",
      isPublished: false,
    },
  });

  const onSubmit = async (data) => {
    console.log("Data yang akan dikirim:", data);
    // Implement API logic here
    try {
      const response = await axios.post("/api/news", data);

      if (response.data?.news) {
        toaster.create({
          title: "Berita berhasil dibuat!",
          type: "success",
        });

        reset();
        navigate("/admin/news");
      }
    } catch (err) {
      console.error("Error:", err);
      toaster.create({
        title: err.response?.data?.message || "Gagal membuat berita",
        type: "error",
      });
    }
  };

  return (
    <HStack>
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
          Create Data Berita
        </Text>

        <Center>
          <Box w="80%" maxW="800px">
            <Button
              mt={8}
              mb={4}
              onClick={() => navigate("/admin/news")}
              colorPalette="red"
              variant={useColorModeValue("solid", "surface")}
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
                  <Fieldset.Legend>Formulir Berita</Fieldset.Legend>
                </Stack>

                <Fieldset.Content>
                  <Field.Root>
                    <Field.Label>Judul Berita</Field.Label>
                    <Input
                      {...register("title")}
                      placeholder={"Masukkan Judul Berita"}
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Author</Field.Label>
                    <Input
                      {...register("author")}
                      placeholder={"Masukkan Author"}
                    />
                  </Field.Root>

                  <Controller
                    marginTop="45px"
                    name="isPublished"
                    control={control}
                    render={({ field }) => (
                      <Field.Root>
                        <Field.Label>Publikasikan</Field.Label>
                        <Switch.Root
                          name={field.name}
                          checked={field.value}
                          colorPalette={"purple"}
                          onCheckedChange={({ checked }) =>
                            field.onChange(checked)
                          }
                        >
                          <Switch.HiddenInput onBlur={field.onBlur} />
                          <Switch.Control />
                          <Switch.Label>Tampilkan ke Publik</Switch.Label>
                        </Switch.Root>
                      </Field.Root>
                    )}
                  />

                  <Controller
                    name="content"
                    control={control}
                    render={({ field }) => (
                      <Field.Root>
                        <Field.Label>Isi Berita</Field.Label>
                        <ReactQuill
                          theme="snow"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          style={{
                            width: "100%",
                          }}
                        />
                      </Field.Root>
                    )}
                  />
                </Fieldset.Content>

                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  colorPalette="green"
                  alignSelf="flex-start"
                  mt={4}
                  variant={useColorModeValue("solid", "surface")}
                >
                  Create News
                </Button>
              </Fieldset.Root>
            </Box>
          </Box>
        </Center>
      </Box>
    </HStack>
  );
};

export default AdminNewsCreate;
