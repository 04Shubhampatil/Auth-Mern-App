import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const singup = async (req, res) => {


    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            return res.status(409)
                .json({ message: "user is alredy exit, you can login", success: false })
        }
        const userModel = new User({ name, email, password })
        userModel.password = await bcrypt.hash(password, 10)
        await userModel.save()
        res.status(201)
            .json({ message: "singup successfully", success: true })
    } catch (error) {

        res.status(500)
            .json({ message: "Interner server error", success: false })
    }

}



const login = async (req, res) => {


    try {
        const {  email, password } = req.body;
        const user = await User.findOne({ email })
        const errorMsg = "Auth faild email or password is wrong"
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false })
        }
        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword) {
            return res.status(403)
                .json({ message: errorMsg, success: false })
        }
        const jwtToken = jwt.sign({email:user.email,_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn: "24h"}
        )
        res.status(200)
            .json({
                 message: "login successfully", 
                 success: true,
                 jwtToken,
                 email,
                 name:user.name
                 })
    } catch (error) {

        res.status(500)
            .json({ message: "Interner server error", success: false })
    }

}

export {
    singup,
    login
}