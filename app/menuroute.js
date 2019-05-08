// const Cart = require("./models/cart");
const Menu = require("./models/Menu");
const User = require("./models/user");

// const cart = [];

module.exports = function(app, passport) {
  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get("/menu", function(req, res) {
    console.log("I am getting menu");
    Menu.find()
      .then(menuItems => {
        console.log("this is the user info --------- ", req.user)
        res.render("menu.hbs", { menuItems });
      })
      .catch(err => {
        next(err);
      });
  });

  // app.post("/menu/:id", (req, res, next) => {
  //   console.log("running add to menu route <<<<<<<<< ");
  //   Menu.findById(req.params.id).then(data => {
  //     Cart.create({
  //       name: data.name,
  //       price: data.price,
  //       userId: req.cookies.currentUser
  //     }).then(() => {
  //       res.redirect("./");
  //     });
  //   });
  // });
  



  // app.get("/cart/:crazyIdNumbner", (req,res,next) =>{
  //   console.log('in here!!!!!', req.params, req.query)
  //   Menu.findById(req.params.crazyIdNumbner)
  //   // console.log("--------", req.params.id)
  //   .then(theItems =>{
  //     console.log(theItems, 34563563456354)
  //     res.render('cart', {theItems: theItems})
  //   }).catch(err=>console.log(err))
  // })

  app.post("/cart/:id", isLoggedIn, (req,res,next) =>{
    console.log('in here!!!!!', req.params, req.query, req.user, req.body)

    if(!req.user) res.redirect('/login')

    User.findById(req.user._id)
    .then(theUser => {
      theUser.myCart.push(req.params.id)
      theUser.save()
      .then(theUpdatedUser => {
        console.log("info after adding to cart ***************** ", theUpdatedUser)
        // res.render('cart', {theUser: theUpdatedUser})
        res.redirect('back')
      })
      .catch(err => {
        next(err);
      })
    })
    .catch(err => {
      next(err);
    })







    // Menu.findById(req.params.crazyIdNumber)
    // // console.log("--------", req.params.id)
    // .then(theItems =>{
    //   console.log(theItems, 34563563456354, req.user )
    //   User.findOne({_id:req.user._id}, function(err, IgotTheUser) {
    //     console.log('IgotTheUser', IgotTheUser, 'err', err)
    //     //In here I can do whatever I want with the user.  
    //     IgotTheUser.myCart.push(theItems)
    //     IgotTheUser.save(function(err, other){
    //       console.log('err',err,'other',other)
    //       res.redirect('back')
    //     })
    
    //   })
    // })
    // .catch(err=>console.log(err))


// User.findOne({username: oldUsername}, function (err, user) {
//     user.username = newUser.username;
//     user.password = newUser.password;
//     user.rights = newUser.rights;

//     user.save(function (err) {
//         if(err) {
//             console.error('ERROR!');
//         }
//     });
// });
    // Menu.findById(req.params.crazyIdNumbner)
    // // console.log("--------", req.params.id)
    // .then(theItems =>{
    //   console.log(theItems, 34563563456354)
    //   res.redirect('cart', {theItems: theItems})
    // }).catch(err=>console.log(err))
  })


// if logged in authenticated
  function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
      return next()
    } else {
      res.redirect('/login')
    }

  }










};
