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
import AdminNews from "./pages/admin/news/AdminNews";
import AdminReport from "./pages/admin/AdminReport";
import AdminRegistration from "./pages/admin/registration/AdminRegistration";
import AdminRegistrationEdit from "./pages/admin/registration/AdminRegistraionEdit";
import News from "./pages/client/News";
import Report from "./pages/client/Report";
import Chat from "./pages/client/Chat";
import AdminLayout from "./layouts/AdminLayout";
import ClientLayout from "./layouts/ClientLayout";
import AdminNewsCreate from "./pages/admin/news/AdminNewsCreate";
import AdminNewsEdit from "./pages/admin/news/AdminNewsEdit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Box minHeight={"100vh"} bg={useColorModeValue("gray.200", "gray.900")}>
          <Routes>
            {/* Client Layout */}
            <Route element={<ClientLayout />}>
              <Route index element={<Home />} />
              <Route path="/news" element={<News />} />
              <Route path="/report" element={<Report />} />
              <Route path="/chat" element={<Chat />} />
            </Route>

            <Route path="/login" element={<Login />} />

            {/* Admin Layout with Protected Route */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="news" element={<AdminNews />} />
              <Route path="news/create" element={<AdminNewsCreate />} />
              <Route path="news/edit/:id" element={<AdminNewsEdit />} />
              <Route path="report" element={<AdminReport />} />
              <Route path="registration" element={<AdminRegistration />} />
              <Route
                path="registration/edit/:id"
                element={<AdminRegistrationEdit />}
              />
            </Route>
          </Routes>
          <Toaster />
        </Box>
      </BrowserRouter>
    </>
  );
}

export default App;
