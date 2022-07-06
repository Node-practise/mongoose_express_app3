const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')

const Product = require('./model/product');
// import mongoose module and connect with mongodb
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/FarmStand', {useNewUrlParser: true})
        .then(() =>{
          console.log('Mongo connection open!!')
        })
        .catch(err => {
          console.log('Oh no Mongo connection Error!!')
          console.log(err)
        })

// Configure views directory to middleware 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

// api to read products, async added since query will take time
// index api
app.get('/products', async (req, res) => {
  const products = await Product.find({})
  console.log(products)
  res.render('product/index', {products})
})

// New api
app.get('/products/new', (req, res) => {
  res.render('product/new')
})

// Create api
app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body)
  await newProduct.save()
  res.redirect(`/products/${newProduct._id}`)
})

// Show api
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id)
  res.render('product/show', {product})
})

// Edit api
app.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id)
  res.render('product/edit', {product})
})

// Update api
// method-override is used above to make put call
app.put('products/:id', async (req, res) => {
  const { id } = req.params;
  const product = Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
  console.log(product)
  res.send('Put!!!!!!!')
})

app.delete('product/:id', async (req, res) => {
  const { id } = req.params;
  const deletedProduct = Product.findByIdAndDelete(id);
  res.redirect('/products')
})


// Express server function to listen @port 3000
app.listen(3000, () => console.log('Listing at port 3000'))