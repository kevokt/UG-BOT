import { Box, Button, Container, HStack, VStack } from "@chakra-ui/react";
import {
  ColorModeButton,
  useColorMode,
  useColorModeValue,
} from "@/components/ui/color-mode";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/admin/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./pages/client/Home";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { Toaster, toaster } from "@/components/ui/toaster";
import AdminNews from "./pages/admin/AdminNews";
import AdminReport from "./pages/admin/AdminReport";
import AdminRegistration from "./pages/admin/AdminRegistration";
import AdminRegistrationEdit from "./pages/admin/AdminRegistraionEdit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Box minHeight={"100vh"} bg={useColorModeValue("gray.200", "gray.800")}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/news"
              element={
                <ProtectedRoute>
                  <AdminNews />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/report"
              element={
                <ProtectedRoute>
                  <AdminReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/registration"
              element={
                <ProtectedRoute>
                  <AdminRegistration />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/registration/edit/:id"
              element={
                <ProtectedRoute>
                  <AdminRegistrationEdit />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster />
        </Box>
      </BrowserRouter>
    </>
  );
}

export default App;
