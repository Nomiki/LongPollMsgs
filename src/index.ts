import express from "express";
import BaseRouter from "./routes";
import { Swagger } from "./config/Swagger";
import bodyParser from "body-parser";

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use("/api", BaseRouter);

Swagger.setSwagger(app);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
