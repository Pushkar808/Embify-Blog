const mongoose = require('mongoose');
const multer = require('multer')
const path = require('path')
const BlogIMG = path.join('uploads/users/blog')
const apath=path.join(__dirname, '..', BlogIMG)

console.log(apath)
const PostSchema = mongoose.Schema({//Db structure
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    postImage:{
        type:String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamp: true })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, apath)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})


//static methods
PostSchema.statics.uploadIMG=multer({storage:storage}).single('image');
PostSchema.statics.path= BlogIMG;


const Post = mongoose.model('post', PostSchema);
module.exports = Post