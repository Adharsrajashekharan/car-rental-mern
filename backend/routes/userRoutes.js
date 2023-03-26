const express = require("express");
const multer = require('multer');
const path = require('path');

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../client/src/assets'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});




const upload = multer({ storage });


const {
  
  getallusers,
  getallcars,
  RazorPay,
  RazorSucess,
  getAllOrders,
  payment,
  getAllBookings,
  authController,
  userProfile,
  getUserInfo,
  
  updateDocuments,
  findcarusa,
  findcaruk,
  findcarcanada,
} = require("../controllers/userCtrl");

const{
bookCar,
bookcaroffline,
cancelcarbooking,
uncancelcarbooking,
}=require('../controllers/bookingCtrl')

const {
  registerController,
  verifyOTPController,
  loginController,
  forgotPasswordController
}=require('../controllers/loginCtrl')






const authMiddleware = require("../middlewares/authMiddleware");
const userModel = require("../models/userModels");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

router.post('/forgot-password',forgotPasswordController)

router.get("/getallusers",authMiddleware,getallusers)

router.get("/getallcars",getallcars)

router.post("/getuserdata",authMiddleware,authController)

router.post("/bookcar",authMiddleware,bookCar)

router.post("/bookcaroffline",authMiddleware,bookcaroffline)


router.get("/orders",authMiddleware,getAllOrders) 



router.get("/getuserinfo",authMiddleware,getUserInfo) 




router.get("/getallbookings",authMiddleware,getAllBookings) 


router.post("/verify-otp",verifyOTPController)

// router.post("/payment", payment)

// router.post("/orders",RazorPay)

// router.post("/success",RazorSucess )

router.post("/cancelcarbooking",authMiddleware, cancelcarbooking)
router.post("/uncancelcarbooking",authMiddleware, uncancelcarbooking)

// router.get("/profile", userProfile)


// router.post('/update',updateDocuments)


router.get('/trivandrum',findcarusa)

router.get('/ernakulam',findcaruk)

router.get('/kozhikode',findcarcanada)























// Update user profile
router.post('/profile', async (req, res) => {
  try {
    console.log("first",req.body.Useru)
    const id=req.body.Useru
    console.log(id)
    const user = await userModel.findById(id)
    console.log("1234",user)
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.put('/profile', async (req, res) => {
  try {
    console.log("firstcall")
    console.log("secondcall",req.body.User._id)
    const userId=req.body.User._id
    const { name, email, bio,URLS } = req.body;
    console.log("pro",req.body)
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.URLS=URLS

    if (req.file) {
      user.avatar = `/uploads/${req.file.filename}`;
    }

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
