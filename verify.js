var bitcoinjs = require("bitcoinjs-lib");
var bitcoinMessage = require('bitcoinjs-message')

var address = process.argv[2];
var signature = Buffer.from(process.argv[3], 'base64');
var data = process.argv[4];
console.log("verify", bitcoinMessage.verify(data, address, signature))


