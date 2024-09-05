const UserCtrl = require('../controllers/UserCtrl');
const auth = require('../middleware/auth');

const router=require('express').Router();



router.post('/register',UserCtrl.register)
router.post('/login',UserCtrl.login)
router.get('/logout',UserCtrl.logout)

router.post('/refresh_Token',UserCtrl.refreshToken)

router.get('/info',auth,UserCtrl.getUser)
module.exports=router