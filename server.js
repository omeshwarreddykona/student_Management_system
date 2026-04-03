import express from "express";
import logger from "./middlewares/logger.js";
import connectDB from "./database/db.js";
import router from "./routes/api.js";
import api from "./routes/staffapi.js";
import cors from "cors";    
// import task  from "./task.js"; 
// import client from "./whatsapp.js";


const app = express();
app.use(logger);
// app.use(task);
app.use(cors({
  origin: "*", // you can replace with frontend URL
  exposedHeaders: ["total_count", "total_pages", "current_page", "limit"]
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

connectDB();

app.use('/', router);
app.use('/',api);

app.listen(4002, () =>{
    console.log("server is running in port 4002")
});