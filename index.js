var db = require('./connection')
const express = require('express');
const bodyParser = require('body-parser');
// const request = require('request');
var path = require('path');

const app = express();

// const http=require("http"); 
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get("/", function(req,res){
    res.render("index.html",{data:{}});
});


app.post("/", function(req, res){
    let name = req.body.Name;
    let phone = req.body.Phone;
    let email = req.body.Email;

    let data = {
        "name":name,
        "phone":phone,
        "email":email
    }

    db.connect(function(error){
        if (error) throw error;

        let sql = "INSERT INTO my_users(name, phone, email) VALUES(?, ?, ?)";
        db.query(sql, [name, phone, email], function(error, result){
            if (error) console.log(error);
            res.render("index.html",{data:data});

        })
    })
})


app.listen(port, function(){
    console.log("Server is running.")
})