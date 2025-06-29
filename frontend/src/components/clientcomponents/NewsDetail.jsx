import {
  Dialog,
  Portal,
  Button,
  CloseButton,
  Box,
  Text,
} from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.bubble.css";

const NewsDetail = ({ item }) => {
  if (!item) return null;
  const textColor = useColorModeValue("black", "white");
  const bgColor = useColorModeValue("gray.100", "gray.800");
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          size="sm"
          variant={useColorModeValue("surface", "surface")}
          colorPalette="gray"
        >
          Lihat Detail
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="3xl" bg={bgColor}>
            <Dialog.Header justifyContent={"center"}>
              <Dialog.Title>{item.title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Box fontSize="sm" color="gray.600" mb={4}>
                <Text color={textColor}>
                  <strong>Penulis:</strong> {item.author || "Tidak diketahui"}
                </Text>
                <Text color={textColor}>
                  <strong>Dibuat pada:</strong>{" "}
                  {new Date(item.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Text>
                <Text color={textColor}>
                  <strong>Diperbarui pada:</strong>{" "}
                  {new Date(item.updatedAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Text>
              </Box>

              <Box
                sx={{
                  borderRadius: "md",
                  overflow: "hidden",
                  fontSize: "md",
                  lineHeight: "1.8",
                  p: 0,
                }}
              >
                <ReactQuill
                  value={item.content}
                  readOnly={true}
                  theme="bubble"
                  className="read-only-quill"
                />
              </Box>
            </Dialog.Body>
            <Dialog.Footer />
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default NewsDetail;
