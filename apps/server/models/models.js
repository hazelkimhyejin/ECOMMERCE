const { DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
  
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mobile: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "admin",
      allowNull: false
    },
    refreshToken: {
      type: DataTypes.STRING
    },
    refreshToken1: {
      type: DataTypes.STRING
    },
    refreshToken2: {
      type: DataTypes.STRING
    },
    OTP: {
      type: DataTypes.STRING
    },
    OTPExpiry: {
      type: DataTypes.STRING
    },
  });
  
  User.sync();

  const Category = db.define('Category', {
  
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, );
  
  Category.sync();

  const Product = db.define('Product', {
  
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },    
    listed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },  
    imgUrl1: {
      type: DataTypes.STRING,
      allowNull: true
    }, 
    imgUrl2: {
      type: DataTypes.STRING,
      allowNull: true
    }, 
    imgUrl3: {
      type: DataTypes.STRING,
      allowNull: true
    }, 
    imgUrl4: {
      type: DataTypes.STRING,
      allowNull: true
    }, 
  }, );

  Category.hasMany(Product);
  Product.belongsTo(Category);
  Product.sync();

  const Order = db.define('Order', {
  
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fulfil: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },  
    cancel: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },  
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },  
    collect: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },  
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    
  }, );
  
  Product.hasMany(Order);  
  Order.belongsTo(Product);
  User.hasMany(Order);
  Order.belongsTo(User);
  Order.sync();

  const Cart = db.define('Cart', {
  
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },    
  }, );

  Product.hasMany(Cart);  
  Cart.belongsTo(Product);
  User.hasOne(Cart);
  Cart.sync()

  const Image = db.define('Image', {
  
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },  
    publicId: {
      type: DataTypes.STRING,
      allowNull: false
    },  
    next: {
      type: DataTypes.STRING,
      allowNull: true
    },  
  }
  )

  Image.sync()
  // Image.sync({ alter: true })

  module.exports = { User, Category, Product, Order, Cart, Image }