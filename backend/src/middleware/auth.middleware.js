
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

/*
Extract the token from the Authorization header 

Verify the token using jwt 

Attach decoded user info to req.user if valid 

Deny access if no token or an invalid token is provided 
*/

export const protectRoute = async (req, res, next) => {
    try {

        const token = req.cookies.jwt   // extract the token from cookies (cookie-based authentication) 

        // If the token isn't present, the user is denied access 

        if(!token){
            return res.status(401).json({
                message: 'Unauthorized - No token provided'
            })
        }

        // verify the token using jwt.verify() - checks if the token is valid 

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({
                message: 'Unauthorized - Invalid token'
            })
        }

        // find the user in the database (excluding the password) - the middleware fetches the user's details from the database using the userId stored in the JWT paylod 

        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            return res.status(404).json({
                message: 'User not found!'
            })
        }

        // attach the user object to req.user and proceed

        req.user = user 
        next()      // passes control to the next middleware or route handler 

    } catch (error) {
        console.log("protectRoute middleware error: ", error || error.message)

        res.status(500).json({
            message: 'Internal server error'
        })
    }
}