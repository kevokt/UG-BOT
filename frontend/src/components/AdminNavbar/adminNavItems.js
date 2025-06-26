import { FaChartBar, FaNewspaper, FaUser } from "react-icons/fa";
import { GoReport } from "react-icons/go";


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
        icon: GoReport,
    },
    {
        to: "/admin/registration",
        label: "Kelola Pendaftaran",
        name: "registration",
        icon: FaUser,
    },
];
