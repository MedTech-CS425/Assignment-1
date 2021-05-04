const User = require("../models/user.model");
const bcrypt=require("bcrypt");

const jwt=require("jsonwebtoken");
const secret=process.env.SECRET || 'secret';

module.exports={
    login: async (email,password)=>{
        const user=await User.findOne({email: email});
        if(user){
            console.log("user exists");
        
            let match=await bcrypt.compare(password,user.password);
           
            if(match){
               console.log(user.id);
               let token=jwt.sign({id:user.id},secret,{ expiresIn: '12h' });
               let reponse={
                   user:user,
                   token:token
               };
               console.log(reponse);

               return reponse;
            }else
                console.log("u out");
            
        }
    },
    register: async (userInfo)=>{
        const result=await User.findOne({email:userInfo.email});
        if (!result){
            console.log("email does not exist");
           let hash=await bcrypt.hash(userInfo.password,process.env.SALT_ROUNDS||6)
           userInfo.password=hash;
            return User.create(userInfo);
        }else{
            throw new Error("email already exists");
        }

    },
    getUser:async(userId)=>{
        const result=await User.findById(userId,'email password userName').exec();
        if(!result) throw new Error("doest exist");
        return result;

    }

    
}