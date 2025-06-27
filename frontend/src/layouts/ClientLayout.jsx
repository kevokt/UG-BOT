import { Outlet } from "react-router-dom";
import ClientNav from "@/components/ClientNavbar/ClientNav"; // your client navbar

const ClientLayout = () => {
  return (
    <>
      <ClientNav />
      <Outlet />
    </>
  );
};

export default ClientLayout;
