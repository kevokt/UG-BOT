import { FaChartBar, FaUser, FaBug } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa6";

export const adminNavItems = [
    {
        to: "/admin",
        label: "Dashboard",
        name: "dashboard",
        icon: FaChartBar,
    },
    {
        to: "/admin/news",
        label: "Kelola Berita",
        name: "news",
        icon: FaNewspaper,
    },
    {
        to: "/admin/report",
        label: "Kelola Laporan",
        name: "report",
        icon: FaBug,
    },
    {
        to: "/admin/registration",
        label: "Kelola Pendaftaran",
        name: "registration",
        icon: FaUser,
    },
];
