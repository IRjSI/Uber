import express from "express";
import cors from "cors";
import connectToDb from "./db/db.js";
import dotenv from "dotenv";
import { userRouter } from "./routes/user.route.js";

dotenv.config();
connectToDb();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
    res.send("working!!!");
})

app.use('/users', userRouter) 

app.listen(3000);