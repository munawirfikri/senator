const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const nodeMailer = require('nodemailer');
const bodyParser = require('body-parser');
const { mainMail } = require('./utils/email');
const Swal = require('sweetalert2');

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('dotenv').config();

const port = 3000;


app.get('/', (_req, res) => {
    res.render('index', {
        layout: false
    })
});

app.post("/", async (req, res) => {
    const yourname = req.body.nama;
    const youremail = req.body.email;
    const yourmessage = req.body.pesan;
    const yoursubject = req.body.layanan;

    try {
      await mainMail(yourname, youremail, yoursubject, yourmessage);
      res.status(201).redirect("/?success=true");
    } catch (error) {
      res.send("Message Could not be Sent");
      console.log(error);
    }
  });

app.listen(port);
