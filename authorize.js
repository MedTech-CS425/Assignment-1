const authorization = (req, res, next) => {
    try {
      jwt.verify(req.get('Authorization'), 'anysecret', (err, result)=>{
          if (err){
              return res.send('Invalid Token'); 
          }
          req.user = result; 
      });
      next();
    } catch (error) {
      res.send('You are not authorized');
    }
  }

module.exports = authorization; 