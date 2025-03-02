import express from "express"
import { mainRouter } from "./routes"
import cors from "cors"

const app = express()
const port = 3002
app.use(express.json())
app.use(cors())

app.use("/api/v1/user", mainRouter)

app.listen(port, () => {
  console.log("Server running onn port 3002")
})