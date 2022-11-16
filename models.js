const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prod = new Schema({
    Name: {type: String, default: null},
    Type: {type: String, default: null},
    Price: {type: Number, default: null},
    Quantity: {type: Number, required: true},

})

const product = mongoose.model('prod',prod)

module.exports = product