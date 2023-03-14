const express = require("express");
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
  cancelcarbooking
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

router.get("/getallusers",getallusers)



router.get("/getallcars",getallcars)


router.post("/getuserdata",authMiddleware,authController)

router.post("/bookcar",bookCar)

router.post("/bookcaroffline",bookcaroffline)


router.get("/orders",authMiddleware,getAllOrders) 

router.get("/getallbookings",getAllBookings) 


router.post("/verify-otp",verifyOTPController)

router.post("/payment", payment)

// router.post("/orders",RazorPay)

// router.post("/success",RazorSucess )

router.post("/cancelcarbooking", cancelcarbooking)


module.exports = router;
