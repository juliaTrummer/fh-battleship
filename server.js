var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require('express');
var app = express();
var port = process.env.PORT || 5000
var bodyParser = require('body-parser');
app.use(bodyParser.json());


const db = require('./app/config/db.config.js');
const User = db.users;

app.use(express.static('client'));

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port);

var wss = new WebSocketServer({server: server});
console.log("websocket server created");

wss.on("connection", function(ws) {
    var id = setInterval(function() {
        ws.send(JSON.stringify(new Date()), function() {  })
    }, 1000)

    console.log("websocket connection open")

    ws.on("close", function() {
        console.log("websocket connection close")
        clearInterval(id)
    })
})
// force: true will drop the table if it already exists
