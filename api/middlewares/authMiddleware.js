import jwt from "jsonwebtoken";
import JWT_SECRET from "../config/secret.js";
import Users from "../db/userModel.js";

function authMiddleware(req, res, next) {
    //Here we get our JWT token as part of the headers in our request
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    console.log(jwtToken);

    //Now we verify and decode the JWT token to authenticate the user
    const decodedToken = jwt.verify(jwtToken, JWT_SECRET);
    console.log(decodedToken);

    //If an email is
    if(decodedToken.email){
        req.email = decodedToken.email;
        next();
    }else{
        res.status(411).json({
            message: "Account cannot be authenticated!"
        })
    }
}

export default authMiddleware