    import "dotenv/config"
    import jwt from "jsonwebtoken"
const ensureAuthentication = (req,res,next)=>{
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(403)
        .json({message:"Unauthorize, jwt token is required"})
    }
    try {
        const decoded = jwt.verify(auth,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        
        return res.status(403)
        .json({message:"Unauthorize, jwt token wrong or expire"})
    }
}

export  {
    ensureAuthentication
}