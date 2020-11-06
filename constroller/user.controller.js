const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(8);

exports.create = (req, res) => {
    var pw = bcrypt.hashSync(req.body.password, salt, null)

    var user = new User({
        email: req.body.email,
        password: pw
    });

    user.save()
    .then(() => {
        res.json({'message': 'User create successful'});
    })
    .catch(err => {
        res.json({'message': err.message});
    })
}

exports.list = (req, res) => {
    User.find()
    .then(users => {
        res.json({'users': users});
    })
    .catch(err => {
        res.json({'message': err.message});
    });
}

exports.update = (req, res) => {
    User.findByIdAndUpdate(req.body.id,{
        fullname:req.body.fullname,
        address: req.body.address
    }, {new : true}, )
    .then(user => {

    })
    .catch(err => {

    });
}

exports.delete = (req, res) => {
    User.findByIdAndRemove(req.body.id)
    .then(() => {

    })
    .catch(err => {
        
    });
}