const sql = require("mssql");
const dbConfig = require('./dbconfig');

module.exports = function (app) {
    app.get("/publishers", async (req, res) => {
        let connection;
        try {
            connection = await sql.connect(dbConfig);
            const result = await connection.request()
                .query("SELECT PublisherID, Name FROM Publisher");
            res.json(result.recordset);
        } catch (err) {
            res.status(500).json({ error: "Database error" });
        } finally {
            if (connection) {
                try { await connection.close(); }
                catch (closeError) { console.error("Error closing connection:", closeError); }
            }
        }
    });


    app.get("/publishers/:id", async (req, res) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "id must be a number" });
        let connection;
        try {
            connection = await sql.connect(dbConfig);
            const result = await connection.request()
                .input("id", sql.SmallInt, id)
                .query("SELECT PublisherID, Name FROM Publisher WHERE PublisherID = @id");
            if (result.recordset.length === 0) {
                return res.status(404).json({ error: "Publisher not found" });
            }
            res.json(result.recordset[0]);
        } catch (err) {
            res.status(500).json({ error: "Database error" });
        } finally {
            if (connection) {
                try { await connection.close(); }
                catch (closeError) { console.error("Error closing connection:", closeError); }
            }
        }
    });


    app.post("/publishers", async (req, res) => {
        const { publisherId, name } = req.body;
        let connection;
        try {
            connection = await sql.connect(dbConfig);
            await connection.request()
                .input("publisherId", sql.SmallInt, publisherId)
                .input("name", sql.VarChar(50), name)
                .query("INSERT INTO Publisher (PublisherID, Name) VALUES (@publisherId, @name)");
            res.status(201).json({ PublisherID: publisherId, Name: name });
        } catch (err) {
            res.status(500).json({ error: "Database error" });
        } finally {
            if (connection) {
                try { await connection.close(); }
                catch (closeError) { console.error("Error closing connection:", closeError); }
            }
        }
    });


    app.put("/publishers/:id", async (req, res) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "id must be a number" });
        const { name } = req.body;
        let connection;
        try {
            connection = await sql.connect(dbConfig);
            const result = await connection.request()
                .input("id", sql.SmallInt, id)
                .input("name", sql.VarChar(50), name)
                .query("UPDATE Publisher SET Name = @name WHERE PublisherID = @id");
            if (result.rowsAffected[0] === 0) {
                return res.status(404).json({ error: "Publisher not found" });
            }
            res.status(200).json({ PublisherID: id, Name: name });
        } catch (err) {
            res.status(500).json({ error: "Database error" });
        } finally {
            if (connection) {
                try { await connection.close(); }
                catch (closeError) { console.error("Error closing connection:", closeError); }
            }
        }
    });


    app.delete("/publishers/:id", async (req, res) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "id must be a number" });
        let connection;
        try {
            connection = await sql.connect(dbConfig);
            const result = await connection.request()
                .input("id", sql.SmallInt, id)
                .query("DELETE FROM Publisher WHERE PublisherID = @id");
            if (result.rowsAffected[0] === 0) {
                return res.status(404).json({ error: "Publisher not found" });
            }
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: "Database error" });
        } finally {
            if (connection) {
                try { await connection.close(); }
                catch (closeError) { console.error("Error closing connection:", closeError); }
            }
        }
    });
};



