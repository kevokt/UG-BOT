import { Dialog, Portal, Button, CloseButton, Box } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

const AdminNewsDetail = ({ item }) => {
  if (!item) return null;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          size="sm"
          variant={useColorModeValue("surface", "surface")}
          colorPalette="gray"
        >
          Detail
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Detail Berita</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Box fontSize="sm" lineHeight="1.8">
                <p>
                  <strong>Judul:</strong> {item.title}
                </p>
                <p>
                  <strong>Penulis:</strong> {item.author}
                </p>
                <p>
                  <strong>Deskripsi Singkat:</strong> {item.description}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {item.isPublished ? "Published" : "Draft"}
                </p>
                <p>
                  <strong>Konten:</strong>
                </p>
                <Box
                  p={2}
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  mt={2}
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
                <p>
                  <strong>Dibuat pada:</strong>{" "}
                  {new Date(item.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Diperbarui pada:</strong>{" "}
                  {new Date(item.updatedAt).toLocaleString()}
                </p>
              </Box>
            </Dialog.Body>
            <Dialog.Footer>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`/news/${item.slug}`, "_blank")}
              >
                Lihat di Website
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

export default AdminNewsDetail;
