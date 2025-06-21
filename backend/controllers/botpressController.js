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
