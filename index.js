const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const Student = require('./constroller/student.controller');
const User = require('./constroller/user.controller');
const Auth = require('./constroller/auth.controller');
const Verify = require('./constroller/verifytoken.controller');

app = express();
app.use(bodyparser.json());

mongoose.connect("mongodb+srv://admin:aimy12312@cluster0.stvdu.gcp.mongodb.net/StudentDB?retryWrites=true&w=majority", { useUnifiedTopology: true , useNewUrlParser: true})
        .then(() => {
            console.log('Connect Successful');
        })
        .catch(err => {
            console.log('Connect:' + err.message);
        });

app.get('/', (req, res) => {
    res.json({'message': 'Hello NodeJS'});
});

app.post('/register',User.create);
app.post('/login', Auth.authenticate);
app.get('/list', Auth.verifytoken, User.list);

app.get('/student',Auth.verifytoken,Student.findAll );
app.post('/student', Student.create);
app.get('/student/:id', Student.findOne);
app.put('/student', Student.update);
app.delete('/student', Student.delete);

app.listen(3000, () =>{
    console.log('Connect port 3000');
});