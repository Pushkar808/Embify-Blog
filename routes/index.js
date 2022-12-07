const express = require('express');
const router = express.Router();
const index_controller = require('../controllers/indexController')
const passport=require('passport')

router.use('/createSession', passport.authenticate('local', {
    failureRedirect: '/login'
}), index_controller.createSession);

router.use('/user', require('./user'))
router.use('/login', index_controller.login)
router.use('/logout',index_controller.destroySession)
router.use('/v1',require('./api/v1/index'));
router.use('/posts',require('./post'));

router.use('/', index_controller.home);

module.exports = router