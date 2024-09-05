const moongoose=require('mongoose')

const categorySchema= new moongoose.Schema({
  
  name:{
    type:String,
    required:true,
    trim:true,
    unique:true
  }


},{
    timestamps:true
})

module.exports=moongoose.model("category",categorySchema)