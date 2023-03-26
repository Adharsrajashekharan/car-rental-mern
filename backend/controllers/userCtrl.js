const express=require('express')
const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {username}=require('../models/userModels');
const carmodel = require("../models/carModels");
const { restart } = require("nodemon");
const fast2sms=require('fast-two-sms')

const fs = require('fs');
const Razorpay = require("razorpay");
const  Booking = require("../models/bookingModels");
const Car =require("../models/carModels");
const {} = require("colors");
// const stripe =require('stripe')('sk_test_51MgPNUSGJWduBmwsIEtRsvDlhdzrn4QsCkDNNVxtjz2PIml545V5ZnfDHITtZC1tPMl7S0o73tGNq3S5ysbNmRNG00JE20Fofi')
const { v4: uuidv4 } = require('uuid');
const stripe = require("stripe")("sk_test_51MecxESI2ynGCKECnrnTsDQ4vLCqj0iRGNdPGaiEpLGmrIvQu3auw2zCaILdtFPAV4W3kMy8N1jGXOxTa0sRZAov00pp9x8Yrn")
const session = require('express-session');
const MemoryStore = session.MemoryStore;
const sessionStore = new MemoryStore();
const { url } = require("../utils/cloudinary");
const cloudinary =require('../utils/cloudinary')
const multer = require('multer'); 
const { ObjectId } = require('mongodb');
const bookingModel = require("../models/bookingModels");
const { log } = require('console');
// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});



const upload = multer({ storage });



