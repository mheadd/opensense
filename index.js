// Include required modules.
var express = require('express');
var bodyParser = require('body-parser');
var AWS = require('aws-sdk');
var valid = require('url-valid');

// Include config.
var config = require('./config');

// Set up SNS object
AWS.config.update(config.config.aws);
var sns = new AWS.SNS();

// Set up Express app.
var app = express();
app.use(bodyParser.json());
app.listen(4000);

// Route to get list of topics that an endpoint can subscribe to.
app.get('/list', function(req, res){
		sns.listTopics(null, function(err, data) {
			if(err) {
				res.status(403).json({message: err});
			}
			else {
				res.status(200).json(data);
			}
		});
});

// Route to subscribe an endpoint to a specific topic.
app.post('/subscribe', function(req, res){
	valid(req.body.url, function (err, valid) {
		if(err || !valid) {
			res.status(400).json({message: err});
		}
	  	else {
	  		var params = {
			  Protocol: config.config.options.subscriptionProtocol,
			  Endpoint: req.body.url
			};
			var topicsList = req.body.topics;
			for(var i=0; i<topicsList.length; i++) {
				params.TopicArn = config.config.options.topicPrefix + topicsList[i];
				console.log(params);
				sns.subscribe(params, function(error, data) {
					if(error) {
					  	console.log('ERROR: ' + data);
					} 
					else {
						console.log(data);
					}
				});
				res.status(200).end();
			}
	  	}
	});
});

// Route to publish to a topic.
app.post('/publish', function(req, res){
	
	// Construct topic
	var topic = config.config.options.topicPrefix + req.body.topic

	// Assemble parameters.
	var params = {
	  TopicArn: topic,
	  Message: JSON.stringify(req.body.message),
	  Subject: req.body.subject
	};

	// Publish topic.
	sns.publish(params, function(err, data) {
	  if (err){ 
	  	console.log(err, err.stack);
	  }
	  else {
	  	console.log(data);
	  	res.status(200).end();
	  }
	});
});

//TODO: Route to unsubscribe an endpoint from a topic.
app.post('/unsubscribe', function(req, res){});