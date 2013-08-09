var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)
  , redis = require('redis');

server.listen(8080);

var sub = redis.createClient();
sub.subscribe("tags");
sub.subscribe("links");
sub.subscribe("market");
sub.subscribe("retweets");
sub.subscribe("articles");
sub.subscribe("geolocation");


app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + "/public"));



app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/map', function (req, res) {
  res.sendfile(__dirname + '/map.html');
});

app.get('/readme.html', function (req, res) {
  res.sendfile(__dirname + '/readme.html');
});

io.sockets.on('connection', function (socket) {
  sub.on("message", function(pattern, key){
    socket.emit(pattern, key);
  });

});
