const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 8080;

// Request Handlers
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Pages", "index.html"));
});

app.get("/about.html", (req, res) => {
  res.sendFile(path.join(__dirname, "Pages", "about.html"));
});

app.get("/contact-me.html", (req, res) => {
  res.sendFile(path.join(__dirname, "Pages", "contact-me.html"));
});

// Static Pages folder
// app.use(express.static(path.join(__dirname, "Pages")));

app.listen(port, () => console.log("My Express server is running"));
