const Student = require('../model/student.model');

exports.findAll = (req, res) =>{
    Student.find()
        .then(students => {
             res.json({ 'students': students});   
        })
        .catch(err => {
            res.json({ 'message': err.message});
        });
}

exports.create = (req, res) =>{
    var student = new Student({
        name: req.body.name,
        address: req.body.address,
        image: req.body.image,
        gender: req.body.gender
    });

    student.save()
        .then(() => {
            res.json({'message': 'Student create successful'});
        })
        .catch(err => {
            res.json({'message': err.message});
        })
}

exports.findOne = (req, res) => {
    Student.findById(req.body.id)
    .then(student => {
        res.json({student});
    })
    .catch(err =>{
        res.json({'message': err.message});
    });
}

exports.update = () => {

}

exports.delete = () =>{
    
}

// const router = require("express").Router();
// router.get("/", (req, res) => {
//   res.json({
//     error: null,
//     data: {
//       title: "My dashboard",
//       content: "dashboard content",
//       user: req.user, // token payload information
//     },
//   });
// });
// module.exports = router;