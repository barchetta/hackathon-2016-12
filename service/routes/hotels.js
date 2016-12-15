var express = require('express');
var router = express.Router();
var url = require('url');
var http = require('http');
var https = require('https');
var HttpProxyAgent = require('http-proxy-agent');
var HttpsProxyAgent = require('https-proxy-agent');
var myapp = require('../app');

var locationRawData = null;

/* GET hotels listing. */
router.get('/', function(req, res, next) {

    getLocation('1600+Amphitheatre+Parkway,+Mountain+View,+CA', res, getListing);

    return;
});

// getLocation converts a physical address to lat,lng then passes that
// to getListing to generate the hotel listing near that address
getLocation = function(address, res, callback) {

    var endpoint = 'https://maps.googleapis.com/maps/api/geocode/json?' +
        'address=' + address +
        '&key=' + myapp.apiKey;

    console.log('attempting to GET %j', endpoint);
    var opts = url.parse(endpoint);

    // create an instance of the `HttpProxyAgent` class with the proxy server information
    var agent = new HttpsProxyAgent(myapp.http_proxy);
    opts.agent = agent;

    var clientRequest = https.get(opts, function (myres) {
        console.log('"response" event!', myres.headers);
        //myres.pipe(process.stdout);
        myres.setEncoding('utf8');
        let rawData = '';
        myres.on('data', (chunk) => rawData += chunk);
        myres.on('end', () => {
            try {
                // Parse JSON to get lat,lng of address
                let parsedData = JSON.parse(rawData);
                let lat = parsedData.results[0].geometry.location.lat;
                let lng = parsedData.results[0].geometry.location.lng;
                let location = lat  + "," + lng;
                console.log(location);

                // Invoke callback
                callback(location, res)
            } catch (e) {
                console.log(e.message);
            }
        });
    });
};


// Given a lication in the form of "lat,lng" return a list of hotels
getListing = function(location, res) {

     var endpoint = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' +
        'location=' + location +
        '&radius=5000' +
        '&type=lodging' +
        '&key=' + myapp.apiKey;

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
             var parsedData = "";
             try {
                 parsedData = JSON.parse(rawData);
                 console.log(parsedData);
             } catch (e) {
                 console.log(e.message);
             }
             res.send(parsedData);
         });
     });

}

module.exports = router;
