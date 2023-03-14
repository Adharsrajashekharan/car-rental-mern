const express = require("express");
const { addCar, block, editCar, deleteCar, unblock ,adminLogin} = require("../controllers/adminCtrl");
const router = express.Router();

router.post('/login',adminLogin)
router.post("/add-car", addCar);
router.post("/editcar",editCar)

router.post("/block",block)
router.post('/unblock',unblock)
router.post("/deletecar",deleteCar)

router.get("/adil",async(req,res)=>{
    console.log("hello");
res.send({message:"love u"})
})


module.exports = router ;
