const employeeSchema = require('../models/userSchema');

//module to view employee
module.exports.employee = (req, res) => {
    if (!req.isAuthenticated() || !req.user.is_admin) {//if user if not admin or not signed in then unable to show this page
        return res.redirect('/');
    }
    employeeSchema.find({}, (err, Empdata) => {
        if (err) { console.log("ERROR in View of Emp" + err); return; }
        res.render('addEmployee');
    })
}
//module to add employee
module.exports.add_employee = async (req, res) => {
    

    let newEmp = await employeeSchema.create({
        name: req.body.name,
        email: req.body.empmail,
        password: req.body.password,
        is_admin: req.body.isadmin ? true : false,//initially employee is not admin
    })
    await employeeSchema.findByIdAndUpdate(newEmp, {
        added_by: req.user ? req.user.id : newEmp.id
    })
    res.redirect('back')
}


//module to delete employee
module.exports.delete = (req, res) => {
    if (!req.isAuthenticated() || !req.user.is_admin) {//if user if not admin or not signed in then unable to show this page
        return res.redirect('/');
    }
    employeeSchema.deleteOne({ id: req.query.id }, (err, data) => { if (err) console.log(err) });
    req.flash('success', 'Employee deleted!');
    res.redirect('back')
}