import express from "express"
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { errorHandler } from "./middleware/error.middleware.js";
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js";
import projectRouter from "./routes/project.routes.js";
import taskRouter from "./routes/task.routes.js";

const app=express();

dotenv.config({
   path:"./.env"
})

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!
})


app.use(express.static("/public"));
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.json({limit:"16kb"}))
app.use(cookieParser())
app.use(errorHandler)

app.use('/',userRouter)

app.use('/api/projects',projectRouter)
app.use('/api/tasks',taskRouter)

app.get("/", (req, res) => {
  res.json([
    { id: 1, title: "Next.js" },
    { id: 2, title: "Node.js" },
  ]);
});



export default app