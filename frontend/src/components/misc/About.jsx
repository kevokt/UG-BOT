import React from "react";
import { Box, Text, Container } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

const About = () => {
  return (
    <Box
      h="auto"
      minH="400px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      my={{ base: 8, md: 16 }}
      py={8}
    >
      <Container maxW="6xl" px="8">
        <Text
          as="h2"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          mb={6}
          textAlign="center"
        >
          Tentang UG-Bot
        </Text>
        <Text
          as="p"
          mb={4}
          fontSize={{ base: "sm", md: "lg" }}
          textAlign="justify"
          fontWeight="100"
        >
          <strong>UG-Bot</strong> adalah chatbot berbasis web yang dikembangkan
          untuk memberikan informasi seputar Universitas Gunadarma secara
          interaktif. Website ini memiliki berbagai fitur utama seperti chatbot
          informasi yang membantu menjawab pertanyaan seputar kampus, chatbot
          pendaftaran untuk proses registrasi mahasiswa baru, serta sistem admin
          yang memungkinkan pengelolaan berita terbaru, laporan pengguna, dan
          data pendaftaran mahasiswa.
        </Text>
        <Text
          as="p"
          mb={4}
          fontSize={{ base: "sm", md: "lg" }}
          textAlign="justify"
          fontWeight="100"
        >
          Proyek ini tidak memiliki afiliasi resmi dengan pihak Universitas
          Gunadarma. Pembuatan UG-Bot bertujuan sebagai bagian dari proyek tugas
          akhir skripsi Universitas Gunadarma. Pengembang chatbot dan website
          ini adalah Kevin Oktavian, mahasiswa program studi Informatika.
        </Text>
        <Text
          as="p"
          mb={16}
          fontSize={{ base: "sm", md: "lg" }}
          textAlign="justify"
          fontWeight="100"
        >
          UG-Bot dikembangkan menggunakan <strong>Botpress</strong> sebagai
          platform utama chatbot, yang bersifat open-source dan memungkinkan
          integrasi alur percakapan berbasis pengetahuan. Sementara itu,
          pengembangan website dilakukan menggunakan <strong>MERN Stack</strong>{" "}
          (MongoDB, Express.js, React.js, dan Node.js) dengan Chakra UI sebagai
          UI Library untuk tampilan antarmuka yang responsif dan modern.
        </Text>
      </Container>
    </Box>
  );
};

export default About;
