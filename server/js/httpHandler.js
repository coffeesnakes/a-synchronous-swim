const fs = require("fs");
const path = require("path");
const headers = require("./cors");
const multipart = require("./multipartUtils");

module.exports.backgroundImageFile = path.join(".", "background.jpg");

let messageQueue = require("./messageQueue");
httpHandler.initialize(queue);
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = () => {}) => {
  if (req.methods === "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
    next();
  }

  if (req.method === "GET") {
    if (req.path === "/") {
      res.writeHead(200, headers);
      res.end(messageQueue.dequeue());
    } else if (req.url === "/background.jpg") {
      fs.readFile(module.exports.backgroundImageFile, (err, data) => {
        if (err) {
          res.writeHead(404, headers);
        } else {
          res.writeHead(200, headers);
          // res.end(data)
          res.write(data, "binary");
        }
        res.end();
        next();
      });
      res.writeHead(404, headers);
      res.end();
    }
  }
  if (req.method === "POST" && req.url === "/background.jpg") {
    let data = fs.writeFile(module.exports.backgroundImageFile, data, (err) => {
      if (err) {
        res.writeHead(404, headers);
      } else {
        res.writeHead(201, headers);
      }
      res.end();
      next();
    });
  }
};
