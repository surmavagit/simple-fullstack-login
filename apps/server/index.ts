import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieSession from 'cookie-session';

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 4000;

// TODO: implement more security by only allowing http://localhost:3000
app.use(cors())

const login = {
  loggedin: false,
};;

// app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
  name: 'session',
  secret: "password123",
  signed: false
}))

app.get('/', function (req: Request, res: Response, next: NextFunction) {
  // Set session to a random number
  if (!req.session?.id)
    req.session = {
      id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    };
  next();
})


app.get("/", (req: Request, res: Response) => {
  console.log(`The session object id is ${req.session?.id}`);
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
