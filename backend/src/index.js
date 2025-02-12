import express from "express"
import authRoutes from './route/auth.route.js'
import messageRoutes from './route/message.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from "./lib/db.js"
dotenv.config()

const app = express()

const PORT = process.env.PORT || 5001 ;

app.use(cors({
    origin: "*", // Allow all origins (for testing only)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// middleware 

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes)

app.listen(PORT, ()=> {
    console.log(`Server running: http://localhost:${PORT}`)

    connectDB() ; 
})