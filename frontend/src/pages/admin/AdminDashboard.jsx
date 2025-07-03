"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Text, Icon, Flex, SimpleGrid, Spinner } from "@chakra-ui/react";
import { FaNewspaper, FaBug, FaUsers } from "react-icons/fa";
import { useColorModeValue } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/toaster";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [newsCount, setNewsCount] = useState(0);
  const [reportCount, setReportCount] = useState(0);
  const [registrationCount, setRegistrationCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("/api/dashboard/data");
        const { newsCount, reportCount, registrationCount } = response.data;

        setNewsCount(newsCount);
        setReportCount(reportCount);
        setRegistrationCount(registrationCount);
        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
        toaster.create({
          title: "Gagal mengambil data dashboard",
          type: "error",
        });
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Box
      flex="1"
      p={4}
      ml={{ base: "unset", md: "300px" }}
      mx={{ base: "4", "2xl": "auto" }}
      mr={{ base: "8", md: "60px" }}
      maxWidth={{ base: "100%", xl: "1000px" }}
      rounded="lg"
    >
      <Text
        as="h2"
        textAlign="center"
        fontSize="3xl"
        fontWeight="bold"
        mt={{ base: "0px", md: "50px" }}
        mb={10}
      >
        Selamat datang di Admin Dashboard
      </Text>

      <Flex justify="center">
        <SimpleGrid
          columns={{ base: 1, sm: 1, md: 1, xl: 3 }}
          spacing={8}
          justifyItems="center"
        >
          <StatBox
            icon={FaNewspaper}
            label="Jumlah Berita"
            count={newsCount}
            bgColor={useColorModeValue("purple.600", "purple.800")}
            to="/admin/news"
            loading={loading}
          />
          <StatBox
            icon={FaBug}
            label="Jumlah Laporan"
            count={reportCount}
            bgColor={useColorModeValue("red.400", "red.800")}
            to="/admin/report"
            loading={loading}
          />
          <StatBox
            icon={FaUsers}
            label="Jumlah Registrasi"
            count={registrationCount}
            bgColor={useColorModeValue("green.400", "green.800")}
            to="/admin/registration"
            loading={loading}
          />
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

const StatBox = ({ icon, label, count, bgColor, to, loading }) => {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <Box
        w={{ base: "500px", xl: "200px" }}
        h={{ base: "auto", xl: "500px" }}
        mx={4}
        my={4}
        display="flex"
        flexDirection={{ base: "row", md: "column" }}
        alignItems="center"
        justifyContent="center"
        bg={bgColor}
        color="white"
        p={6}
        borderRadius="2xl"
        boxShadow="md"
        gap={4}
        textAlign={{ base: "left", md: "center" }}
        transition="all 0.3s ease"
        _hover={{
          transform: "scale(1.03)",
          boxShadow: "lg",
          cursor: "pointer",
        }}
      >
        <Icon as={icon} boxSize={16} />
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            {label}
          </Text>
          {loading ? (
            <Spinner size="md" color="white" />
          ) : (
            <Text fontSize="3xl" fontWeight="extrabold">
              {count}
            </Text>
          )}
        </Box>
      </Box>
    </Link>
  );
};

export default AdminDashboard;
