const userData = require('../../../models/userSchema');
const Post = require('../../../models/postSchema');
const multer = require('multer');


module.exports.fetchPosts = (req, res) => {
    console.log('ok')
}

module.exports.createPost = (req, res) => {
    try {
        Post.uploadIMG(req, res, (err) => {
            if (err)
                console.log('Multer errror' + err);
            Post.create({
                heading: req.body.heading,
                description: req.body.description,
                postImage: Post.path + '/' + req.file.filename,
                createdBy: req.user.id,
            })
            res.redirect('back');
        });
    } catch (error) {
        console.log("*** MULTER ERROR OCCURED");
    }
}