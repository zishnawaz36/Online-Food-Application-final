# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

//backend index.js
require('dotenv').config();
const express=require("express");
const app=express();
const cors=require("cors");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const connectDB = require('./utlis/connect');
app.use(express.json());
app.use(cors());
await connectDB();
const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL)
.then(()=>{
    console.log("mongoose connected successfully")
})
.catch((err)=>{
    console.log("error to connect with mongoose",err.message)
})
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
    
},{timestamps:true})
const Restro=new mongoose.model("Restro",userSchema);

app.post("/restaurant/register", async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const user = await Restro.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
        });
        res.status(201).json({ success: true, message: "User registered successfully", user });
    } catch (err) {
        console.log("Error while registering user:", err.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.post("/restaurant/login",async(req,res)=>{
   try{
    const user=await Restro.findOne({email:req.body.email});
    if(!user){
        return res.status(400).json({
            message:"Invalid user password and email"
        });
    }
    const isMatch=await bcrypt.compare(req.body.password,user.password);
    if(!isMatch){
        return res.status(400).json({
            message:"Invalid user password and email"
        });
    }
    const token=jwt.sign({id:user._id},JWT_SECRET,{expiresIn:"1d"});
    res.json({message:"Login successfully",token}) //did mistake not to store token
   }
   catch(err){
    console.log("Error to connect",err.message);
   } 
});
app.post("/restaurant/logout",async(req,res)=>{
    try{
        res.status(200).json({
            success:true,
            message:"Logout Successfully",
            token:""
        })
     }    
    catch(err){
        res.status(500).json({success:false,message:"error to connect"},err.message)
     console.log("Error to connect",err.message);
    } 
 });

const verifyToken=(req,res,next)=>{
    const token=req.headers['authorization'];
    if(!token){
        return res.status(400).json({
            message:"No token provided",
        })
    }
    jwt.verify(token,JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.status(401).json({
                message:"Unauthorization"
            })
        }
        req.userId=decoded;
        next();
    })
}
app.listen(4500, () => {
    console.log("Server is running on port 4500");
});

import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy loading components
const MainContainer = lazy(() => import("./Components/Admin/MainContainer"));
const MainHeader = lazy(() => import("./Components/Admin/HeaderMain.jsx"));
const MainBody = lazy(() => import("./Components/Admin/MainBody.jsx"));

function App() {
  return (
    <>
    
        <Suspense fallback={<div>Loading...</div>}>
        <MainHeader/>
        <MainBody/>
        <Router>
          <Routes>
            <Route path="/maincontainer" element={<MainContainer/>}/>
          </Routes>
        </Router>
        </Suspense>
     
    </>
  );
}

export default App;
