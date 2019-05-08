
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MenuSchema = new Schema({
  name:       String,
  description: String, 
  price: Number
})

const Menu = mongoose.model('Menu', MenuSchema)

module.exports = Menu;
