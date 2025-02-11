const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port =process.env.PORT || 5000;

//pass: 2rNfjviGD8DPlOuL
//middleware setup
app.use(express.json({limit:"25mb"}));
app.use((express.urlencoded({limit:"25mb"})));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

const uploadImage = require("./src/utils/uploadImage")
//routes
const authRoutes=require('./src/users/user.route');
const productRoutes= require('./src/products/products.route');
const reviewRoutes =require('./src/reviews/reviews.router');
const orderRoutes = require('./src/orders/orders.route')
const statsRoutes =require('./src/stats/stats.route')
const messageRoutes =require('./src/message/message.route')

app.use('/api/auth',authRoutes)
app.use('/api/products',productRoutes)
app.use('/api/reviews',reviewRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/stats',statsRoutes)
app.use('/api/message',messageRoutes)

main().then(()=>console.log("mongobd is successfully connected")).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  app.get('/', (req, res) => {
    res.send('Hello World!')
  });
}
app.post("/uploadImage", (req, res) => {
  console.log("Received Request Body:", req.body);
  uploadImage(req.body.image)
      .then((url) => res.send({ url }))
      .catch((err) => {
          console.error("Error during Cloudinary upload:", err.message || err);
          res.status(500).send({ error: err.message || "Failed to upload image" });
      });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})