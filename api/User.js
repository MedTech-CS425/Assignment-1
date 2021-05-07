const express = require('express');
const router = express.Router();

 // mongodb user model 
 const User = require('./../models/User');

 //password handler
 const bcrypt = required('bcrypt');

//signup
router.post('/signup',(req, res) => {
   let {name, email, password, dateOfBirth} = req.body;
   name = name.trim();
   email = email.trim();
   password = password.trim();
   dateOfBirth = dateOfBirth.trim();

   if (name == "" || email == ""|| password == ""|| dateOfBirth == ""){
       res.json({
           status: "FAILED",
           message: "Empty input field!"
       });
   } else if (!/^[a-z A-Z ]*$/.test(name)){
     res.json({
         status: "FAILED",
         message:"Invalid name entered"
     });
   } else if (!/^[w-\.]+\.]+[\w-]{2,4}$/.test(email)){
    res.json({
        status: "FAILED",
        message:"Invalid email entered"  
    })
   } else if (!new Date (dateOfBirth).getTime()){
    res.json({
        status: "FAILED",
        message:"Invalid date od birth entered"  
    })   
   } else if (password.lengthc< 8){
    res.json({
        status: "FAILED",
        message:"Password is too short"  
    })
   }else{
//checking if user already exists

User.find({email}).then(result =>{
    if(result.length){
        //a user already exists
        res.json({
            status: "FAILED",
            message:"Userwith the provided email already exists"
        })
    } else{
        //try to create new user

        // password handling
        const saltRounds = 10;
        bcrypt.hash(password, saltRound).then(hashedPassword =>{
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                dateOfBirth
            });
            newUser.save().then(result =>{
                res.json({
                    status: "SUCCESS",
                    message: "Signup successful",
                    data: result,
                })  
                .catch(err =>{
                    res.json({
                        status: "FAILED",
                        message: " An error occured while saving user account!"
                    })  
                })  
            })
        })
        .catch(err =>{
            res.json({
                status: "FAILED",
                message: " An error occured while hashing password!"
            })  
        })
    }
}).catch(err => {
console.log(err);
res.json({
    status: "FAILED",
    message: " An error occured while checking for existing user!"
})
})


   }
})

//signin
router.post('/signin',(req, res) =>{
    let {email, password} = req.body;
    email = email.trim();
    password = password.trim();
 
if (email==""|| password==""){
    res.json({
        status: "FAILED",
        message: "Empty credentials supplied"
    })  
} else {
    //check if user exist
    User.find({email})
    .then(data =>{
        if(data.length){
            //user exists
            const hashedPassword = data[0].password;
            bcrypt.compare(password,hashedPassword).then(result =>{
                if (result){
                    //password match
                    res.json({
                        status: "SUCCESS",
                        message: "Signin successful",
                        data: data
                    })
                }else{
                    res.json({
                        status: "FAILED",
                        message: "invalid password entered"
                    })
                }
            })
            .catch(err=>{
                res.json({
                status: "FAILED",
                message: " An error occured while comparing!"
            })
        })
        }else {
            res.json({
                status: "FAILED",
                message: " Invalid credentials entered!"
            })
        }
    })
    .catch(err =>{
        res.json({
            status: "FAILED",
            message: " An error occured while checking for existing user!"
        })
    })
}





})

module.exports = router;