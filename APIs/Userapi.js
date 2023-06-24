const exp = require('express')
const userApp = exp.Router()


require("dotenv").config()
//import express-async-handler
const expressAsyncHandler=require('express-async-handler')

//import multerObj
const multerObj=require("./middlewares/cloudinaryConfig")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const verifyToken=require("./middlewares/verifyToken")

//body parser
userApp.use(exp.json())

//register user
//PUBLIC ROUTE
userApp.post("/register-user", multerObj.single('photo'),expressAsyncHandler(async(request,response)=>{

    //get user collection
    const userCollectionObj=request.app.get("usersCollectionObj")
  
    //get user from client
    const newUser=JSON.parse(request.body.user);
  
    //verify user is already existed
   const userOfDB= await userCollectionObj.findOne({username:newUser.username})
  
    //if user already existed
    if(userOfDB!==null){
      response.status(200).send({message:"User already existed"})
    }
    //if user not existed
    else{

      
      //add CDN link of cloudinary image to user obj
      newUser.image=request.file.path;
      //hash the password of newUser
      let hashedPassword=await bcryptjs.hash(newUser.password,6)
      //replace palin password with hased password
      newUser.password=hashedPassword;
      //insert user
      await userCollectionObj.insertOne(newUser)
      //send response
      response.status(201).send({message:"User created"})
    }
  }))
  
  userApp.post("/pathjump", verifyToken, async (req, res) => {
    res.send({ success: true });
  });
  
  //get user by username
  //PRIVATE ROUTE
  userApp.get("/get-user/:username",expressAsyncHandler(async(request,response)=>{
  
       //get user collection
      const userCollectionObj=request.app.get("usersCollectionObj")
  
      //get username from url
      let usernameOfUrl=request.params.username;
  
      //find user by username
      let user=await userCollectionObj.findOne({username:usernameOfUrl})
  
      //send res
      response.status(200).send({message:"User",payload:user})
  
  }))

  userApp.get("/get-users",expressAsyncHandler(async(request,response)=>{
  
    console.log(request.headers)
       //get user collection
      const userCollectionObj=request.app.get("usersCollectionObj")

  
      //find user by username
      let userlist=await userCollectionObj.find().toArray();
  
      //send res
      response.status(200).send({message:"users", users :userlist})
  
  }))
  
  
  
  //delete user by username
  //PRIVATE ROUTE
  userApp.delete("/remove-user/:username",verifyToken,expressAsyncHandler(async(request,response)=>{
  
         //get user collection
         const userCollectionObj=request.app.get("usersCollectionObj")
  
         //get username from url
         let usernameOfUrl=request.params.username;
  
         //delete user by username
         await userCollectionObj.deleteOne({username:usernameOfUrl})
        //send res
        response.status(200).send({message:"User removed"})
  
  }))
  
  
  //user login
  //PUBLIC ROUTE
  userApp.post('/user-login',expressAsyncHandler(async(request,response)=>{
  
    //get user collection
    const userCollectionObj=request.app.get("usersCollectionObj")
  
    //get user from client
    const userCredentialsObj=request.body;
  
    //verify username of userCredentialsObj
    let userOfDB=await userCollectionObj.findOne({username:userCredentialsObj.username})
  
    //if username is invalid
    if(userOfDB===null){
      response.status(200).send({message:"Invalid username"})
    }
    //if username is valid
    else{
      //compare passwords
      let isEqual=await bcryptjs.compare(userCredentialsObj.password,userOfDB.password)
      //if passwords not matched
      if(isEqual===false){
        response.status(200).send({message:"Invalid password"})
      }
      //passwords are matched
      else{
        //create JWT token
        let signedJWTToken=jwt.sign({username:userOfDB.username},"abcdef",{expiresIn:"1d"})
        //send token in response
        response.status(200).send({message:"success",success:true,token:signedJWTToken,user:userOfDB.username})
        
      }
  
    }
  
  }))
  
  





module.exports = userApp