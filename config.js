const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

app.use(bodyParser.json());

const con = mysql.createConnection({
    host : 'localhost',
    user : 'andik',
    password : 'andik',
    database : 'restful'
});

con.connect((err) => {
    if(err) throw err;
    console.log('Mysql Connected');
});

// get
app.get("/api/produk", (req, res) => {
    let sql = "select * from produk";
    let query = con.query(sql, (err, result) => {
        if(err)
            res.send(err);
        res.json(result);
    });
});

// get by id
app.get("/api/produk/:id", (req, res) => {
    let sql = "select * from produk where id=" + req.params.id;
    let query = con.query(sql, (err, result) => {
        if(err)
            res.send(err);
        res.json(result);
    });
});

// insert
app.post("/api/produk", (req, res) => {
    let sql = "INSERT INTO produk (nama_produk, harga) VALUES ('"+req.body.nama_produk +"',"+ req.body.harga +")";
    let query = con.query(sql, (err, result) => {
        if (err)
            res.send(err);
        res.json({"status" : "ok"});
    });
});

// update
app.put("/api/produk/:id", (req, res) => {
    let sql = "UPDATE produk SET nama_produk='"+req.body.nama_produk+"', harga="+req.body.harga+" where id="+req.params.id;
    let query = con.query(sql, (err, result) => {
        if (err)
            res.send(err);
        res.json({"status": "ok"});
    });
});

// delete by id
app.delete("/api/produk/:id", (req, res) => {
    let sql = "DELETE FROM produk where id="+req.params.id;
    let query = con.query(sql, (err, result) => {
        if (err)
            res.send(err);
        res.json({"status" : "ok"});
    });
});

// delete all
app.delete("/api/produk/delete/all", (req, res) => {
    let sql = "TRUNCATE TABLE produk";
    let query = con.query(sql, (err, result) => {
        if (err)
            res.send(err);
        res.json({"status":"ok"});
    });
});

app.listen(8080, () => {
    console.log("server connected on port 8080");
});