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
        website: { type: String, default: "" }, // Honeypot field untuk anti-spam
        status: {
            type: String,
            enum: ["pending", "in_progress", "resolved"],
            default: "pending",
        }
    },
    { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
export default Report;