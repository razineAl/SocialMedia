const {verify} = require('jsonwebtoken');

const validateToken = (req,res,next)=>{

    const accessToken = req.header('accessToken');

    if(!accessToken) return res.json({error:'user not logged in !'});


    const validToken = verify(accessToken,'seecreet');
    req.user = validToken;
    try {
        if (validToken) {
            return next();
        }
    } catch (err) {
        res.json({error:err});
    }
}
module.exports = {validateToken} ;