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






const bookcaroffline=async(req,res)=>{
    try {
      const newbooking= new Booking(req.body)
  await newbooking.save()
  const car =await Car.findOne({_id:req.body.car})
  console.log("duuuuuuuu",car)
  car.bookedTimeSlots.push(req.body.bookedTimeSlots)
  await car.save()
  res.send("your booking is successfull")
  }
  catch (error) {
    console.log(error)
    res.status(400).send({message:"wrong"})
  
    }
  }


  const bookCar= async(req,res)=>{
    // req.body.transactionId ="1234"
    const {token}=req.body
    console.log("00000",token)
    console.log("11111",req.body)
  
    try {
  const customer =await stripe.customers.create({
    email:token.email,
    source:token.id
  })
  const payment =await stripe.paymentIntents.create({
    amount:req.body.totalAmount*100,
    currency:'usd',
    customer:customer.id,
    receipt_email:token.email
  },{
    idempotencyKey:uuidv4(),
  }
  )
  if(payment){
    req.body.transactionId=payment.id
    const newbooking= new Booking(req.body)
    await newbooking.save()
    const car =await Car.findOne({_id:req.body.car})
    console.log("duuuuuuuu",car)
    
    car.bookedTimeSlots.push(req.body.bookedTimeSlots)
    await car.save()
    res.send("your booking is successfull")
  }
  else{
    res.status(400).send({message:"wrong"})
  }
    } catch (error) {
      console.log(error)
      res.status(400).send({message:"wrong"})
    }
  }

  const cancelcarbooking=async(req,res)=>{
    console.log("depu",req.body)
    
    const bookingId = req.body.reqObj;

    // const update = Booking.updateMany({}, { $set: { "cancelled": false /* and other fields */ } });
    const update = await Booking.findByIdAndUpdate({_id:req.body.reqObj}, { $set: { cancelled: true } });
    // const deletecar =await Car.findByIdAndUpdate({_id:req.body.carid},{ $set: { deleted: true } })

    // const bookingId = req.body.bookingId;

    console.log("nn",update)


console.log(bookingId)
  }




  const uncancelcarbooking=async(req,res)=>{

    console.log("depu",req.body)
    
    const bookingId = req.body.reqObj;

    // const update = Booking.updateMany({}, { $set: { "cancelled": false /* and other fields */ } });
    const update = await Booking.findByIdAndUpdate({_id:req.body.reqObj}, { $set: { cancelled: false } });
    // const deletecar =await Car.findByIdAndUpdate({_id:req.body.carid},{ $set: { deleted: true } })

    // const bookingId = req.body.bookingId;

    console.log("nn",update)

console.log(bookingId)
  }


  module.exports = { 
   bookCar,bookcaroffline,cancelcarbooking,uncancelcarbooking };
  
  