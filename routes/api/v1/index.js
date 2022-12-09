const express = require('express');
const router = express.Router();
const api_index_controller = require('../../../controllers/api_controller/v1/index_controller')
const passport=require('passport')

router.get('/fetchallPosts', api_index_controller.fetchallPosts);
router.get('/viewfullPost',api_index_controller.viewfullPost)
router.post('/createPost', api_index_controller.createPost);

module.exports = router