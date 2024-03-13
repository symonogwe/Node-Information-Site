const http = require("http");
const path = require("path");
const fs = require("fs/promises");

const port = process.env.PORT || 8080;

const myServer = http.createServer((req, res) => {
  // Get the file path based on the req.url
  let filePath = path.join(
    __dirname,
    "Pages",
    req.url === "/" ? "index.html" : req.url
  );

  // Get the path extension
  const pathExtension = path.extname(filePath);

  let contentType = "text/html";

  switch (pathExtension) {
    case ".js":
      contentType = "application/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpeg":
      contentType = "image/jpeg";
      break;

    default:
      break;
  }

  async function readFiles() {
    try {
      const data = await fs.readFile(filePath, "utf8");
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data, "utf8");
    } catch (error) {
      if (error.code === "ENOENT") {
        const errorPage = await fs.readFile(
          path.join(__dirname, "Pages", "404.html")
        );
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(errorPage, "utf8");
      } else {
        res.writeHead(500);
        res.end(`Error: ${error.code}`);
      }
    }
  }

  readFiles();
});

myServer.listen(port, () => console.log("server is running"));
