var express = require('express')
var braintree = require("braintree");
var app = express()

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "jccpnwq2vh48x8fd",
  publicKey: "gw4hwmmvycs5s4kf",
  privateKey: "b93b07e5ee813d9bb37cddf917343ebd"
});

app.get('/', function (req, res) {
  res.send('Hello Digital Ocean!')
})

app.listen(3000, function () {
  console.log('Magic is happening on port 3000!')
})
