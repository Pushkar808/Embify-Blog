const mongoose = require('mongoose');
const multer = require('multer')
const path = require('path')
const BlogIMG = path.join('/uploads/users/blog')

const UserSchema = mongoose.Schema({//Db structure
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamp: true })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', BlogIMG))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})


const User = mongoose.model('User', UserSchema);
module.exports = User