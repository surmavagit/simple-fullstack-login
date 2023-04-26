import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

// ...

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 4000;
app.use(cors());

const login = {
  loggedin: false,
};

app.get("/", (req: Request, res: Response) => {
  res.status(200).json(login);
});

app.post("/logout", (req: Request, res: Response) => {
  login.loggedin = false;
  res.sendStatus(200);
});

app.post("/login", (req: Request, res: Response) => {
  login.loggedin = true;
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`⚡️ Server is running at http://localhost:${port} `);
});
