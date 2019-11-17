const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
var nodemailer = require("nodemailer");


const app = express();

// API file for interacting with MongoDB
const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));



/*
	Here we are configuring our SMTP Server details.
	STMP is mail server which is responsible for sending and recieving email.
*/
// var smtpTransport = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//         user: "riyag748@gmail.com",
//         pass: "yadavmandeep098765"
//     }
// });
// var rand,mailOptions,host,link;
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

// app.get('/',function(req,res){
// 	res.sendfile('index.html');
// });


// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist/try')));

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/try/index.html'));
});

app.listen(3000,function(){
    console.log("listen to port 3000");
});