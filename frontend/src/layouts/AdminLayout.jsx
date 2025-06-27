import { Outlet } from "react-router-dom";
import AdminSidebarNav from "@/components/AdminNavbar/AdminSidebarNav"; // your admin sidebar/nav

const AdminLayout = () => {
  return (
    <>
      <AdminSidebarNav />
      <Outlet />
    </>
  );
};

export default AdminLayout;
