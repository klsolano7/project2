const mongoose = require('mongoose');
const Menu = require('./app/models/Menu');

mongoose.connect('mongodb+srv://klsolano7:TheBatman123@cluster0-miuh7.mongodb.net/test?retryWrites=true');

const menuItems = [
  {
    name: "Ceviche",
    description: "Marinated fish in fresh Chulucanas’ lime juice, mixed with Arequipan onions, cilantro and a touch of your favorite",
    price: 13
  },

  {
    name: "Aji De Gallina",
    description: "Delicious pieces of shredded chicken breast covered in Peruvian yellow pepper cream, milk, pecans, Piso bread and topped with parmesan cheese. Color, texture and flavor in full harmony",
    price: 12
  },

  {
    name: "Lomo Saltado",
    description: "Soft pieces of steak, bright tomatoes, Peruvian yellow peppers and Arequipan onions sautéed in a fiery wok. Served with crunchy French fries and delicious white rice",
    price: 18
  },
  {
    name: "Jalea",
    description: "Soft pieces of steak, bright tomatoes, Peruvian yellow peppers and Arequipan onions sautéed in a fiery wok. Served with crunchy French fries and delicious white rice",
    price: 20
  },
  {
    name: "Arroz Con Pollo",
    description: "A Peruvian icon –rice with chicken fragrant with touches of fresh cilantro and Peruvian pepper, served with salsa criolla. Made to be desired by everyone",
    price: 12
  },
  {
    name: "Tacu Lomo",
    description: "Exquisite puree made out of canary beans, rice, pork and Peruvian peppers. Served with soft pieces of steak sautéed  with Arequipan onions, cilantro, tomatoes and Peruvian yellow pepper, covered in our oriental sauce",
    price: 19
  },
  {
    name: "Arroz Con Mariscos",
    description: "Selected grains dancing in a hot pan along with fresh fruits of the sea and a secret sauce with its peppery aroma",
    price: 19
  },
  {
    name: "Arroz Chaufa Con Mariscos",
    description: "Peruvian cantonese style rice and seafood cooked in a wok and sautéed with a brown reduction of soy, sesame oil and oyster sauce",
    price: 19
  },
  {
    name: "Anticuchos de corazon",
    description: "Pieces of veil heart madly in love, laying in a secret mild spicy Panca marinated mix from our wise chef, skewed in wild sugar cane and brought to a smoking fire",
    price: 14
  },
  {
    name: "Papas a la Huancaína",
    description: "A feast for the senses! Potatoes covered with Andean cream –milk, cheese, Peruvian yellow pepper and the secrets of Huancayo",
    price: 9
  }
]

Menu.create(menuItems, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${menuItems.length} list`)
  mongoose.connection.close();
});