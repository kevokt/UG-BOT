import { FaHome } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa6";
import { GoReport } from "react-icons/go";
import { IoIosChatboxes } from "react-icons/io";

export const clientNavItems = [
    { to: "/", label: "Home", key: "home", icon: FaHome },
    { to: "/news", label: "News", key: "news", icon: FaNewspaper },
    { to: "/report", label: "Report", key: "report", icon: GoReport },
    { to: "/chat", label: "Chat", key: "chat", icon: IoIosChatboxes },
];