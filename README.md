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
* Start data consumer by cd'ing into <code>consumer directory</code> and running <code>node index.js</code>.

In the Amazon Console:

* Navigate to the SNS dashboard.
* Create a new topic.
* Note the prefix on the **Topic ARN** and enter into the <code>config.js</code> file.
* Enter AWS credentials into the <code>config.js</code> file.
