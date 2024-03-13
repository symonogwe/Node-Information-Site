const http = require("http");
const path = require("path");
const fs = require("fs/promises");

const port = process.env.PORT || 5000;

const myServer = http.createServer((req, res) => {
  res.end("hello world my guy. this is your first ever node server!!");
});

myServer.listen(port, () => console.log("server is running"));
