import { Router } from "express";
import { loginValidation, signupValidation  } from "../middleware/validation.js";
import { login, singup } from "../controller/authController.js";

const router = Router();



router.post("/login",loginValidation ,login)


router.post("/singup",signupValidation ,singup)





export default router