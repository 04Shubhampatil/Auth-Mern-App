import { ensureAuthentication } from "../middleware/auth.js";
import { Router } from "express";

const router = Router()

const product = [
    {
        name: "mobile",
        price: 5000,
        quantity: 10,
    },
     {
        name: "laptop",
        price: 10000,
        quantity: 10,
    }
]

router.get("/", ensureAuthentication,(req, res) => {
    res.status(200).json(product)
})

export default router
