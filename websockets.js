
const WebSocket = require('ws');
const { baseUrl } = require("./config.json");
const tokens = require("./tokens.json");

const username = process.argv[2] || "user1";
const socketRoute = process.argv[3] || "user1";

const access_token = tokens[username];

// hand shaking
const websocket = new WebSocket(`ws://${baseUrl}/ws?access_token=` + access_token);

// on connected
websocket.onopen = function (e) {
    console.log("onopen: Connected");
};

// on closed
websocket.onclose = function (e) {
    console.log("onclose");
};

// on message received
websocket.onmessage = function (e) {
    console.log("onmessage:", JSON.parse(e.data)?.msg);
};

// on error
websocket.onerror = function (e) {
    console.log("onerror", e.message);
};

// To close a socket connection:
// https://stackoverflow.com/questions/41074052/how-to-terminate-a-websocket-connection
// websocket.close(); // soft close a connection.
// websocket.terminate(); // hard close a connection.