const mongoose = require('mongoose')
const Product = require('./model/product');

mongoose.connect('mongodb://localhost:27017/FarmStand', {useNewUrlParser: true})
        .then(() =>{
          console.log('Mongo connection open!!')
        })
        .catch(err => {
          console.log('Oh no Mongo connection Error!!')
          console.log(err)
        })

// Insert One product at a time
// const p = new Product({ name: 'Ruby Grapefruit', price: 1.99, category: 'fruit' })
// p.save().then(p =>{
//   console.log(p)
// })
// .catch(err => {
//   console.log(err)
// })


const seedProducts = [
  { name: 'Organic Mini Seedless Watermelon',
    price: 3.99,
    category: 'fruit'
  },
  { name: 'Organic Celery',
    price: 1.50,
    category: 'vegetable'
  },
  { name: 'Chocolate whole Milk',
    price: 2.33,
    category: 'dairy'
  }
]

// Insert many product
Product.insertMany(seedProducts)
.then(res => {
  console.log(res)
})
.catch(e =>{
  console.log('error from seed')
  console.log(e)
})