const express = require('express');
const mysql = require('mysql');

const app = express();

app.set("view engine", "ejs")
app.set("views", "views")

const db = mysql.createConnection({
    host: "localhost",
    database: "school",
    user: "root",
    password: "",
})

db.connect((err) => {
    if (err) throw err
    console.log("database connected...")

    const sql = "SELECT * FROM user"
    db.query(sql, (err, result) => {
        console.log("hasil database -> ", result)
        const user = JSON.parse(JSON.stringify(result))
        console.log("hasil database -> ", user)
        app.get("/", (req, res) => {
            res.render("index", {users: user, title: "WELCOME PAUL TO OUR PAGE"})
        }) 
    })    
})

app.listen(8000, () =>{
    console.log("server ready...")
})