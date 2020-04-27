import express from "express";
import BaseRouter from "./Routes";

const app = express();
const port = 8080; // default port to listen

app.use("/api", BaseRouter)

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
