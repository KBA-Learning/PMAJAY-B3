import express,{json} from 'express';
import dotenv from 'dotenv';
import { adminRoute } from './Routes/adminRoutes.js';

dotenv.config();
const app=express();
app.use(json());
app.use('/',adminRoute)

const port=process.env.port;

app.listen(port,()=>{
    console.log(`Server is listening to ${port}`)
})