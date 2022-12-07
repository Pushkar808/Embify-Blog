const express = require('express');
const router = express.Router();
const api_index_controller = require('../../../controllers/api_controller/v1/index_controller')
const passport=require('passport')

router.get('/fetchPosts', api_index_controller.fetchPosts);
router.post('/createPost', api_index_controller.createPost);

module.exports = router