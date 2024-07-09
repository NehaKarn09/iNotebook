const express=require('express');
const User=require('../models/User')
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')

const JWT_SECRET="shreyaisagoodg$irl";

//Route 1:create a User using:POST "/api/auth/createuser":No Login required
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
],async (req,res)=>{

    let success=false;
    //If there are errors return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    // console.log(req.body);
    // const user=User(req.body);
    // user.save();
    // res.send(req.body);

    //check whether the user with this email exists already
    try{

    
    let user=await User.findOne({email: req.body.email});
    if(user){
      return res.status(400).json({success,error:"Sorry a user with this email already exists"});
    }
    
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
    user= await User.create({
        name: req.body.name,
        email: req.body.email,
        password:secPass
      })


      const data={
        user:{
          id:user.id
        }
      }
      const authtoken=jwt.sign(data,JWT_SECRET);
      success=true;
      res.json({success,authtoken});
    }catch (error){
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
    
      // .then(user => res.json(user))
      // .catch(err => {console.log(err)
      //   res.json({error:"Please enter a valid email or password",message:err.message})});
    })



//Route 2:Authenticate a User using:POST "/api/auth/login":No Login required
router.post('/login',[
  body('email','Enter a valid email').isEmail(),
  body('password','Password cannot be blank').exists()
],async (req,res)=>{
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success,errors: errors.array() });
  }

  const {email,password}=req.body;
  try {
    let user =await User.findOne({email});
    if(!user){
      return res.status(400).json({success,error:"Please try to login with correct credentials."});
    }

    const passwordCompare =await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      return res.status(400).json({success,error:"Please try to login with correct credentials."});
    }

    const data={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    success=true;
    res.json({success,authtoken});

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

})


//Route 3:Get loggedin User details using:POST "/api/auth/getuser":Login required
router.post('/getuser',fetchuser,async (req,res)=>{
  try {
    userId=req.user.id; //from fetchuser middleware
    const user=await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports=router;