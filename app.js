var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var { createServer } = require("http");
var debug = require('debug')('konnect:server');

var indexRouter = require("./routes/index");
var resolverRouter = require("./routes/resolve");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
    preflightContinue: false,
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/resolve", resolverRouter);

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = createServer(app);
const io = new Server(server, {  
    cors: {
        origin: "*",
        methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    }
});

const urlHandler = require("./handlers/urlHandler");
const disconnectHandler = require("./handlers/disconnectHandler");

const onConnection = (socket) => {
    urlHandler(io, socket);
    disconnectHandler(io, socket);
}

io.on("connection", onConnection);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);


normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

onListening = () => {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

module.exports = app ;
