import express, { Request, Response } from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client";
import { signupSchema } from "./types";
import { signinSchema } from "./types";
import { prismaClient } from "./db";
import { WebSocketServer } from "ws";

const app = express();
const port = 3002
app.use(express.json())
app.use(cors())

const data = new PrismaClient()

app.post("/owner_signup", async (req: Request, res: Response):Promise<void> => {
    const body = req.body;
    const parsedData = signupSchema.safeParse(body);

    try {
        const userExisits = await data.owner.findFirst({
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
    
        await data.owner.create({
            data:{
                name: parsedData.data?.name,
                email: parsedData.data?.email,
                password: parsedData.data?.password
            }
        })
    
        res.status(200).json({
            message: "Account created successfully!"
        })
    } catch (error: any) {
        console.log("Internal server error")
    }
})

app.post("/owner_signin", async (req: Request, res: Response):Promise<void> => {
    const body = req.body
    const parsedData = signinSchema.safeParse(body);

    try {
        const existingUser = await data.owner.findFirst({
            email: parsedData.data?.email
        })

        if(existingUser) {
            res.status(200).json({
                message: "Logged in successfully."
            })
        }
    } catch {
        console.log("Error while signing in")
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

app.listen(port, () => {
    console.log("Server running onn port 3002")
})
