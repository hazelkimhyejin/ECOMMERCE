const { Category } = require('../models/models');
const validator = require('validator');

const addNewCategory = async (req, res) => {
    const { name, imgUrl } = req.body;
    // validation

    if (!imgUrl || !name) return res.status(400).json({ 'message': 'Username, mobile, password are required.'});
    if (!validator.isURL(imgUrl)) 
        return res.status(400).json({ 'message': 'Invalid image URL.'});

    try {
        
        const result = await Category.create({
            name: name,
            imgUrl: imgUrl,
        });

        // console.log(result);

        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}
const getAllCategory = async (req, res) => {
    try {        
        const result = await Category.findAll({order: [['name', 'ASC']]});

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {        
        const result = await Category.findByPk(id);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { addNewCategory, getAllCategory, getCategoryById }