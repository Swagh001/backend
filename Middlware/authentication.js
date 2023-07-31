var jwt = require('jsonwebtoken');

const Authentication=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]
    console.log(token);
    if(!token){
        res.send("please login first")
    }
    else{
        jwt.verify(token, process.env.SECRET_KEY, async function(err, decoded) {
            if(err){
                res.send("please login")
            }
            else{
                const user_email = decoded.email
                req.user_email = user_email
                // console.log(user_email);
                next()
            }
          });
    }
}

module.exports={Authentication}