// const sendOtp = async (phone) => {
//   try {
//     const response = await fast2sms.sendMessage({
//       authorization: process.env.FAST_2_SMS_API_KEY,
//       message: "Your OTP is {#AA#}",
//       numbers: [phone],
//       options: { TTL: 5 },
//     });
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const verifyOtp = async (req, res) => {
//   try {
//     const { phone, otp } = req.body;

//     // Check if user with phone number exists
//     const user = await userModel.findOne({ phone });
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     // Verify OTP
//     const response = await fast2sms.verifyOTP({
//       authorization: process.env.FAST_2_SMS_API_KEY,
//       otp,
//       retryVoice: true,
//     });
//     if (response.status === "success") {
//       // Mark user as verified
//       user.isVerified = true;
//       await user.save();

//       res.status(200).json({ success: true, message: "OTP verified" });
//     } else {
//       res.status(401).json({ success: false, message: "Invalid OTP" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: `Verify OTP Controller ${error.message}`,

//     });
//   }
// };


// const registerController = async (req, res) => {
//   try {
//     console.log(req.body)
//     const exisitingUser = await userModel.findOne({ email: req.body.email });
//     if (exisitingUser) {
//       return res
//         .status(200)
//         .send({ message: "User Already Exist", success: false });
//     }

//     // Generate OTP and send it to user's phone number
//     const otp = Math.floor(1000 + Math.random() * 9000);
//     await fast2sms.sendMessage({
//       authorization:"LzDfy8EGHOTJwIxZB2WM9YbmFkcp0avodP3jg5CVitX4elqQh1zgl5y4rbwAYfDGJxcetus8T1aHWROS",
//       message: `Your OTP is ${otp}. Please enter this to complete registration.`,
//       numbers: [req.body.phoneNumber],
//       // numbers: [9946633752],
//     });

//     const password = req.body.password;
//     //stored in session
//     req.session.otp=otp
//     console.log("rrrrr",req.session.otp)
//     req.session.email=req.body.email;
//     const sessionId = req.sessionID;
//     console.log(sessionId)

//     sessionStore.get(sessionId, (error, session) => {
//       if (error) {
//         console.log('Error getting session:', error);
//       } else if (!session) {
//         console.log(`Session ${sessionId} not found`);
//       } else {
//         console.log(`Session ${sessionId} found:`, session);
//       }
//     });
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     req.body.password = hashedPassword;
//     const newUser = new userModel(req.body);
//     await newUser.save();
//     console.log(newUser.email);
//     req.session.email=newUser.email
//     console.log(req.session.email)
//     res.status(201).send({ message: "Register Sucessfully", success: true ,sessionId});
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: `Register Controller ${error.message}`,
//     });
//   }
// };







// const idString = 'RGkVcH-Tbvj0AKd9RKdVpP051Da-1uZU';
// const objectId = new ObjectId(idString);


// const verifyOTPController = async (req, res) => {
//   try {
//     const { otp, sessionId } = req.body;
//     let orginalotp = '';
//      let email ='';
//     const session = await new Promise((resolve, reject) => {
//       req.sessionStore.get(sessionId, (err, session) => {
//         if (err) {
//           console.log(err);
//           reject('Session not found');
//         } else {
//           resolve(session);
//         }
//       });
//     });

//     if (session) {
//       orginalotp = session.otp;
//       email=session.email
//       console.log("this is", orginalotp);
//     } else {
//       console.log('Session not found');
//     }

//     // OTP verification code goes here...

    
//   console.log("ogi",typeof(otp),"ooooootttpp", orginalotp ,typeof(orginalotp))
//     if (otp === orginalotp.toString()) {
//       console.log("email",req.session.email)
//       console.log(req.session.id)
//       const user = await userModel.findOne({email});
//     if (!user) {
//       return res.status(404).send({ success: false, message: 'User not found' });
//     }
//     user.isVerified = true;
//       console.log(user.isVerified);
//       console.log('44444444444', user);
//     await user.save();
//     res.status(200).send({ message: 'OTP verified successfully', success: true });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ success: false, message: `Verify OTP Controller ${error.message}` });
//   }
// };



// login callback
// const loginController = async (req, res) => {
//   try {
//     console.log(req.body)
//     const allusers= await userModel.find({});
//     const user = await userModel.findOne({ email: req.body.email });
//     console.log(user)
    

//   //  localStorage.setItem('user',JSON.stringify(user.data))
//     if (!user ||user.access===false) {
//       return res
//         .status(200)
//         .send({ message: "user not found", success: false });
//     }


//     // if(user.)
//     //compares both
//     const isMatch = await bcrypt.compare(req.body.password, user.password);
//     if (!isMatch) {
//       return res
//         .status(200)
//         .send({ message: "Invlid EMail or Password", success: false });
//     }
//     const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {
//       expiresIn: "1d",

//     });
   

//     res.status(200).send({ message: "Login Success", success: true, token ,user});
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
//   }
// };
//forgot password 

// const forgotPasswordController=async(req,res)=>{
// try {

//   const {email,answer,newpassword}=req.body
//   console.log("mmm",req.body)
//   if(!email){
//     return res.status(400).send({message:"email is required"})
//   }
//   if(!answer){
//     return  res.status(400).send({message:"ans is required"})
//   }

//   if(!newpassword){
//     return res.status(400).send({message:"new pass is required"})
//   }
//   const user =await userModel.findOne({email})
//   console.log("222",user)

//   if(!user){
//     return res.status(404).json({
//       success:false,
//       message:"wrong email or password"
//     })
//    }
//   const salt = await bcrypt.genSalt(10);
//   const password = req.body.newpassword;
//   const hashedPassword = await bcrypt.hash(password, salt);
//   const id=user.id
// console.log("amal",user)
//   if(answer==user.answer){

//     await userModel.findByIdAndUpdate( id, { password:hashedPassword },
//       function (err, docs) {
// if (err){
// console.log("hello",err)
// }
// else{
// console.log("Updated Usersz : ", docs);
// }
// });

//   }

//   else{

   
//     console.log("enter correct answer....")

//     return res.status(200).json({
//       success:false,
//       message:"Incorrect secret Answer"
//     })
//   }

// } catch (error) {
//   console.log(error.message)
//   res.status(400).send({
//     success:false,  
//     message:"something went wr",
//     error
//   })
// }
// }

const getallusers=async(req,res)=>{
  try {
    const alluser= await userModel.find({ })
    res.send({status:"ok",data:alluser})
    console.log("adarsh",alluser)

  } catch (error) {
    console.log(error)
    
  }
}


const updateDocuments = async (req, res) => {
  try {
    const result = await userModel.updateMany(
      {}, // empty filter object to match all documents
      { $set: { isAdmin: false } } // newfield will be set to "newvalue" for all matched documents
    );
    res.send({ status: "ok", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server error" });
  }
};

const getallcars=async(req,res)=>{
  try {
    const allcars=await carmodel.find({deleted:false})
    // const allcars= await carmodel.updateMany({ $set: { deleted: false } });

    res.send(allcars)
    console.log(allcars)
  } catch (error) {
    return res.status(400).json(error)
  }
}

// const blockUser=async(req,res)=>{
//   const user =await userModel.findOne({email})
//   const id=user.id
//   try {
//     await userModel.findByIdAndUpdate(id,{Access:false})
//   } catch (error) {
//     console.log(error)
//   }
// }

// blockUser:(userId)=>{
//   return new Promise((resolve,reject)=>{
//       db.get().collection(collection.USER_COLLECTION)
//       .updateOne({_id:objectId(userId)},{
//           $set:{
//              Access:false 
//           }
//       }).then((response)=>{
//           resolve()
//       })
//   })
// }


// const bookCar= async(req,res)=>{
//   // req.body.transactionId ="1234"
//   const {token}=req.body
//   try {
// const customer =await stripe.customers.create({
//   email:token.email,
//   source:token.id
// })
// const payment =await stripe.charges.create({
//   amount:req.body.totalAmount*100,
//   currency:'usd',
//   customer:customer.id,
//   receipt_email:token.email

// },{
//   idempotencyKey:uuidv4(),
// }
// )
// if(payment){
//   req.body.transactionId=payment.source.id
//   const newbooking= new Booking(req.body)
//   await newbooking.save()
//   const car =await Car.findOne({_id:req.body.car})
//   console.log("duuuuuuuu",car)
  
//   car.bookedTimeSlots.push(req.body.bookedTimeSlots)
//   await car.save()
//   res.send("your booking is successfull")
// }
// else{
//   res.status(400).send({message:"wrong"})

// }


//   } catch (error) {
//     console.log(error)
//     res.status(400).send({message:"wrong"})
//   }
// }
const RazorPay=async(req,res)=>{
  try {
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
        amount: 50000, // amount in smallest currency unit
        currency: "INR",
        receipt: "receipt_order_74394",
        // amount:req.body.totalAmount*100,
        // currency:'INR',
        // customer:customer.id,
        // receipt_email:token.email
      
    };
 

    const order = await instance.orders.create(options);



    if (!order) return res.status(500).send("Some error occured");

    res.json(order);
} catch (error) {
    res.status(500).send(error);
}
}


const RazorSucess=async(req,res)=>{
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const crypto = require("crypto");
        const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature
        // if (digest !== razorpaySignature)
        //     return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT
        // req.body.transactionId=payment.source.id
        const newbooking= new Booking(req.body)
        await newbooking.save()
        const car =await Car.findOne({_id:req.body.car})
        console.log("duuuuuuuu",car)
        
        // car.bookedTimeSlots.push(req.body.bookedTimeSlots)
        await car.save()
        res.send("your booking is successfull")
        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
      console.log("cxcxc",error)
        res.status(500).send(error);
    }
};

// const bookcaroffline=async(req,res)=>{
//   try {
//     const newbooking= new Booking(req.body)
// await newbooking.save()
// const car =await Car.findOne({_id:req.body.car})
// console.log("duuuuuuuu",car)
// car.bookedTimeSlots.push(req.body.bookedTimeSlots)
// await car.save()
// res.send("your booking is successfull")
// }
// catch (error) {
//   console.log(error)
//   res.status(400).send({message:"wrong"})

//   }
// }



// const bookCar= async(req,res)=>{
//   // req.body.transactionId ="1234"
//   const {token}=req.body
//   console.log("00000",token)
//   console.log("11111",req.body)

//   try {
// const customer =await stripe.customers.create({
//   email:token.email,
//   source:token.id
// })
// const payment =await stripe.paymentIntents.create({
//   amount:req.body.totalAmount*100,
//   currency:'usd',
//   customer:customer.id,
//   receipt_email:token.email
// },{
//   idempotencyKey:uuidv4(),
// }
// )
// if(payment){
//   req.body.transactionId=payment.id
//   const newbooking= new Booking(req.body)
//   await newbooking.save()
//   const car =await Car.findOne({_id:req.body.car})
//   console.log("duuuuuuuu",car)
  
//   car.bookedTimeSlots.push(req.body.bookedTimeSlots)
//   await car.save()
//   res.send("your booking is successfull")
// }
// else{
//   res.status(400).send({message:"wrong"})
// }
//   } catch (error) {
//     console.log(error)
//     res.status(400).send({message:"wrong"})
//   }
// }

const getAllOrders=async(req,res)=>{


  try {
    const orders= await bookingModel.find({})
    console.log(orders)
  res.send(orders)
  } catch (error) {
    console.log(error)
  }
}


const payment =async(req,res)=>{
    let { amount, id } = req.body
    try {
      const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Spatula company",
        payment_method: id,
        confirm: true
      })
      console.log("Payment", payment)
      res.json({
        message: "Payment successful",
        success: true
      })
    } catch (error) {
      console.log("Error", error)
      res.json({
        message: "Payment failed",
        success: false
      })
    }
  }
  
  const getAllBookings=async(req,res)=>{
    try {
      //you need to have a reference to cars in schema to use populate
      const bookings =await Booking.find({cancelled:false}).populate('car')
      console.log("fsfsfsfsf")
      res.send(bookings)
    } catch (error) {
      console.log(error)
    }
  }


  const authController=async(req,res)=>{
     try {
      const user =await userModel.findOne({_id:req.body.userId})
      if(!user){
        return res.status(200).send({message:"user not found",success:false})
       
      }else{
        res.status(200).send({success:true,
          data:{
            name:user.name,
            email:user.email
          }
          })
      }
     } catch (error) {
      console.log(error)
      res.status(500).send({message:"Auth error",success:false,error})
     }
  }

