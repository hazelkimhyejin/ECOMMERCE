const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({'message': "Access denied (JWT)"});
    const token = authHeader.split(' ')[1];
    // console.log("token", token)
    jwt.verify(
        
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({'message': 'Access denied'}); //invalid token
            
            req.mobile = decoded.userInfo.mobile;
            req.role = decoded.userInfo.role;
            next();
        }
    );
}

module.exports = verifyJWT