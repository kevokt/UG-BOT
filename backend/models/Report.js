import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
    {
        namaLengkap: String,
        email: { type: String, required: true },
        nomorTelepon: String,
        kategoriMasalah: {
            type: String,
            enum: ["informasi", "bot_tidak_merespons", "bug", "pendaftaran", "lainnya"],
            required: true,
        },
        pesan: { type: String, required: true },
    },
    { timestamps: true }
);

export const Report = mongoose.model("Report", reportSchema);