import News from "../models/News.js";
import Report from "../models/Report.js"
import client from "../botpressClient.js";

export const getAdminDashboard = async (req, res) => {
    try {
        const [newsCount, reportCount, registrationResult] = await Promise.all([
            News.countDocuments(),
            Report.countDocuments(),
            client.findTableRows({
                table: 'registrationTable',
                limit: 1_000, // batas maksimum row yang ingin kamu hitung (adjust as needed)
                offset: 0,
                filter: {},
            }),
        ]);

        const registrationCount = registrationResult?.rows?.length || 0;

        res.status(200).json({
            message: "Berhasil mengambil data dashboard",
            newsCount,
            reportCount,
            registrationCount,
        });
    } catch (error) {
        console.error("Dashboard error:", error);
        res.status(500).json({ message: "Gagal mengambil data dashboard", error });
    }
};
