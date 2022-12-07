const express=require('express');
const router=express.Router();
const employeeController=require('../controllers/employeeController');

// router.use('/admin',require('./admin'))
router.use('/addEmp',employeeController.add_employee);
router.use('/delete',employeeController.delete);
router.use('/',employeeController.employee);

module.exports=router;