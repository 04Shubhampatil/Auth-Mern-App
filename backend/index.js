import express from 'express';
import cors from 'cors';
import "./models/DB.js";
import bodyParser from 'body-parser';
import "dotenv/config"
import authRouter from "./routes/authRouter.js"
import productRouter from "./routes/ProductRouter.js"

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/auth", authRouter);

app.use("/product", productRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});