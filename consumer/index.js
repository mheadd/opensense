// Include required modules.
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var cradle = require('cradle');

// Set up connection to CouchDB.
var db = new(cradle.Connection)().database('realtime');

// Set up Express app.
var app = express();
app.use(bodyParser.json({ type: 'text/plain' }));
app.listen(3000);

// Default GET route.
app.get('/', function(req, res){
	res.status(200).end();
});

// Route to receive notifications publish on a topic
app.post('/', function(req, res){
	if(req.body.Type == 'SubscriptionConfirmation') {
		var url = req.body.SubscribeURL;
		request(url, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    console.log(body);
		    res.status(200).end();
		  }
		  else {
		  	console.log('Error: ' + response.statusCode);
		  }
		});
	}
	else {

		// Display the message in realtime.
		console.log(req.body);

		// Save message in CouchDB.
		db.save(JSON.parse(req.body.Message), function(error, response){
			if(error) {
				console.log(err);
				res.status(500).end();
			}
			else {
				res.status(200).end();
			}

		});
	}
});