require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const morgan = require("morgan");
// const db = require("./config/database");
const { Sequelize } = require('sequelize');


const credentials = require("./middleware/credentials");
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT');
const verifyAdmin = require('./middleware/verifyAdmin');

// routers
const productRouter = require("./routes/productRouter");
const productAdminRouter = require("./routes/productAdminRouter");
const userRouter = require("./routes/userRouter");
const userAuthRouter = require("./routes/userAuthRouter");
const categoryRouter = require("./routes/categoryRouter");
const categoryAdminRouter = require("./routes/categoryAdminRouter");
const orderRouter = require("./routes/orderRouter");
const orderAdminRouter = require("./routes/orderAdminRouter");
const cartRouter = require("./routes/cartRouter");
const smsRouter = require("./routes/smsRouter");
const smsAuthRouter = require("./routes/smsAuthRouter");
const cloudinaryRouter = require("./routes/cloudinaryRouter");

const PORT = process.env.PORT || 3000;
const app = express();

// middleware
app.use(express.static("../client/dist"));

app.use(cors(corsOptions));
// app.use(cors());

app.use(credentials);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/order", orderRouter);
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/sms/auth", smsAuthRouter);

// routes that require auth
app.use(verifyJWT);
app.use("/api/cart", cartRouter);
app.use("/api/user/auth", userAuthRouter);

// routes that require admin
app.use(verifyAdmin);
app.use("/api/category/admin", categoryAdminRouter);
app.use("/api/sms", smsRouter);
app.use("/api/cloudinary", cloudinaryRouter);
app.use("/api/product/admin", productAdminRouter);
app.use("/api/order/admin", orderAdminRouter);

// app.get("/", (req, res) => {res.json({msg: "hello world"})});

app.get("/*", (req, res) => {
  res.sendFile(path.resolve("../client/dist/index.html"));
})

const db = new Sequelize(process.env.SQL_URI)
// postgres
try {
    db.authenticate();
    console.log('Connected to database');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
app.listen(PORT, () => {
console.log(`Server listening on port ${PORT}`);})

    
