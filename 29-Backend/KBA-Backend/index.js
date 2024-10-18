import express,{json} from 'express';
import bcrypt from 'bcrypt';



const app=express();
app.use(json())

const port=8000;
const user=new Map();

app.get('/',(req,res)=>{
   res.send("Hello World");
})

app.post('/signup',async(req,res)=>{
    console.log("Hi");
    const data = req.body;
    console.log(data.FirstName);
    const {FirstName,
    LastName,
    UserName,
    Password,
    Role}= data;
    console.log(FirstName);
    const newP= await bcrypt.hash(Password,10)
    console.log(newP);
    if(user.has(UserName)){
        res.status(400).json({message:"User Already registerd"})
    }
    else{
    user.set(UserName,{
       FirstName,LastName,Password:newP,Role 
    
    });
    
    console.log(user.get(UserName));
    // res.status(201).send("Data Saved");
    res.status(201).json({message:"Data Saved"});}
    


})



app.listen(port,()=>{
    console.log(`Server is listening to ${port}`)
})