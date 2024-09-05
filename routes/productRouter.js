const router= require('express').Router()

const productCtrl=require('../controllers/productController')

router.route('/Products')
.get(productCtrl.getProducts)
.post(productCtrl.createProducts)




router.route('/Products/:id')
.delete(productCtrl.deleteProducts)
.put(productCtrl.updateProducts)



module.exports=router