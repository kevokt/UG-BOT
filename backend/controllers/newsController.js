import News from "../models/News.js";

// Controller untuk membuat berita baru
export const createNews = async (req, res) => {
    try {
        const { title, author, content, isPublished } = req.body;

        // Validasi sederhana
        if (!title || !author || !content) {
            return res.status(400).json({ message: "Semua field wajib diisi." });
        }

        const newNews = new News({
            title,
            author,
            content,
            isPublished,
        });

        await newNews.save();
        return res.status(201).json({
            message: "Berita berhasil dibuat.",
            news: newNews,
        });
    } catch (error) {
        console.error("Error creating news:", error);
        return res.status(500).json({ message: "Terjadi kesalahan server." });
    }
};

export const getAllNews = async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 }); // Urutkan terbaru dulu
        res.status(200).json({ status: "Success", news });
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ message: "Gagal mengambil data berita" });
    }
};

export const getNewsById = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({ message: "Berita tidak ditemukan" });
        }

        res.status(200).json({
            status: "Success",
            news,
        });
    } catch (error) {
        console.error("Error fetching news by ID:", error);
        res.status(500).json({ message: "Terjadi kesalahan server." });
    }
};

export const updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, content, isPublished } = req.body;

        // Validasi sederhana
        if (!title || !author || !content) {
            return res.status(400).json({ message: "Semua field wajib diisi." });
        }

        const updatedNews = await News.findByIdAndUpdate(
            id,
            { title, author, content, isPublished },
            { new: true, runValidators: true }
        );

        if (!updatedNews) {
            return res.status(404).json({ message: "Berita tidak ditemukan." });
        }

        res.status(200).json({
            message: "Berita berhasil diperbarui.",
            news: updatedNews,
        });
    } catch (error) {
        console.error("Error updating news:", error);
        res.status(500).json({ message: "Terjadi kesalahan server." });
    }
};

export const deleteNews = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedNews = await News.findByIdAndDelete(id);

        if (!deletedNews) {
            return res.status(404).json({ message: "Berita tidak ditemukan." });
        }

        return res.status(200).json({
            message: "Berita berhasil dihapus.",
            news: deletedNews,
        });
    } catch (error) {
        console.error("Error deleting news:", error);
        return res.status(500).json({ message: "Terjadi kesalahan server." });
    }
};

export const getPublishedNews = async (req, res) => {
    try {
        const news = await News.find({ isPublished: true }).sort({ createdAt: -1 });
        res.status(200).json({ status: "Success", news });
    } catch (error) {
        console.error("Error fetching published news:", error);
        res.status(500).json({ message: "Gagal mengambil berita yang dipublikasikan" });
    }
}

export const getLatestNews = async (req, res) => {
    try {
        const news = await News.find({ isPublished: true }).sort({ createdAt: -1 }).limit(5);
        res.status(200).json({ status: "Success", news });
    } catch (error) {
        console.error("Error fetching latest news:", error);
        res.status(500).json({ message: "Gagal mengambil berita terbaru" });
    }
}