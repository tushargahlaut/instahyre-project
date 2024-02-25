import express, { Request, Response } from "express";
import cors from "cors";
import sequelize from "./database/connection/sequelize.connection";
import AuthRouter from "./routes/auth.route";
import * as dotenv from "dotenv";
import ContactRouter from "./routes/contact.route";
import SpamRouter from "./routes/spam.route";
import SearchRouter from "./routes/search.route";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/contact", ContactRouter);
app.use("/api/v1/spam", SpamRouter);
app.use("/api/v1/search", SearchRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the User API!");
});

app.listen(PORT, () => {
  sequelize
    .sync({ alter: true })
    .then(() => {
      console.log("Server Started on PORT", PORT);
    })
    .catch((err) => {
      console.log(err);
    });
});
