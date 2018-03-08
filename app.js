const express = require('express')
const app = express()
const nodemailer = require('nodemailer');
var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "jccpnwq2vh48x8fd",
  publicKey: "gw4hwmmvycs5s4kf",
  privateKey: "b93b07e5ee813d9bb37cddf917343ebd"
});

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'tutorit.development@gmail.com',
        pass: '1EstateDr'
    }
});

app.get("/client_token", (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      console.log(err)
    } else {
      console.log("TOKEN")
      res.send(response.clientToken)
    }
  })
})

app.post("/checkout", function (req, res) {
  var nonceFromTheClient = req.query.nonce
  gateway.transaction.sale({
  amount: "10.00",
  paymentMethodNonce: nonceFromTheClient,
  options: {
    submitForSettlement: true
  }
  }, function (err, result) {
  res.send(result)
  })
})

app.post("/verifyEmail", function (req, res) {
  var email = req.query.email
  var code = req.query.code
  var emailText = '<p>Below you will find your TutorIt verification code. Use this code from within the app to activate your account and get started!</p><br><center><b></b><br>'
  const mailOptions = {
    from: 'tutorit.development@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'Your TutorIt Verification Code', // Subject line
    html: emailText// plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
     if(err)
       console.log(err)
     else
       console.log(info);
  });
  console.log("verify email"+email+"code"+code)
})

app.get('/', (req, res) => {
  console.log("new")
    res.send('Hey, I\'m a Node.js app!')
})

app.listen(3000, () => {
    console.log('Server is up on 3000')
})
