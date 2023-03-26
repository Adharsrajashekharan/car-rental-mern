const Car = require("../models/carModels")
const userModel = require("../models/userModels");
const { url } = require("../utils/cloudinary");
const cloudinary =require('../utils/cloudinary')
const bookingModels=require('../models/bookingModels')







const adminLogin=async(req,res)=>{
    // console.log("meemm",req.body)
    const email='adarshrajashekhar@gmail.com'
    const password='q'
    try {
        if(req.body.password==password && req.body.email==email){
        res.status(201).send({ message: "login success", success: true });
        }
        else{
            res.status(500).send({
                message: "login failed",
                success: false,
                });
        }
    } catch (error) {
        console.log(error);
    res.status(500).send({
    message: "login failed",
    success: false,
    });
    }
}



const addCar =async(req,res)=>{
console.log("bobby",req.body)
const {name,description,image,rentPerHour,capacity,fuelType,place,pickType}=req.body
    try {
         const result =await cloudinary.uploader.upload(image,{
            folder:"products",
            width: 500,
            height: 300,
            crop: "scale"
        })
        const newCar =await Car.create({
            name,
            description,
            image:{
                public_id:result.public_id,
                url:result.secure_url
            },
            rentPerHour,
            capacity,
            place,
            fuelType,
            pickType
                })
        // const newCar =new Car(req.body)
        await newCar.save()
        res.send('car added Successfully')
    } catch (error) {
        console.log(error)
    }
}

const editCar =async(req,res)=>{


    try {
        const editcar =await Car.findOne({_id:req.body._id})
        editcar.name=req.body.name
        editcar.image=req.body.image
        editcar.fuelType=req.body.fuelType
        editcar.rentPerHour=req.body.rentPerHour
        editcar.capacity=req.body.capacity

        await editcar.save()
        res.send('car edited Successfully')
    } catch (error) {
        console.log(error)
    }
}

const deleteCar =async(req,res)=>{


    try {
        console.log("bombay",req.body)
        // const deletecar =await Car.findOneAndDelete({_id:req.body.carid})
        const deletecar =await Car.findByIdAndUpdate({_id:req.body.carid},{ $set: { deleted: true } })


        await deletecar.save()
        res.send('car deleted Successfully')
    } catch (error) {
        console.log(error)
    }
}

const block= async(req,res)=>{
    const { userId } = req.body;
    userModel.findByIdAndUpdate(userId, { access: false }, (err, user) => {
      if (err) return res.status(500).send(err);
      res.send(user);
})};
const unblock= async(req,res)=>{
    const { userId } = req.body;
    userModel.findByIdAndUpdate(userId, { access: true }, (err, user) => {
      if (err) return res.status(500).send(err);
      res.send(user);
})};


// const bookedcars = async (req, res) => {
//     try {
//       const cars = await bookingModels.find({});
//       const requiredcars = cars.map((car) => car.car);
//       console.log("All Bookings: ", cars);
//       console.log("Required Cars: ", requiredcars);
//       res.send(requiredcars);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Internal Server Error");
//     }
//   };

// const bookedcars = async (req, res) => {
//     try {
//       const bookingCarIds = await bookingModels.distinct("car");
//       const requiredCars = await Car.find({ _id: { $in: bookingCarIds } });
//       console.log("All Bookings: ", bookingCarIds);
//       console.log("Required Cars: ", requiredCars);
//       res.send(requiredCars);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Internal Server Error");
//     }
//   };

const bookedcars = async (req, res) => {
    try {
      const bookingCars = await bookingModels
        .find({})
        .populate("car", "name model year"); // join the cars collection and select only the name, model, and year fields
      console.log("All Bookings: ", bookingCars);
      res.send(bookingCars);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };

  

  const reservedCars = async (req, res) => {
    try {
      const bookingCars = await bookingModels
        .find()
        .populate("car");
  
      const totalHoursList = bookingCars.map(booking => booking.totalHours);
      console.log("List of Total Hours: ", totalHoursList);
  
      res.send(bookingCars);
    } catch (error) {
      console.log(error);
    }
  }


  




module.exports={adminLogin,addCar,block,unblock,editCar,deleteCar,bookedcars,reservedCars}