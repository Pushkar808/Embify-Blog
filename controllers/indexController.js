const Employee = require('../models/userSchema')
const Post = require('../models/postSchema')


module.exports.home = (req, res) => {
    Post.find({}, (err, data) => {
        res.render("index" , {
            data:data
        });
    })
}
module.exports.login = (req, res) => {
    if (req.isAuthenticated()) {//if user is already signed in the don't show login form
        return res.redirect('/')
    }
    res.render('login')
}


//creating session for a particular user

module.exports.createSession = (req, res) => {
    console.log("Session created");
    Employee.findOne({
        email: req.body.email
    }, (err, data) => {
        if (err) { console.log("ERROR IN GETTING EMP DATA: " + err); return }
        // console.log(data)
        // res.redirect('back')
        if (data) {
            if (req.body.password != data.password)//if password mismatch
            {
                // req.flash('error', 'Wrong Username/Password');
                return res.render('login');
            }
            else
                res.cookie('user_id', data._id);
            // req.flash('success', 'Welcome');
            res.redirect('/');
        }
    })
}

//destroying session i.e signout
module.exports.destroySession = function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        // req.flash('success', 'Logged Out Succesfully');
        res.redirect('/login');//redirecting to index.ejs
    });


}