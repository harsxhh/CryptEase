import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connect from "./db/connection.js";
const app = express();
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import paymentRoutes from './api/routes/paymentRoutes.js'
import userRoutes from './api/routes/userRoutes.js'
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
const port=process.env.PORT||8080;
app.use(cors(
    {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204
    }
));
app.use(morgan("tiny"));
app.disable("x-powered-by");
app.get("/",(req,res)=>{
    res.send("Hello World");
})
app.use("/api/payment",paymentRoutes);
app.use("/api/user",userRoutes);
connect()
.then(()=>{
    try{
        app.listen(port,()=>{
            console.log(`Server is running on port ${port}`);
        });
    }
    catch(err){
        console.log("Cannot connect to Server");
    }
})
.catch((err)=>{
    console.log("Invalid database connection");
});
