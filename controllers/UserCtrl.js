const Users=require('../models/UserModel')

const bcrypt=require('bcrypt')


const jwt=require('jsonwebtoken')

const cookie=require('cookie-parser')



const UserCtrl={
    register: async(req,res)=>{
        try {

            const {name,password,email}=req.body;
            const user= await Users.findOne({email})
            if (user) return res.status(400).json({msg:"email already registered"})

            if (password.length<6){
                return res.status(400).json({msg:'password is at least 6 characters'})
            }
            //password encryption
            const passwordHash=await bcrypt.hash(password,10)

          const newUser= new Users({
            name,email,password:passwordHash
          })
          //save to mongodb
          await newUser.save();


          // creating jwt to authenticate
          const accessToken=createAccessToken({id:newUser._id})
          const refreshToken=createRefreshToken({id:newUser._id})
         

          res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            path:'user/refresh_Token'
          })




            res.json({accessToken})


            
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    refreshToken:async(req,res)=>{
        const rf_Token=req.cookies.refreshToken;
        res.json({rf_Token})

        if(!rf_Token) return res.status(400).json({msg:"pls login or register"})


        jwt.verify(rf_Token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
            if(err) return res.status(400).json({msg:'pls login or register'})
            const accessToken=createAccessToken({id:user.id})
        })
    },

    login:async(req,res)=>{
        try {
            const {email,password}=req.body;

            const user=await Users.findOne({email})
            if(!user) return res.status(400).json({msg:'user does not exist'})

            const isMatch=await bcrypt.compare(password,user.password)
            if(!isMatch) return res.status(400).json({msg:'incorrect password'})

            const accessToken=createAccessToken({id:user._id})
          const refreshToken=createRefreshToken({id:user._id})
         

          res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            path:'user/refresh_Token'
          })




            res.json({accessToken})

          
            
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },

 logout:async(req,res)=>{
    try {
        res.clearCookie('refreshToken',{path:'user/refresh_Token'})
        return res.json({msg:'log out'})
    } catch (err) {
        
    }
 },
    getUser: async(req,res)=>{
   try {
    const user=await Users.findById(req.user.id)
    if(!user) return res.status(400).json({msg:"user not found"})
    res.json(req.user)
   } catch (err) {
    
   }
    }
    
}


const createAccessToken=(payload)=>{
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1d'})
}
const createRefreshToken=(payload)=>{
    return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'7d'})
}


module.exports=UserCtrl