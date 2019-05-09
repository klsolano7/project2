// const Menu = require("./models/Menu");
const User = require("./models/user");
const Cart = require("./models/cart");
// const cart = require('Cart')
const nodemailer = require("nodemailer");





module.exports = function(app, passport) {
  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get("/cart", function(req, res, next) {
    if (!req.user) res.redirect("/login");
    // Menu.find().then(menu => {
    //   console.log(menu);
    //   res.render("cart.hbs", { menu: menu });
    // });
    // console.log("I am in my cart");
    // res.render("cart.hbs");
    console.log("the current user >>>>>>>>>>>> ", req.user);
    // console.log("current user on session <<<<<<<<<<<<<<<< ", req.session.currentUser);

    User.findById(req.user._id)
      .populate("myCart")
      .then(theUser => {
        theUser.totalPrice = calculateTotal(theUser.myCart)

        console.log("the user info for the cart >>>>>>>>> ", theUser);
        res.render("cart", { theUser: theUser, paymentProcessed: req.query.paymentProcessed });
      })
      .catch(err => {
        next(err);
      });
  });

  app.post("/deleteItem/:id", (req, res, next) => {
    if (!req.user) res.redirect("/login");
    // Cart.findByIdAndRemove(req.params.id)
    //req.user.myCart.pull(req.params.id);
    // var idx = req.user.myCar.findIndex(p => p.class=="two");
    // var removed = members.splice(idx,1);
    var idx = req.user.myCart.indexOf(req.params.id);
    console.log(idx, "in here");
    req.user.myCart.splice(idx, 1);
    req.user.save().then(removeItem => {
      console.log("item is removed---------", removeItem);
      res.redirect("/cart").catch(err => {
        console.log(err);
      });
    });
  });



  app.post("/pay", isLoggedIn, (req,res,next)=>{
    console.log("+++++++++++++++", req.body)
    transporter.sendMail({
        from: 'Solanos Cocina Peruana" <fakeironhackgmail.com>',
        to: req.body.email,
        subject: 'Your order is being processed!', 
        text: `Your estimated wait time for pick up is 20 minutes. Thank you for you patience! Your cc# is ${req.body.cardNumber}`,
        html: `<b>Your estimated wait time for pick up is 20 minutes. Thank you for you patience! Your cc# is ${req.body.cardNumber}</b>`
      })
      .then(info => { res.redirect(`/cart?paymentProcessed=true`) }) //res.render('message', {email, subject, message, info}))
      .catch(error => console.log(error));  
  })

};

// Delete Bill Route
//  app.get(‘/deleteBill/:id’, isLoggedIn, (req, res, next)=>{
//    Bills.findByIdAndRemove(req.params.id).then(data=>{
//      console.log(data)
//      res.redirect(‘/profile’)
//    }).catch(err => console.log(err) )

//  })


function calculateTotal(obj) {
    let total = 0;
   
   
    for (let i = 0; i < obj.length; i++) {
   
      total += obj[i].price
    }
    return total;
   
   }



   let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'fakeironhack@gmail.com',
      pass: 'fakeironhack123!' 
    }
  });



  function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
      return next()
    } else {
      res.redirect('/login')
    }

  }