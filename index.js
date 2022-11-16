const express = require('express');
const { Db } = require('mongodb');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const Prod = require('./models')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/create', async (req, res) => {
    const product = new Prod()
    product.Name = req.body.Name;
    product.Quantity = req.body.Quantity
    product.Price = req.body.Price
    product.Type = req.body.Type
    let result = await product.save()
    return res.json({result})
  })

app.get('/:name', async (req, res) => {
    let Name = req.params.name
    let result = await Prod.findOne({Name});
    console.log(result)
    return res.json({result})
  })

app.put('/update', async (req, res) => {
    let product = await Prod.findOne({_id: req.body._id}, );
    product.Name = req.body.Name ? req.body.Name : product.Name
    product.Quantity = req.body.Quantity ? req.body.Quantity : product.Quantity
    product.Price = req.body.Price ? req.body.Price : product.Price
    product.Type = req.body.Type ? req.body.Type : product.Type
    let result = await product.save()
    return res.json({result})

  })

app.delete('/delete/:productId', async (req, res) => {
    let _id = req.params.productId
    console.log(_id)
    await Prod.deleteOne({_id}) 
    return res.send()

  })
const connectMongoDb = async () =>{
    await  mongoose.connect('mongodb+srv://locad:locad@cluster0.xpe48nu.mongodb.net/?retryWrites=true&w=majority', () => {
        console.log('connected to db')
    })
}
connectMongoDb();
  
app.listen(8080, () => {
    console.log('listening on port 3000')
})