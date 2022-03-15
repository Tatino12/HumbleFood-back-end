import express from "express";
import { router } from "./src/routes/routes";
const morgan = require("morgan")


const PORT = process.env.PORT || 3002;

const server = express();

// midlewares
server.use(express.json({ limit: "50mb" }));
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(morgan("dev"));

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// routes
server.use("/", router);

server.listen(PORT, () => {
  console.log("servidor en el puerto " + PORT);
});
