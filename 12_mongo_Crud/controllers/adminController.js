const Admin = require('../models/adminTbl')

module.exports.home = async (req, res) => {
    try {
        const person = await Admin.find();
        res.render('home', { record: person });
    } catch (err) {
        console.error(err);
        return res.render('404');
    }
};

module.exports.addAdmin = async (req, res) => {
    const { name, email, phone, gender, hobby, password, city } = req.body;
    try{
        
        await Admin.create({
            name,   
            email,
            phone,
            gender,
            hobby,
            password,
            city
        });
        console.log("Record added successfully.");
        res.redirect("/");
    }catch(err){
        console.error(err);
        return res.render('404');
    }
}


module.exports.editAdmin = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await Admin.findById(id);

        if (!user) {
            console.log("User not found");
            return res.render('404');
        }

        res.render('edit', { user });
    }catch(err){
        console.error(err);
        return res.render('404');
    }
}

module.exports.updateAdmin = async (req, res) => {
    try{
        const id = req.params.id;
        const { name, email, phone, gender, hobby, password, city } = req.body;

        const user = await Admin.findByIdAndUpdate(id, {
            name,
            email,
            phone,
            gender,
            hobby,
            password,
            city
        });

        if (!user) {
            console.log("User not found");
            return res.render('404');
        }

        res.redirect("/");
    }catch(err){
        console.error(err);
        return res.render('404');
    }
}


module.exports.deleteAdmin = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await Admin.findByIdAndDelete(id);

        if (!user) {
            console.log("User not found");
            return res.render('404');
        }

        console.log("Record deleted successfully.");
        res.redirect("/");

    }catch(err){
        console.error(err);
        return res.render('404');
    }
}


