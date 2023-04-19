const cloudinary = require('cloudinary').v2;
const { Image } = require('../models/models');
const validator = require('validator');

const deleteImage = async (req, res) => {
    const { public_id } = req.body;

    if (!public_id) return res.status(400).json({message: "No public id"})
    
    cloudinary.uploader
        .destroy(public_id)
        .then(result=> {
            // console.log(result)
            if (result.result === 'ok') {
                return res.status(200).json(result)
            } else {
                return res.status(400).json(result)
            }
            
        });        
}

const addImageToDb = async (req, res) => {
    const { publicId, imgUrl, next } = req.body
    if (!publicId || !imgUrl) 
        return res.status(400).json({ 'message': 'Image details are missing.'});
    if (!validator.isURL(imgUrl)) 
        return res.status(400).json({ 'message': 'Invalid image URL.'});
    try {
        const result = await Image.create({
            publicId: publicId,
            imgUrl: imgUrl,
            next: next
        })
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ 'message': err.message });
    }
}
  
module.exports = { deleteImage, addImageToDb }