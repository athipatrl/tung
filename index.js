const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql'); //as we use a MySQL database
const nodemailer = require('nodemailer'); //to send mails
var cors = require('cors');
const mongoose = require('mongoose')


const Server = "http://localhost:3000/";

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


mongoose.connect("mongodb://localhost:27017/productDB",{

useNewUrlParser:true,
useUnifiedTopology:true


}).catch(err=>
    
console.log(err)

    )

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
     user: "magtavicchiken43@gmail.com",
     pass: "123456"
    }
    });


    app.listen(process.env.PORT || 5000, () => {
        console.log("Server is listening...url: " + Server);
       });





       app.get('http://localhost:3000/', (req, res) => {
        res.json({
         "message": "Hi this is mail tracker node server",
         "url": Server
        });
       });

       app.route('/sendmail').post((req, res) => {
        let Sender = req.body['Sender'];
        let Recipient = req.body['Recipient'];
        let MessageBody = req.body['MessageBody'];
        let Subject = req.body['Subject'];
       
        let htmlBody = '<p>' + MessageBody + '</p>' + '<img src = "' + Server + '/recipients/' + Recipient + '" style="display:none">';
        var mailOptions = {
          from: Sender,
          to: Recipient,
          subject: Subject,
          html: htmlBody
        };
        transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
         console.log(error);
        } else {
         conn.query('INSERT INTO recipients(email)  VALUES(?)',[Recipient],
         (err, rows) => {
           if (err) {
             throw err,
             console.log(err);
           } else {
               res.send({ "status": "success" });
           }
         });
        }
        });
       })