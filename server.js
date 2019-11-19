const express = require("express");
const path = require("path");
const http = require("http");
const helmet = require("helmet");
var hsts = require("hsts");
var xssFilter = require("x-xss-protection");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.static("public"));
app.use(
  hsts({
    maxAge: 15552000 // 180 days in seconds
  })
);
app.use(xssFilter());
app.disable("x-powered-by");
app.set("etag", false);
app.use(
  helmet({
    noCache: true
  })
);
// Catch all other routes and return the index file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

/**
 * Get port from environment and store in Express.
 */
const server_port = process.env.PORT || 5000;
var server_ip_address = process.env.IP || "127.0.0.1";
app.set("port", server_port);
app.set("server_ip_address", server_ip_address);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(process.env.PORT || 5000, () =>
  console.log(`API running on ${server_ip_address}:${server_port}`)
);
