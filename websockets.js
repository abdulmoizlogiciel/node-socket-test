
const { baseUrl } = require("./config.json");
const { access_token } = require("./token.json");
const WebSocket = require('ws');

// hand shaking
const websocket = new WebSocket(`ws://${baseUrl}/ws?access_token=` + access_token);

// on connected
websocket.onopen = function (e) {
    console.log("onopen: Connected");

    // https://stackoverflow.com/questions/41074052/how-to-terminate-a-websocket-connection
    // websocket.close(); // soft close a connection.
    // websocket.terminate(); // hard close a connection.
};

// on closed
websocket.onclose = function (e) {
    console.log("onclose");
};

// on message received
websocket.onmessage = function (e) {
    console.log("onmessage:", JSON.parse(e.data)?.msg);
    // console.log("message", JSON.stringify(e), e.Symbol, count++);
};

// on error
websocket.onerror = function (e) {
    console.log("onerror", e.message);
};

function heartbeat() {
    clearTimeout(this.pingTimeout);

    // Use `WebSocket#terminate()`, which immediately destroys the connection,
    // instead of `WebSocket#close()`, which waits for the close timer.
    // Delay should be equal to the interval at which your server
    // sends out pings plus a conservative assumption of the latency.
    this.pingTimeout = setTimeout(() => {
      websocket.terminate();
    }, 30000 + 1000);
    console.log("inside hearbeat");
}
websocket.on('ping', heartbeat);

// setTimeout(() => {
//   websocket.close();
//   // websocket.terminate();
// }, 10000);