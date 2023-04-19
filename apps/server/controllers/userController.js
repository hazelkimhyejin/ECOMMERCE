const { User } = require('../models/models');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

const handleNewUser = async (req, res) => {
    const { name, mobile, password } = req.body;
    // validation

    if (!mobile || !password || !name) return res.status(400).json({ 'message': 'Username, mobile, password are required.'});
    if (!validator.isLength(mobile, {min: 8, max: 8})) 
        return res.status(400).json({ 'message': 'Mobile number has 8 numbers only.'});
    if (!validator.isNumeric(mobile, {no_symbols: true})) 
        return res.status(400).json({ 'message': 'Mobile number cannot have symbols.'});
    if (!validator.isAlphanumeric(password)) 
        return res.status(400).json({ 'message': 'Password invalid.'});
    if (!validator.isLength(password, {min: 5})) 
        return res.status(400).json({ 'message': 'Password must be at least 5 characters.'});
    if (!validator.isLength(name, {min: 1, max: 30})) 
        return res.status(400).json({ 'message': 'Name must be between 1 and 30 characters.'});

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({where: { mobile: mobile }});
    if (duplicate) return res.status(409).json({ 'message': 'Mobile number already taken.'}); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new mobile
        const result = await User.create({
            name: name,
            password: hashedPwd,
            mobile: mobile
        });

        // console.log(result);

        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const handleLogin = async (req, res) => {
    const { mobile, password } = req.body;
    
    if (!mobile || !password) return res.status(400).json({ 'message': 'Username, mobile, password are required.'});
    if (!validator.isLength(mobile, {min: 8, max: 8})) 
        return res.status(400).json({ 'message': 'Mobile number has 8 numbers only.'});
    if (!validator.isNumeric(mobile, {no_symbols: true})) 
        return res.status(400).json({ 'message': 'Mobile number cannot have symbols.'});
    if (!validator.isAlphanumeric(password)) 
        return res.status(400).json({ 'message': 'Password invalid.'});
    if (!validator.isLength(password, {min: 5})) 
        return res.status(400).json({ 'message': 'Password must be at least 5 characters.'});


    const foundUser = await User.findOne({where: { mobile: mobile }});
    // console.log(foundUser);
    if (!foundUser) return res.status(401).json({ 'message': 'User not found.'});
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {

        try {
            // create JWTs
            const accessToken = jwt.sign(
                {
                    "userInfo" : {
                        "mobile": foundUser.mobile,
                        "role": foundUser.role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' }
            );
            const refreshToken = jwt.sign(
                { "mobile": foundUser.mobile, },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '2d' }
            );

            // cascading prev refreshTokens
            const refreshToken1 = foundUser.refreshToken
            const refreshToken2 = foundUser.refreshToken1
            foundUser.refreshToken2 = refreshToken2
            foundUser.refreshToken1 = refreshToken1

            // Saving refreshToken with current mobile
            foundUser.refreshToken = refreshToken;
            const result = await foundUser.save();           
            

            // Creates Secure Cookie with refresh token
            res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 2 * 24 * 60 * 60 * 1000 });

            return res.status(200).json({ 
                name: foundUser.name,
                id: foundUser.id,
                mobile: foundUser.mobile,
                role: foundUser.role,
                accessToken: accessToken
            });
            } catch (error) {
                return res.status(500).json({ 'message': 'Server error.'});
            }
        } else {
            return res.status(401).json({ 'message': 'Password incorrect.'});
        }        
}

const handleRefreshToken = async (req, res) => {
    // console.log(req.cookies)
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ message: "No cookie found" });
    const refreshToken = cookies.jwt;
    // console.log(refreshToken);

    let foundUser = null;
    // check all refreshtokens on DB
    foundUser = await User.findOne({where: { refreshToken: refreshToken }});
    if (!foundUser) {
        foundUser = await User.findOne({where: { refreshToken1: refreshToken }});
    }
    if (!foundUser) {
        foundUser = await User.findOne({where: { refreshToken2: refreshToken }});
    }
    if (!foundUser) return res.status(403).json({ message: "User not found"});
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.mobile !== decoded.mobile) return res.status(403).json({ message: "Refresh not allowed"});;
            const role = foundUser.role;
            const accessToken = jwt.sign(
                {
                    "userInfo": {
                        "mobile": decoded.mobile,
                        "role": role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' }
            );
            res.status(200).json({ 
                name: foundUser.name,
                id: foundUser.id,
                mobile: foundUser.mobile,
                role: foundUser.role,
                accessToken: accessToken,
                // persist: req.session.persist
             })
        }
    );
}

