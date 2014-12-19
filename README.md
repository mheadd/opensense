# OpenSense: Realtime Open Data

A demo application that provides the ability to subscribe to realtime data feeds (by registering a webhook) and more traditional open data consumption (via a datastore with REST API).

Note - early days. Currently just a proof of concept.

Realtime data is pushed to registered webhooks using Amazon SNS and is stored in a CouchDB. 

## Built with

* Node.js
* Amazon [Simple Notification Service](http://aws.amazon.com/sns/) (SNS)
* Apahe CouchDB

## Installing & using

* Clone the repo.
* Install dependencies (<code>npm install</code>).
* Copy <code>config.sample.js</code> to <code>config.js</code>.
* Install CouchDB (default config assumes CouchDB is running on default port on localhost).
* Start realtime server by running <code>node index.js</code> in root directory.
* Start data consumer by cd'ing into <code>/consumer</code> directory and running <code>node index.js</code>.

In the Amazon Console:

* Navigate to the SNS dashboard.
* Create a new topic.
* Note the prefix on the **Topic ARN** and enter into the <code>config.js</code> file.
* Enter additional SNS credentials into the <code>config.js</code> file.

Use the methods below to list, subscribe and publish to topics.

## Methods

* http://127.0.0.1:4000/list
* Get a list of availalbe topics.
* Sample response:
```json
{
    "ResponseMetadata": {
        "RequestId": "7e88c51d-9956-5590-8e91-8810fc5ca3db"
    },
    "Topics": [
        {
            "TopicArn": "arn:aws:sns:us-east-1:888888888888:realtime-business-licenses"
        },
        {
            "TopicArn": "arn:aws:sns:us-east-1:888888888888:realtime-service-requests"
        }
    ]
}
```

* http://127.0.0.1:4000/subscribe
* Subscribe to one or more topics.
* Sample request:
<pre>
curl -X POST http://127.0.0.1:4000/subscribe 
-d '{"url": "http://path-to-your-webhook.com", "topics": ["realtime-business-licenses"]}' 
-H 'Content-type: application/json'
</pre>

* http://127.0.0.1:4000/publish
* Publish a message to a topic.
* Sample request:
<pre>
curl -X POST http://127.0.0.1:4000/publish 
-d '{"topic": "realtime-business-licenses", "subject": "Test message", "message":{"foo":"bar"}}'
-H 'Content-type: application/json' 
</pre>