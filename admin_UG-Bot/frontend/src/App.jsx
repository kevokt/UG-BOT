import { Box, Button, Container, HStack, VStack } from "@chakra-ui/react";
import {
  ColorModeButton,
  useColorMode,
  useColorModeValue,
} from "@/components/ui/color-mode";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Box minHeight={"100vh"} bg={useColorModeValue("gray.200", "gray.800")}>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </>
  );
}

export default App;
