const category = require("../models/categoryModels")

const categoryCtrl={
  getCatogries: async(req,res)=>{
    try {
        const categories= await category.find()
        res.json(categories)
    } catch (err) {
        return res.status(500).json({msg:err.message})
        
    }
  },

  createCatogries: async(req,res)=>{
    try {
     const {name}=req.body;
     const categories= await category.findOne({name})
     if (categories) return res.status(400).json({msg:'already existed'})


     const Newcategory= new category({name})
     await Newcategory.save()

        res.json({msg:'created a category'})
    } catch (err) {
        return res.status(500).json({msg:err.message})
        
    }
  },

  deleteCatogries:async(req,res)=>{
    try {
        await category.findByIdAndDelete(req.params.id)
        res.json({msg:'deleted a category'})
    } catch (err) {
        return res.status(500).json({msg:err.message})
        
    }
  },
  updateCatogries:async(req,res)=>{
    try {
    const {name}=req.body;
    
     await category.findByIdAndUpdate({_id:req.params.id},{name})

     res.json({msg:'catogries updated'})
  

    } catch (err) {
      return res.status(500).json({msg:err.message})
    }
  }

}

module.exports=categoryCtrl