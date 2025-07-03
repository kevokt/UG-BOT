import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Heading,
  Spinner,
  Stack,
  Container,
  useBreakpointValue,
  Card,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useColorModeValue } from "@/components/ui/color-mode";
import NewsDetail from "@/components/clientcomponents/NewsDetail";

const stripHtml = (html) => {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  const allowedTags = ["P", "SPAN", "DIV", "STRONG", "EM", "B", "I"];
  let result = "";
  const walk = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      result += node.textContent + " ";
    } else if (
      node.nodeType === Node.ELEMENT_NODE &&
      allowedTags.includes(node.tagName)
    ) {
      node.childNodes.forEach(walk);
    }
  };
  temp.childNodes.forEach(walk);
  return result.trim();
};

const truncateText = (text, limit = 150) => {
  if (text.length <= limit) return text;
  return text.substring(0, limit) + "...";
};

const NewsLatest = () => {
  const navigate = useNavigate();
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardBg = useColorModeValue("white", "blackAlpha.400");

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const res = await axios.get("/api/news/latest");
        setLatestNews(res.data.news || []);
      } catch (error) {
        console.error("Gagal mengambil berita terbaru:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  return (
    <Box minH="400px" py={{ base: 8, md: 16 }}>
      <Container maxW="6xl">
        <Text
          as="h2"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          mb={6}
          textAlign="center"
        >
          Berita Terbaru
        </Text>

        {loading ? (
          <Box textAlign="center">
            <Spinner size="lg" color="purple.500" />
          </Box>
        ) : (
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={4}
            align="stretch"
          >
            {latestNews.map((item) => (
              <Card.Root
                key={item._id}
                bg={cardBg}
                flex="1"
                size="md"
                boxShadow="md"
                borderRadius="xl"
              >
                <Card.Header>
                  <Heading size="md">{item.title}</Heading>
                </Card.Header>
                <Card.Body color="fg.muted">
                  {truncateText(stripHtml(item.content), 150)}
                </Card.Body>
                <Card.Footer justifyContent="flex-end">
                  <NewsDetail item={item} />
                </Card.Footer>
              </Card.Root>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default NewsLatest;
