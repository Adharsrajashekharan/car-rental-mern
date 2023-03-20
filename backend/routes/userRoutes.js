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
  loginController,
  registerController,
  forgotPasswordController,
  getallusers,
  getallcars,
  bookCar,
  verifyOTPController,
  RazorPay,
  RazorSucess,
  bookcaroffline,
  getAllOrders,
  payment,
  getAllBookings,
  authController,
  cancelcarbooking,
  userProfile,
  getUserInfo,
  
  updateDocuments,
  findcarusa,
  findcaruk,
  findcarcanada
} = require("../controllers/userCtrl");
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

router.post("/bookcar",bookCar)

router.post("/bookcaroffline",bookcaroffline)


router.get("/orders",authMiddleware,getAllOrders) 



router.get("/getuserinfo",authMiddleware,getUserInfo) 




router.get("/getallbookings",authMiddleware,getAllBookings) 


router.post("/verify-otp",verifyOTPController)

router.post("/payment", payment)

// router.post("/orders",RazorPay)

// router.post("/success",RazorSucess )

router.post("/cancelcarbooking", cancelcarbooking)

router.get("/profile", userProfile)


router.post('/update',updateDocuments)


router.get('/usa',authMiddleware,findcarusa)

router.get('/uk',authMiddleware,findcaruk)

router.get('/canada',authMiddleware,findcarcanada)























// Update user profile
router.put('/me',  upload.single('avatar'), async (req, res) => {
  try {
  
    const user = await userModel.findById(req.body._id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const { name, email, bio } = req.body;

    user.name = name || user.name;
    user.email = email || user.email;
    user.bio = bio || user.bio;
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
