const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

exports.authenticate = (req, res) => {
    User.findOne({ email: req.body.email },  (err, user)  => {
        if (err) return res.status(500).send({'message':'Error on the server.'});
        if (!user) return res.status(404).send({'message':'No user found.'});
        
        // check if the password is valid
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    
        // if user is found and password is valid
        // create a token
        var token = jwt.sign({ id: user._id }, 'APINODEJS', {
          expiresIn: 86400 // expires in 24 hours
        });
    
        // return the information including token as JSON
        res.status(200).send({ auth: true, token: token });
      });
}

exports.verifytoken = (req, res, next) =>  {

    // check header or url parameters or post parameters for token
    var token = req.body.token;
    console.log(token);
    if (!token) {
        console.log(token);
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
      
  
    // verifies secret and checks exp
    jwt.verify(token,'APINODEJS', (err, decoded) => {      
      if (err) 
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });    
  
      // if everything is good, save to request for use in other routes
      req.userId = decoded.id;
      next();
    });
  
  }

  
  