//   const cancelcarbooking=async(req,res)=>{
//     console.log("depu",req.body)
    
//     const bookingId = req.body.reqObj;

//     // const update = Booking.updateMany({}, { $set: { "cancelled": false /* and other fields */ } });
//     const update = await Booking.findByIdAndUpdate({_id:req.body.reqObj}, { $set: { cancelled: true } });
//     // const deletecar =await Car.findByIdAndUpdate({_id:req.body.carid},{ $set: { deleted: true } })

//     // const bookingId = req.body.bookingId;

//     console.log("nn",update)


// console.log(bookingId)
//   }




//   const uncancelcarbooking=async(req,res)=>{

//     console.log("depu",req.body)
    
//     const bookingId = req.body.reqObj;

//     // const update = Booking.updateMany({}, { $set: { "cancelled": false /* and other fields */ } });
//     const update = await Booking.findByIdAndUpdate({_id:req.body.reqObj}, { $set: { cancelled: false } });
//     // const deletecar =await Car.findByIdAndUpdate({_id:req.body.carid},{ $set: { deleted: true } })

//     // const bookingId = req.body.bookingId;

//     console.log("nn",update)

// console.log(bookingId)
//   }


  // const userProfile = async(req,res)=>{

  //   console.log("bobby",req.body)
  //   const {name,description,image,rentPerHour,capacity,fuelType}=req.body
  //       try {
  //            const result =await cloudinary.uploader.upload(image,{
  //               folder:"products",
  //               width: 500,
  //               height: 300,
  //               crop: "scale"
  //           })
  //           const newCar =await Car.create({
  //               name,
  //               description,
  //               image:{
  //                   public_id:result.public_id,
  //                   url:result.secure_url
  //               },
  //               rentPerHour,
  //               capacity,
  //               fuelType
  //           })
  //           // const newCar =new Car(req.body)
  //           await newCar.save()
  //           res.send('car added Successfully')
  //       } catch (error) {
  //           console.log(error)
  //       }
  //   }

  const userProfile= async (req, res) => {
    console.log("userProfile",req.body)
    try {
      const user = await userModel.find(req.body._id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };


// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await userModel.findOne(req.body._id);
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
};




const getUserInfo = async (req, res) => {
  try {
    const users = await userModel.findById(req.body.userId); // find all users with the specified id
    console.log("users:", users);

    res.status(200).send(users); // send the list of users as the response
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving users" });
  }
};

const findcarusa=async(req,res)=>{
  try {
    const usa=await carmodel.find({place:"usa"})
    res.send(usa)
  } catch (error) {
    console.log(error)
  }
}

const findcaruk=async(req,res)=>{
  try {
    const usa=await carmodel.find({place:"uk"})
    res.send(usa)
  } catch (error) {
    console.log(error)
  }
}

const findcarcanada=async(req,res)=>{
  try {
    const usa=await carmodel.find({place:"canada"})
    res.send(usa)
  } catch (error) {
    console.log(error)
  }
}






module.exports = { getUserInfo,userProfile,
  getallusers,getallcars,RazorPay,RazorSucess,getAllOrders,payment,getAllBookings,authController,updateDocuments,findcarusa,findcarcanada,findcaruk };


