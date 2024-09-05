const router=require('express').Router()

const categoryCtrl=require('../controllers/catogeryCtrl')

const auth=require('../middleware/auth')

const authAdmin=require('../middleware/authAdmin')



router.route('/category').get(categoryCtrl.getCatogries).post(auth,authAdmin,categoryCtrl.createCatogries)




router.route('/category/:id').delete(auth,authAdmin,categoryCtrl.deleteCatogries).put(auth,authAdmin,categoryCtrl.updateCatogries)



module.exports=router