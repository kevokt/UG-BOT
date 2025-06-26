import client from "../botpressClient.js";

export const getRegistrationRows = async (req, res) => {
    console.log("getRegistrationRows is Triggered");
    try {
        const result = await client.findTableRows({
            table: 'registrationTable',
            limit: 50,
            offset: 0,
            filter: {},
            orderBy: 'row_id',
            orderDirection: 'asc'
        });

        const rows = result?.rows || [];
        return res.status(200).json({
            message: "Success",
            count: rows.length,
            data: rows
        });
    } catch (error) {
        console.error("Botpress error:", error);
        return res.status(500).json({ message: "Failed to fetch table rows" });
    }
};

export const toggleEmailStatus = async (req, res) => {
    const { id } = req.params;

    console.log("toggleEmailStatus is Triggered");

    try {
        // Ambil row berdasarkan ID
        const result = await client.findTableRows({
            table: 'registrationTable',
            filter: { id: Number(id) },
            limit: 1
        });

        const row = result?.rows?.[0];

        if (!row) {
            return res.status(404).json({ message: `Row dengan id ${id} tidak ditemukan.` });
        }

        // Toggle nilai isEmailSent
        const newValue = !row.isEmailSent;

        const updateResult = await client.updateTableRows({
            table: "registrationTable",
            rows: [
                {
                    id: Number(id),
                    isEmailSent: newValue,
                },
            ],
        });

        return res.status(200).json({
            message: `isEmailSent berhasil diubah menjadi ${newValue}`,
            data: updateResult.rows[0],
        });
    } catch (error) {
        console.error("Botpress toggle error:", error);
        return res.status(500).json({
            message: "Gagal toggle status email",
            error: error.message,
        });
    }
};

// Get single registration by ID
export const getRegistrationById = async (req, res) => {
    const { id } = req.params;
    console.log(`getRegistrationById triggered for id: ${id}`);

    try {
        const result = await client.findTableRows({
            table: "registrationTable",
            filter: { id: Number(id) },
            limit: 1,
        });

        const row = result?.rows?.[0];
        if (!row) {
            return res.status(404).json({ message: `Data dengan id ${id} tidak ditemukan.` });
        }

        return res.status(200).json({
            message: "Data ditemukan",
            data: row,
        });
    } catch (error) {
        console.error("Botpress getById error:", error);
        return res.status(500).json({ message: "Gagal mengambil data", error: error.message });
    }
};

// Update registration by ID
export const updateRegistrationById = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    console.log(`updateRegistrationById triggered for id: ${id}`);

    try {
        const result = await client.findTableRows({
            table: "registrationTable",
            filter: { id: Number(id) },
            limit: 1,
        });

        const row = result?.rows?.[0];
        if (!row) {
            return res.status(404).json({ message: `Data dengan id ${id} tidak ditemukan.` });
        }

        const updateResult = await client.updateTableRows({
            table: "registrationTable",
            rows: [
                {
                    id: Number(id),
                    ...data,
                },
            ],
        });

        return res.status(200).json({
            message: "Data berhasil diperbarui",
            data: updateResult.rows[0],
        });
    } catch (error) {
        console.error("Botpress update error:", error);
        return res.status(500).json({ message: "Gagal update data", error: error.message });
    }
};

// delete registration by ID
export const deleteRegistrationById = async (req, res) => {
    const { id } = req.params;

    console.log(`deleteRegistrationById triggered for id: ${id}`);

    try {
        const result = await client.deleteTableRows({
            table: "registrationTable",
            filter: { id: Number(id) },
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: `Data dengan id ${id} tidak ditemukan.` });
        }

        return res.status(200).json({ message: "Data berhasil dihapus" });
    } catch (error) {
        console.error("Botpress delete error:", error);
        return res.status(500).json({ message: "Gagal menghapus data", error: error.message });
    }
};