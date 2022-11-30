import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("hi");
});

app.get("/api/test", (req: Request, res: Response) => {
  res.send("hi api test");
});

app.get("/api", (req: Request, res: Response) => {
  res.send("hi api");
});

app.listen(8080, () => {
  console.log("server is running");
});
