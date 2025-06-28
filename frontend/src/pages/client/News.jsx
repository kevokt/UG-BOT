import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text, Stack, Card, Heading, Spinner, Box } from "@chakra-ui/react";

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

const truncateText = (text, limit = 500) => {
  if (text.length <= limit) return text;
  return text.substring(0, limit) + "...";
};

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPublishedNews = async () => {
    try {
      const response = await axios.get("/api/news/published");
      setNewsList(response.data.news);
    } catch (error) {
      console.error("Gagal mengambil data berita:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublishedNews();
  }, []);

  return (
    <>
      <Text
        as="h2"
        textAlign="center"
        fontSize="3xl"
        fontWeight="bolder"
        mt={{ base: "0px", md: "50px" }}
      >
        News
      </Text>

      <Stack spacing={4} mt={6} px={{ base: 4, md: 8 }}>
        {loading ? (
          <Box textAlign="center">
            <Spinner size="lg" color="purple.500" />
          </Box>
        ) : newsList.length === 0 ? (
          <Text textAlign="center">Tidak ada berita tersedia.</Text>
        ) : (
          newsList.map((item) => (
            <Card.Root key={item._id} size="lg">
              <Card.Header>
                <Heading size="md">{item.title}</Heading>
              </Card.Header>
              <Card.Body color="fg.muted">
                {truncateText(stripHtml(item.content), 50)}
              </Card.Body>
            </Card.Root>
          ))
        )}
      </Stack>
    </>
  );
};

export default News;
