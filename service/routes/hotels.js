var express = require('express');
var router = express.Router();
var url = require('url');
var http = require('http');
var https = require('https');
var HttpProxyAgent = require('http-proxy-agent');
var HttpsProxyAgent = require('https-proxy-agent');
var myapp = require('../app');

/* GET hotels listing. */
router.get('/', function(req, res, next) {

    // HTTP endpoint for the proxy to connect to
    var endpoint = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=' +
            myapp.apiKey;

    console.log('attempting to GET %j', endpoint);
    var opts = url.parse(endpoint);

    // create an instance of the `HttpProxyAgent` class with the proxy server information
    var agent = new HttpsProxyAgent(myapp.http_proxy);
    opts.agent = agent;

    https.get(opts, function (myres) {
        console.log('"response" event!', myres.headers);
        myres.pipe(process.stdout);
        myres.setEncoding('utf8');
        let rawData = '';
        myres.on('data', (chunk) => rawData += chunk);
        myres.on('end', () => {
            try {
                let parsedData = JSON.parse(rawData);
                console.log(parsedData);
            } catch (e) {
                console.log(e.message);
            }
            res.send(rawData);
        });
    });
});

module.exports = router;
