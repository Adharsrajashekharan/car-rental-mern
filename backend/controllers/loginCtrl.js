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





const registerController = async (req, res) => {
    try {
      console.log("THIS is backend",req.body)
      const exisitingUser = await userModel.findOne({ email: req.body.email });
      if (exisitingUser) {
        return res
          .status(200)
          .send({ message: "User Already Exist", success: false });
      }

      const exisitingPhone = await userModel.findOne({ phoneNumber: req.body.phoneNumber });
        if(exisitingPhone){
         return res 
         .status(200)
        .send({ message: "PhoneNumber Already Exist", success: false });
        }
  
      // Generate OTP and send it to user's phone number
      const otp = Math.floor(1000 + Math.random() * 9000);
      await fast2sms.sendMessage({
        authorization:"LzDfy8EGHOTJwIxZB2WM9YbmFkcp0avodP3jg5CVitX4elqQh1zgl5y4rbwAYfDGJxcetus8T1aHWROS",
        message: `Your OTP is ${otp}. Please enter this to complete registration.`,
        numbers: [req.body.phoneNumber],
        // numbers: [9946633752],
      });
  
      const password = req.body.password;
      //stored in session
      req.session.otp=otp
      console.log("rrrrr",req.session.otp)
      req.session.email=req.body.email;
      const sessionId = req.sessionID;
      console.log(sessionId)
  
      sessionStore.get(sessionId, (error, session) => {
        if (error) {
          console.log('Error getting session:', error);
        } else if (!session) {
          console.log(`Session ${sessionId} not found`);
        } else {
          console.log(`Session ${sessionId} found:`, session);
        }
      });
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;
      const newUser = new userModel(req.body);
      await newUser.save();
      console.log(newUser.email);
      req.session.email=newUser.email
      console.log(req.session.email)
      res.status(201).send({ message: "Register Sucessfully", success: true ,sessionId});
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: `Register Controller ${error.message}`,
      });
    }
  };
  
  
  
  
  
  
  
  // const idString = 'RGkVcH-Tbvj0AKd9RKdVpP051Da-1uZU';
  // const objectId = new ObjectId(idString);
  
  
  const verifyOTPController = async (req, res) => {
    try {
      const { otp, sessionId } = req.body;
      let orginalotp = '';
       let email ='';
      const session = await new Promise((resolve, reject) => {
        req.sessionStore.get(sessionId, (err, session) => {
          if (err) {
            console.log(err);
            reject('Session not found');
          } else {
            resolve(session);
          }
        });
      });
  
      if (session) {
        orginalotp = session.otp;
        email=session.email
        console.log("this is", orginalotp);
      } else {
        console.log('Session not found');
      }
  
      // OTP verification code goes here...
  
      
    console.log("ogi",typeof(otp),"ooooootttpp", orginalotp ,typeof(orginalotp))
      if (otp === orginalotp.toString()) {
        console.log("email",req.session.email)
        console.log(req.session.id)
        const user = await userModel.findOne({email});
      if (!user) {
        return res.status(404).send({ success: false, message: 'User not found' });
      }
      user.isVerified = true;
        console.log(user.isVerified);
        console.log('44444444444', user);
      await user.save();
      res.status(200).send({ message: 'OTP verified successfully', success: true });
      }

      if (otp !== orginalotp.toString()) {
        return res.status(404).send({ success: false, message: 'Otp entered is invalid' });

      }

    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: `Verify OTP Controller ${error.message}` });
    }
  };
  
  
  
  // login callback
  const loginController = async (req, res) => {
    try {
      console.log(req.body)
      const allusers= await userModel.find({});
      const user = await userModel.findOne({ email: req.body.email });
      console.log(user)
      
  
    //  localStorage.setItem('user',JSON.stringify(user.data))
      if (!user ||user.access===false) {
        return res
          .status(200)
          .send({ message: "user not found", success: false });
      }
  
  
      // if(user.)
      //compares both
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(200)
          .send({ message: "Invlid EMail or Password", success: false });
      }
      const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {
        expiresIn: "1d",
  
      });
     
  
      res.status(200).send({ message: "Login Success", success: true, token ,user});
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
    }
  };
  //forgot password 
  
  const forgotPasswordController=async(req,res)=>{
  try {
  
    const {email,answer,newpassword}=req.body
    console.log("mmm",req.body)
    if(!email){
      return res.status(400).send({message:"email is required"})
    }
    if(!answer){
      return  res.status(400).send({message:"ans is required"})
    }
  
    if(!newpassword){
      return res.status(400).send({message:"new pass is required"})
    }
    const user =await userModel.findOne({email})
    console.log("222",user)
  
    if(!user){
      return res.status(404).json({
        success:false,
        message:"wrong email or password"
      })
     }
    const salt = await bcrypt.genSalt(10);
    const password = req.body.newpassword;
    const hashedPassword = await bcrypt.hash(password, salt);
    const id=user.id
  console.log("amal",user)
    if(answer==user.answer){
  
      await userModel.findByIdAndUpdate( id, { password:hashedPassword },
        function (err, docs) {
  if (err){
  console.log("hello",err)
  }
  else{
  console.log("Updated Usersz : ", docs);
  }
  });
  
    }
  
    else{
  
     
      console.log("enter correct answer....")
  
      return res.status(200).json({
        success:false,
        message:"Incorrect secret Answer"
      })
    }
  
  } catch (error) {
    console.log(error.message)
    res.status(400).send({
      success:false,  
      message:"something went wr",
      error
    })
  }
  }
  



  module.exports = { loginController, registerController,forgotPasswordController,
    verifyOTPController };
  
  