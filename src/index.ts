import express from "express";
import BaseRouter from "./routes";
import { Swagger } from "./config/Swagger";
import bodyParser from "body-parser";

const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.json());
app.use("/api", BaseRouter);

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!");
});

Swagger.setSwagger(app);

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
