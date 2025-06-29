import { Report } from "../models/Report.js";

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
