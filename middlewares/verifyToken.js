const jwt=require("jsonwebtoken");
const secret=process.env.SECRET || 'secret';

const verifyToken = (req, res, next) => {
  try {
    let decodedToken=jwt.verify(req.get('Authorization'), secret);
    req.decodedToken=decodedToken;
    next();
  } catch (error) {
    res.send('You are not authorized');
  }
}

module.exports=verifyToken;