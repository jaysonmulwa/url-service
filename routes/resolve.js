var express = require("express");
var router = express.Router();
var app = require('../app.js');
var { Server } = require("socket.io")

/* GET resolve User image. */
router.get("/", function (req, res, next) {
  
  const serve = req.app.listen();
  const io = new Server(serve, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  console.log(app);

  io.on("connection", (socket) => {

    socket.on("receiveUrl", (msg) => {
      console.log(msg);
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  });

});

dispatchToAzure = (url) => {};
updateURlState = (url) => {};
checkStatus = (url) => {};
processData = (url) => {};
sendBackData = (url) => {};

module.exports = router;
