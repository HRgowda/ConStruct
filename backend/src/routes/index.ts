import express, { Request, Response } from "express"
import cors from "cors"
import { signupSchema } from "../types";
import { signinSchema } from "../types";
import { prismaClient } from "../db";
import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken"
import { jwtSecret } from "../config";
import { Authentication } from "../middleware";

const app = express();
app.use(express.json())
app.use(cors())

// const data = new PrismaClient()

app.post("/owner_signup", async (req: Request, res: Response):Promise<void> => {
    const body = req.body;
    const parsedData = signupSchema.safeParse(body);
    if(!parsedData.success) {
        res.status(400).json({
            message: "Invalid"
        })
        return 
    }

    try {
        const userExisits = await prismaClient.owner.findFirst({
            where:{
                email: parsedData.data?.email
            }
        })
    
        if(userExisits) {
            res.status(403).json({
                message: "User already exists"
            })
            return
        }
    
        await prismaClient.owner.create({
            data:{
                name: parsedData.data?.name ?? "",
                email: parsedData.data?.email ?? "",
                password: parsedData.data?.password ?? ""
            }
        })

        // const token = jwt.sign({email: parsedData.data.email }, jwtSecret)
    
        res.status(200).json({
            // token: token,
            message: "Account created successfully!"
        })
    } catch (error: any) {
        console.log("Internal server error", error);
    }
})

app.post("/owner_signin", async (req: any, res: any):Promise<void> => {

    const body = req.body;
    const parsedData = signinSchema.safeParse(body)

    if(!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input format"
        })
    }

    try {
        const existingUser = await prismaClient.owner.findFirst({
            where: {
                email: parsedData.data?.email
             }
        })

        if(!existingUser) {
            res.status(403).json({
                message: "Invalid credentials."
            })
            return
        }
        const token = jwt.sign({email: parsedData.data?.email}, jwtSecret);

        if(existingUser) {
            res.status(200).json({
                token: token,
                message: "Logged in successfully."
            })
            return
        }

    } catch (error: any) {

        console.log("Error while signing in", error)
    }
})

// websocket logic
const wss = new WebSocketServer({
    noServer: true
})

wss.on("connection", (ws) => {
    console.log("client connected");

    ws.on("message", async(message) => {

        const userId = 1;
        try {
            const data = JSON.parse(message.toString());
            console.log("Recieved sensor data.");

            const {userId, motion, gps, pulseRate} = data;

            const updateduser = await data.user.update({
                where:{
                    id: userId
                },
                data:{
                    motion,
                    gps,
                    pulseRate
                }
            });

            console.log("Updated user")

        } catch {
            console.log("internal error")
        }

        ws.on("close" , () => {
            console.log("client disconnected")
        })
    })
})

export const mainRouter = app;