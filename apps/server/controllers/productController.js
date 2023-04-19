const { Product, Category } = require('../models/models');
const validator = require('validator');

const addNewProduct = async (req, res) => {
    const { name, desc, price, imgUrl, listed, CategoryId, imgUrl1, imgUrl2, imgUrl3, imgUrl4 } = req.body;

       
    // validation

    if (!imgUrl || !name || !desc || !price || !listed || !CategoryId) 
        return res.status(400).json({ 'message': 'Product details are missing.'});
    if (!validator.isCurrency(price)) 
        return res.status(400).json({ 'message': 'Invalid price.'});
    if (!validator.isURL(imgUrl)) 
        return res.status(400).json({ 'message': 'Invalid image URL.'});
    if (!validator.isBoolean(listed)) 
        return res.status(400).json({ 'message': 'Invalid listing status.'});
    // if (!validator.isUUID(CategoryId, {version: 4})) 
    //     return res.status(400).json({ 'message': 'Invalid category id.'});

    // check if category exists
    try {
        const checkCategory = await Category.findByPk(CategoryId);
    } catch (error) {
        return res.status(404).json({ 'message': 'Invalid category id.'})
    }

    try {
        
        const result = await Product.create({
            name: name,
            desc: desc,
            price: price,
            imgUrl: imgUrl,
            imgUrl1: imgUrl1,
            imgUrl2: imgUrl2,
            imgUrl3: imgUrl3,
            imgUrl4: imgUrl4,
            listed: listed,
            CategoryId: CategoryId
        });

        // console.log(result);

        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}
const getProductByCategory = async (req, res) => {
    const { id } = req.params;
    // check id
    try {
        const checkCategory = await Category.findByPk(id);
    } catch (error) {
        return res.status(404).json({ 'message': 'Invalid category id.'})
    }

    try {        
        const result = await Product.findAll({where: {CategoryId: id}, include: Category, 
            order: [['createdAt', 'DESC']]});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}

const updateProductListingById = async (req, res) => {
    const { id } = req.params;
    // check id
    
    const checkProduct = await Product.findByPk(id);
    if (!checkProduct) return res.status(404).json({ 'message': 'Invalid product id.'})

    checkProduct.listed = !checkProduct.listed;
    checkProduct.save()
    return res.status(200).json(checkProduct)

}

const countProductByCategory = async (req, res) => {
    const { id } = req.params;
    // check id
    try {
        const checkCategory = await Category.findByPk(id);
    } catch (error) {
        return res.status(404).json({ 'message': 'Invalid category id.'})
    }

    try {        
        const result = await Product.findAndCountAll({where: {CategoryId: id}, 
            include: Category, order: [['createdAt', 'DESC']]});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}

const getProductById = async (req, res) => {
    const { id } = req.params;

    try {        
        const result = await Product.findByPk(id, {include: Category});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}
const updateProductById = async (req, res) => {
    const { name, desc, price, imgUrl, imgUrl1, imgUrl2, imgUrl3, imgUrl4, listed, id } = req.body;

    // console.log(name, desc, price, imgUrl, listed, id)
    // validation
    if (!name || !desc || !price || !listed || !id)  
    return res.status(400).json({ 'message': 'Product details are missing.'});

    if (typeof price !== "number") return res.status(400).json({ 'message': 'Invalid price.'});
    if (typeof listed !== "boolean") return res.status(400).json({ 'message': 'Invalid price.'});
       
    // check if product exists
    try {
        const checkProduct = await Product.findByPk(id);
    } catch (error) {
        return res.status(404).json({ 'message': 'Invalid product id.'})
    }

    try {
        
        const result = await Product.update({
            name: name,
            desc: desc,
            price: price,
            imgUrl: imgUrl,
            imgUrl1: imgUrl1,
            imgUrl2: imgUrl2,
            imgUrl3: imgUrl3,
            imgUrl4: imgUrl4,
            listed: listed,
            
        }, {
            where: {id: id}
        });

        console.log(result)

        if (result[0] === 1) {
            const product = await Product.findByPk(id);
            return res.status(200).json(product);
        } else return res.status(400).json({message: "Cannot update product"})

        
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { addNewProduct, getProductByCategory, 
    getProductById, countProductByCategory, 
    updateProductById, updateProductListingById}