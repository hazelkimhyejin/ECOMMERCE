// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);  
const validator = require('validator');
const { User } = require('../models/models');
const dayjs = require('dayjs')
const bcrypt = require('bcrypt');

const sendWhatsapp = async (req, res) => {
    const { message, mobile } = req.body;
    if (typeof mobile !== "number") return res.sendStatus(400)
    if (mobile > 99999999 || mobile <9999999) return res.sendStatus(400)
    const messageInfo = { 
        body: message, 
        from: 'whatsapp:+14155238886',       
        to: `whatsapp:+65${mobile}` 
    }
    try {
        await client.messages 
        .create(messageInfo) 
        .then(message => console.log(message.sid)) 
        return res.status(201).json(messageInfo)
    } catch (error) {
        console.log(error)
    }
    
    
}

const sendOTP = async (req, res) => {
    let { mobile } = req.body;
    
    if (!mobile) return res.status(400).json({ 'message': 'Mobile is required.'});
    if (!validator.isLength(mobile, {min: 8, max: 8})) 
        return res.status(400).json({ 'message': 'Mobile number has 8 numbers only.'});
    if (!validator.isNumeric(mobile, {no_symbols: true})) 
        return res.status(400).json({ 'message': 'Mobile number cannot have symbols.'});
    if (typeof(mobile) === "number") {
        mobile = parseInt(mobile);
    }

    // check user exists 
    const foundUser = await User.findOne({where: { mobile: mobile }});
    if (!foundUser) return res.status(404).json({ 'message': 'User not found.'});
    // create OTP for demo purposes its always 998877
    let otp = 998877;    
    foundUser.OTP = await bcrypt.hash(otp.toString(), 10);
    // create OTP expiry
    const OTPExpiry = dayjs().add(5, 'minute')
    foundUser.OTPExpiry = JSON.stringify(OTPExpiry)
    await foundUser.save()
    
    const message = `Your GroupBuy OTP is: ${otp}`;
    const messageInfo = { 
        body: message, 
        from: 'whatsapp:+14155238886',       
        to: `whatsapp:+65${mobile}` 
    }
    try {
        await client.messages 
        .create(messageInfo) 
        .then(message => console.log(message.sid)) 
        return res.status(201).json({'message': 'OTP sent'})
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = { sendWhatsapp, sendOTP }

