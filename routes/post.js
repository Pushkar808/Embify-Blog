const express=require('express');
const router=express.Router();
const postController=require('../controllers/postController');

// router.use('/editEmp',adminController.editEmp);
// router.use('/edit',adminController.edit);
// router.use('/editmemData',adminController.editmemData);
// router.use('/resetPassword',adminController.resetPassword);
 
router.use('/',postController.home)

module.exports=router;