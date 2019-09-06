const loopback = require('loopback');
const Queue = require('bull');
const configRedis = require('../config_redis.json');
const configMail = require('../config_mail.json');
const configdbMail = require('../config_db_mail.json');
const nodemailer = require("nodemailer");
const emailWelcomeQueue = new Queue('lista-email-bienvenido', configRedis);
// const mysql = require('mysql');

console.log("-------- Incia la cola -------");

var con = mysql.createConnection(configdbMail);
var sector;
var sql;

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to Database"); 
});

emailWelcomeQueue.process( async (job, done) => {
  console.log("Envio de correo bienvenido job: ", job.id);
  let transporter = nodemailer.createTransport(configMail);
  usuario = job.data;
  transporter.sendMail({
        from: 'no-responder@accounting.com',
        to: usuario.email,
        subject: 'Bienvenido a accounting',
        text: 'Bienvenido a accounting '+ usuario.name, 
      }, (err, info) => {
        if (info !== undefined && info.envelope !== undefined && info.messageId !== undefined) {
            console.log(info.envelope);
            console.log(info.messageId);
        } else {
          console.log(err);
        }
      });
  done();
});