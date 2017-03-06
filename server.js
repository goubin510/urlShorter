var express = require('express');
var unirest = require('unirest');
var parseString = require('xml2js').parseString;

var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
	res.send("Bonsoir");
});

app.get('/:url', function(req, res) {
	var json = {};

	unirest.get("https://sjehutch-passbeemedia-shorturl.p.mashape.com/CreateUrl?real_url=http%3A%2F%2F" + req.params.url)
	.header("X-Mashape-Key", "73dPrTW28ZmshNNgOWUwwbYW9JBPp1fXus5jsnFra8Pykoag9p")
	.header("Accept", "application/xml")
	.end(function (result) {

	  	parseString(result.body, function (err, result) {
    		if(result.Container.RealUrl != 'http://favicon.ico'){
    			json.originalUrl = result.Container.RealUrl[0];
    			json.shortUrl = result.Container.ShortUrl[0];
    		}
    		res.send(JSON.stringify(json));
		});
	});
});

app.get('/http://:url', function(req, res) {
	var json = {};

	unirest.get("https://sjehutch-passbeemedia-shorturl.p.mashape.com/CreateUrl?real_url=http%3A%2F%2F" + req.params.url)
	.header("X-Mashape-Key", "73dPrTW28ZmshNNgOWUwwbYW9JBPp1fXus5jsnFra8Pykoag9p")
	.header("Accept", "application/xml")
	.end(function (result) {

	  	parseString(result.body, function (err, result) {
    		if(result.Container.RealUrl != 'http://favicon.ico'){
    			json.originalUrl = result.Container.RealUrl[0];
    			json.shortUrl = result.Container.ShortUrl[0];
    		}
    		res.send(JSON.stringify(json));
		});
	});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});