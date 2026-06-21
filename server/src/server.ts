import express,{Request,Response} from "express";
import cors from "cors";
import userRouter from "./routes/userRouter";

const app = express();
const port =process.env.PORT||5000;

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}))
app.use(express.json());
app.use("/api/auth",userRouter);



const server =app.listen(port,()=>{
    console.log(`server run successfuly on port ${port}!` )
});