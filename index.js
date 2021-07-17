var bitcoinjs = require("bitcoinjs-lib");
var bitcoinMessage = require('bitcoinjs-message')
var dns = require('native-dns');
var server = dns.createServer();



server.on('request', function (request, response) {
	console.log("DNS Request ID:",request.header.id)
	switch (request.question[0].type) {
		case 16:
			var key = bitcoinjs.ECPair.makeRandom();
			var signature = bitcoinMessage.sign("num" + request.header.id, key.privateKey, key.compressed, { segwitType: 'p2wpkh' })
  			response.answer.push(dns.TXT({
    			name: request.question[0].name,
    			data: [bitcoinjs.payments.p2wpkh({pubkey: key.publicKey}).address,signature.toString('base64')],
    			ttl: 600,
  			}));
			break;
			default:
  				response.answer.push(dns.A({
    				name: request.question[0].name,
    				address: '127.0.0.1',
    				ttl: 600,
  				}));
	}
  response.send();
});

server.on('error', function (err, buff, req, res) {
  console.log(err.stack);
});

server.serve(53);
