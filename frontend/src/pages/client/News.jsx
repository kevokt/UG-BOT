import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Text,
  Stack,
  Card,
  Heading,
  Spinner,
  Box,
  ButtonGroup,
  IconButton,
  Pagination,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
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

const News = () => {
  const cardBg = useColorModeValue("white", "blackAlpha.400");
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const limit = 5;

  const fetchPublishedNews = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/news/published?page=${pageNumber}&limit=${limit}`
      );
      setNewsList(response.data.news);
      setTotalItems(response.data.totalItems);
      setPage(pageNumber);
    } catch (error) {
      console.error("Gagal mengambil data berita:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublishedNews(1);
  }, []);

  return (
    <Box minH={"80vh"}>
      <Text
        as="h2"
        textAlign="center"
        fontSize="3xl"
        fontWeight="bolder"
        mt={"50px"}
      >
        News
      </Text>

      <Stack
        spacing={4}
        mt={6}
        px={{ base: 4, md: 8 }}
        alignItems={"center"}
        maxW="800px"
        mx="auto"
      >
        {loading ? (
          <Box textAlign="center">
            <Spinner size="lg" color="purple.500" />
          </Box>
        ) : newsList.length === 0 ? (
          <Text textAlign="center">Tidak ada berita tersedia.</Text>
        ) : (
          newsList.map((item) => (
            <Card.Root
              key={item._id}
              size="md"
              w="100%"
              bg={cardBg}
              boxShadow="md"
              borderRadius="xl"
              mb={2}
            >
              <Card.Header>
                <Heading size="md">{item.title}</Heading>
              </Card.Header>
              <Card.Body color="fg.muted">
                {truncateText(stripHtml(item.content), 300)}
              </Card.Body>
              <Card.Footer justifyContent="flex-end">
                <NewsDetail item={item} />
              </Card.Footer>
            </Card.Root>
          ))
        )}
      </Stack>

      {totalItems > limit && (
        <Box mt={8} mb={12} display="flex" justifyContent="center">
          <Pagination.Root
            count={totalItems}
            pageSize={limit}
            page={page}
            onPageChange={(e) => fetchPublishedNews(e.page)}
          >
            <ButtonGroup variant="outline" size="sm">
              <Pagination.PrevTrigger asChild>
                <IconButton aria-label="Prev page">
                  <LuChevronLeft />
                </IconButton>
              </Pagination.PrevTrigger>

              <Pagination.Items
                render={(pageItem) => (
                  <IconButton
                    key={pageItem.value}
                    onClick={() => fetchPublishedNews(pageItem.value)}
                    variant={{
                      base: "outline",
                      _selected: "solid",
                    }}
                    colorPalette={{
                      base: "none",
                      _selected: "purple",
                    }}
                    aria-current={pageItem.value === page ? "page" : undefined}
                  >
                    {pageItem.value}
                  </IconButton>
                )}
              />

              <Pagination.NextTrigger asChild>
                <IconButton aria-label="Next page">
                  <LuChevronRight />
                </IconButton>
              </Pagination.NextTrigger>
            </ButtonGroup>
          </Pagination.Root>
        </Box>
      )}
    </Box>
  );
};

export default News;
