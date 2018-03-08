const express = require('express')
const app = express();
var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "jccpnwq2vh48x8fd",
  publicKey: "gw4hwmmvycs5s4kf",
  privateKey: "b93b07e5ee813d9bb37cddf917343ebd"
});


let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'tutorit.development@gmail.com', // generated ethereal user
        pass: '1EstateDr' // generated ethereal password
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
  var name = req.query.name
  var email = req.query.email
  var code = req.query.code
  var text = '<p>Welcome to TutorTree, ' + name + '<br><br><p>Here is your verification code to get started.<br><br><b>' + code + '</b>'
  let mailOptions = {
    from: '"TutorTree Verification" <tutorit.development@gmail.com>', // sender address
    to: email, // list of receivers
    subject: 'Your Verification Code', // Subject line
    text: text, // plain text body
    html: text // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
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
