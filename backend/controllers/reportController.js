import Report from "../models/Report.js";

export const createReport = async (req, res) => {
    try {
        // Honeypot anti-spam
        if (req.body.website) {
            return res.status(400).json({ message: "Spam terdeteksi" });
        }

        const { namaLengkap, email, nomorTelepon, kategoriMasalah, pesan } = req.body;

        const report = await Report.create({
            namaLengkap,
            email,
            nomorTelepon,
            kategoriMasalah,
            pesan,
        });

        res.status(201).json({ message: "Laporan berhasil dikirim", report });
    } catch (error) {
        console.error("Gagal membuat laporan:", error);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};

export const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find().sort({ createdAt: -1 }); // Urutkan berdasarkan tanggal terbaru
        res.status(200).json({ status: "Success", reports });
    } catch (error) {
        console.error("Gagal mengambil laporan:", error);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
}

export const deleteReport = async (req, res) => {
    try {
        const { id } = req.params;

        const report = await Report.findByIdAndDelete(id);
        if (!report) {
            return res.status(404).json({ message: "Laporan tidak ditemukan" });
        }

        res.status(200).json({ message: "Laporan berhasil dihapus", report });
    } catch (error) {
        console.error("Gagal menghapus laporan:", error);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
}

export const toggleReportStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["pending", "in_progress", "resolved"].includes(status)) {
            return res.status(400).json({ message: "Status tidak valid" });
        }

        const report = await Report.findByIdAndUpdate(id, { status }, { new: true });
        if (!report) {
            return res.status(404).json({ message: "Laporan tidak ditemukan" });
        }

        res.status(200).json({ message: "Status laporan berhasil diperbarui", report });
    } catch (error) {
        console.error("Gagal memperbarui status laporan:", error);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
}