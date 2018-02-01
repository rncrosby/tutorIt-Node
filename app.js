const express = require('express')
const app = express()
var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "jccpnwq2vh48x8fd",
  publicKey: "gw4hwmmvycs5s4kf",
  privateKey: "b93b07e5ee813d9bb37cddf917343ebd"
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
  var nonceFromTheClient = req.body.payment_method_nonce;
  console.log("checkout")
});

app.get('/', (req, res) => {
  console.log("new")
    res.send('Hey, I\'m a Node.js app!')
})

app.listen(3000, () => {
    console.log('Server is up on 3000')
})
