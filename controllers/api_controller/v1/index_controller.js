const userData = require('../../../models/userSchema');
const Post = require('../../../models/postSchema');
const multer = require('multer');


module.exports.fetchallPosts = (req, res) => {
    Post.find({})
        .populate('createdBy', 'name')
        .exec((err, data) => {
            if (err) {//if err occuered
                return res.status(500).json({
                    data: {
                        message: "Some error occured",
                        suggetion: "Check the id again"
                    }
                });
            }
            if (data)//if data found then send the response
            {
                return res.status(200).json({
                    data: data
                });
            }
        })
}

module.exports.createPost = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(500).json({
            Error: {
                message: "Please Sign in to post"
            }
        });
    }

    try {
        Post.uploadIMG(req, res, (err) => {
            if (err)
                console.log('Multer errror' + err);
            Post.create({
                heading: req.body.heading,
                description: req.body.description,
                postImage: Post.path + '/' + req.file.filename,//saving file name for particular post 
                createdBy: req.user.id,
            })
            res.redirect('back');
        });
    } catch (error) {
        console.log("*** MULTER ERROR OCCURED");
    }
}

//module to view full post with the help of id supplied
module.exports.viewfullPost = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(500).json({
            Error: {
                message: "Please Sign in to post"
            }
        });
    }
    Post.findById(req.query.id)
        .populate('createdBy', 'name')
        .exec((err, data) => {
            if (err) {//if err occuered
                return res.status(500).json({
                    data: {
                        message: "Some error occured",
                        suggetion: "Check the id again"
                    }
                });
            }
            else
                return res.render("viewPost", {
                    data: data
                });
        })
}