const handleUpdateUser = async (req, res) => {
    const { name, mobile, password, oldMobile } = req.body;
    // validation

    if (!mobile || !password || !name || !oldMobile) return res.status(400).json({ 'message': 'Username, mobile, password are required.'});
    if (!validator.isLength(mobile, {min: 8, max: 8})) 
        return res.status(400).json({ 'message': 'Mobile number has 8 numbers only.'});
    if (!validator.isNumeric(mobile, {no_symbols: true})) 
        return res.status(400).json({ 'message': 'Mobile number cannot have symbols.'});
    if (!validator.isLength(oldMobile, {min: 8, max: 8})) 
        return res.status(400).json({ 'message': 'Mobile number has 8 numbers only.'});
    if (!validator.isNumeric(oldMobile, {no_symbols: true})) 
        return res.status(400).json({ 'message': 'Mobile number cannot have symbols.'});
    if (!validator.isAlphanumeric(password)) 
        return res.status(400).json({ 'message': 'Password invalid.'});
    if (!validator.isLength(name, {min: 1, max: 30})) 
        return res.status(400).json({ 'message': 'Name must be between 1 and 30 characters.'});

    // check for duplicate mobile in the db
    if (mobile !== oldMobile) {
        const duplicate = await User.findOne({where: { mobile: mobile }});
        if (duplicate) return res.status(409).json({ 'message': 'Mobile number already taken.'}); //Conflict 
    }
    

    // evaluate password 
    const foundUser = await User.findOne({where: { mobile: oldMobile }});
    if (!foundUser) return res.status(404).json({ 'message': 'User not found.'});
    const id = foundUser.id;
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        try {
                
            //update new details
            await User.update(
                {
                    mobile: mobile,
                    name: name
                }, 
                {
                    where: { mobile: oldMobile }
                });
    
            const result = await User.findByPk(id);
            
            res.status(200).json(
                {
                    name: result.name,
                    id: result.id,
                    mobile: result.mobile,
                    role: result.role,
                }
            );
        } catch (err) {
            res.status(500).json({ 'message': err.message });
        }
    } else {
        return res.status(401).json({ 'message': 'Invalid password'})
    }
    
}

const handleUpdatePassword = async (req, res) => {
    const { mobile, password, oldPassword } = req.body;
    // validation

    if (!mobile || !password || !oldPassword) return res.status(400).json({ 'message': 'Mobile and password are required.'});
    if (!validator.isLength(mobile, {min: 8, max: 8})) 
        return res.status(400).json({ 'message': 'Mobile number has 8 numbers only.'});
    if (!validator.isNumeric(mobile, {no_symbols: true})) 
        return res.status(400).json({ 'message': 'Mobile number cannot have symbols.'});
    if (!validator.isAlphanumeric(password)) 
        return res.status(400).json({ 'message': 'Password invalid.'});
    if (!validator.isLength(password, {min: 5})) 
        return res.status(400).json({ 'message': 'Password must be at least 5 characters.'});

    

    // evaluate password 
    const foundUser = await User.findOne({where: { mobile: mobile }});
    if (!foundUser) return res.status(404).json({ 'message': 'User not found.'});
    const id = foundUser.id;
    const match = await bcrypt.compare(oldPassword, foundUser.password);
    if (match) {
        try {
                
            // hash new password
            const hashedPwd = await bcrypt.hash(password, 10);

            //update new details
            await User.update(
                {
                    password: hashedPwd
                }, 
                {
                    where: { mobile: mobile }
                });
    
            const result = await User.findByPk(id);
            
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ 'message': err.message });
        }
    } else {
        return res.status(401).json({ 'message': 'Invalid password'})
    }
    
}

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    let foundUser = null;
    foundUser = await User.findOne({where: { refreshToken: refreshToken }});
    if (!foundUser) await User.findOne({where: { refreshToken1: refreshToken }});
    if (!foundUser) await User.findOne({where: { refreshToken2: refreshToken }});
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    // console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

