import { Outlet } from "react-router-dom";
import ClientNav from "@/components/ClientNavbar/ClientNav"; // your client navbar
import Footer from "@/components/misc/Footer"

const ClientLayout = () => {
  return (
    <>
      <ClientNav />
      <Outlet />
      <Footer />
    </>
  );
};

export default ClientLayout;
