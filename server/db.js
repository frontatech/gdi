let mysql = require('mysql')
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gdidb",
    multipleStatements: true,
})

db.connect(error =>{
    if(error) return console.log("Database connection declined")
    console.log('database connection establish')
})

module.exports = db