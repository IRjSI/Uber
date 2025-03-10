import express from "express";
import cors from "cors";
import connectToDb from "./db/db.js";
import dotenv from "dotenv";

dotenv.config();
connectToDb();
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
    res.send("working!!!");
})

app.listen(3000);