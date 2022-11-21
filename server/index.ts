import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("hi");
});

app.listen(8080, () => {
  console.log("server is running");
});
