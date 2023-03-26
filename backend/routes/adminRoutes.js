const express = require("express");
const { addCar, block, editCar, deleteCar, unblock ,adminLogin,bookedcars, reservedCars} = require("../controllers/adminCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/login',adminLogin)
router.post("/add-car",authMiddleware, addCar);
router.post("/editcar",authMiddleware,editCar)

router.post("/block",block)
router.post('/unblock',unblock)
router.post("/deletecar",authMiddleware,deleteCar)
router.get('/bookedcars',authMiddleware,bookedcars)

router.get('/reservedcars',authMiddleware,reservedCars)



router.get("/adil",async(req,res)=>{
    console.log("hello");
res.send({message:"love u"})
})


module.exports = router ;
