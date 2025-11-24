const express = require('express');
const mysql = require('mysql');
const BodyParser = require("body-parser");
const app = express();

app.use(BodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

const db = mysql.createConnection({
    host: "localhost",
    database: "school",
    user: "root",
    password: "",
});

// KONEKSI DATABASE
db.connect((err) => {
    if (err) throw err;
    console.log("database connected...");
});

// ROUTE HALAMAN UTAMA
app.get("/", (req, res) => {
    const sql = "SELECT * FROM user";
    db.query(sql, (err, result) => {
        if (err) return res.send(err);

        const users = JSON.parse(JSON.stringify(result));
        res.render("index", { users: users, title: "DAFTAR NAMA TIM PANCING" });
    });
});

// ROUTE TAMBAH DATA
app.post("/tambah", (req, res) => {
    const insertSql = `INSERT INTO user (nama, kelas) VALUES (?, ?)`;
    const values = [req.body.nama, req.body.kelas];

    db.query(insertSql, values, (err, result) => {
        if (err) return res.send(err);
        res.redirect("/");
    });
});

// MENJALANKAN SERVER
app.listen(8000, () => {
    console.log("server ready...");
});