const handleForgotPassword = async (req, res) => {
    const { mobile } = req.body;
    if (!mobile) return res.status(400).json({ 'message': 'Mobile is required.'});
    if (!validator.isLength(mobile, {min: 8, max: 8})) 
        return res.status(400).json({ 'message': 'Mobile number has 8 numbers only.'});
    if (!validator.isNumeric(mobile, {no_symbols: true})) 
        return res.status(400).json({ 'message': 'Mobile number cannot have symbols.'});

    // check user exists 
    const foundUser = await User.findOne({where: { mobile: mobile }});
    if (!foundUser) return res.status(404).json({ 'message': 'User not found.'});
    return res.status(200).json({ 'mobile': mobile })
}

const handleOTPVerification = async (req, res) => {
    const { mobile, otp } = req.body;
    if (!mobile) return res.status(400).json({ 'message': 'Mobile is required.'});
    if (!validator.isLength(mobile, {min: 8, max: 8})) 
        return res.status(400).json({ 'message': 'Mobile number has 8 numbers only.'});
    if (!validator.isNumeric(mobile, {no_symbols: true})) 
        return res.status(400).json({ 'message': 'Mobile number cannot have symbols.'});
    if (!validator.isLength(otp, {min: 6, max: 6})) 
        return res.status(400).json({ 'message': 'OTP has 6 numbers only.'});

    // check user exists 
    const foundUser = await User.findOne({where: { mobile: mobile }});
    if (!foundUser) return res.status(404).json({ 'message': 'User not found.'});

    // check OTP
    const match = await bcrypt.compare(otp, foundUser.OTP);
    // get time now
    const now = dayjs()
    
    // verify OTP and expiry time
    if (!match || now.isAfter(dayjs(JSON.parse(foundUser.OTPExpiry)))) {
        return res.status(403).json({ 'message': 'OTP invalid'})
    } else if (match && now.isBefore(dayjs(JSON.parse(foundUser.OTPExpiry)))) {
        // create accessToken
        const accessToken = jwt.sign(
            {
                "userInfo" : {
                    "mobile": foundUser.mobile,
                    "role": foundUser.role
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
            { "mobile": foundUser.mobile, },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '2d' }
        );

        // cascading prev refreshTokens
        const refreshToken1 = foundUser.refreshToken
        const refreshToken2 = foundUser.refreshToken1
        foundUser.refreshToken2 = refreshToken2
        foundUser.refreshToken1 = refreshToken1

        // Saving refreshToken with current mobile
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();       
        
        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 2 * 24 * 60 * 60 * 1000 });
        
        return res.status(200).json({
            name: foundUser.name,
            id: foundUser.id,
            mobile: foundUser.mobile,
            role: foundUser.role,
            accessToken: accessToken})
    } else {
        return res.status(400).json({ 'message': 'Error: cannot verify OTP'})
    }

}

const handleResetPassword = async (req, res) => {
    const { mobile, password } = req.body;
    // validation

    if (!mobile || !password) return res.status(400).json({ 'message': 'Mobile and password are required.'});
    if (!validator.isLength(mobile, {min: 8, max: 8})) 
        return res.status(400).json({ 'message': 'Mobile number has 8 numbers only.'});
    if (!validator.isNumeric(mobile, {no_symbols: true})) 
        return res.status(400).json({ 'message': 'Mobile number cannot have symbols.'});
    if (!validator.isAlphanumeric(password)) 
        return res.status(400).json({ 'message': 'Password invalid.'});
    if (!validator.isLength(password, {min: 5})) 
        return res.status(400).json({ 'message': 'Password must be at least 5 characters.'});    

    // evaluate password 
    const foundUser = await User.findOne({where: { mobile: mobile }});
    if (!foundUser) return res.status(404).json({ 'message': 'User not found.'});
    const id = foundUser.id;
    // const match = await bcrypt.compare(oldPassword, foundUser.password);
    // if (match) {
        try {
                
            // hash new password
            const hashedPwd = await bcrypt.hash(password, 10);

            //update new details
            await User.update(
                {
                    password: hashedPwd
                }, 
                {
                    where: { mobile: mobile }
                });
    
            const result = await User.findByPk(id);
            
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ 'message': err.message });
        }
    // } else {
    //     return res.status(401).json({ 'message': 'Invalid password'})
    // }
    
}

module.exports = { handleNewUser, handleLogin, handleRefreshToken, 
    handleUpdateUser, handleUpdatePassword, handleLogout, handleForgotPassword,
    handleOTPVerification, handleResetPassword
}