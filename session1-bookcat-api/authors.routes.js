const sql = require("mssql");
const dbConfig = require('./dbconfig');

module.exports = function (app) {
    app.get("/authors", async (req, res) => {
    let coSnnection;
    try {
        connection = await sql.connect(dbConfig);
        const sqlQuery = "SELECT AuthorID, Name FROM Author";
        const request = connection.request();
        const result = await request.query(sqlQuery);
        res.json(result.recordset);

    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }    finally {
            if (connection) 
                try{
                    await connection.close();
                } catch (closeError) {
                    console.error("Error closing connection:", closeError);
                }
            }
    });

};