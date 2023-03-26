const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  //The use of mongoose.Schema.Types.ObjectId in a Mongoose schema is primarily used to create relationships between documents in MongoDB. In a NoSQL database like MongoDB, data is often denormalized, meaning that related data is often stored in separate collections (i.e., tables in SQL databases) rather than a single table.
  car: { type: mongoose.Schema.Types.ObjectId,ref:'cars'},
  user: { type: mongoose.Schema.Types.ObjectId,ref:'users'},
  bookedTimeSlots :{
    from:{type:String},
    to:{type:String}
  },
  totalHours:{type:Number},
  totalAmount:{type:Number},
  transactionId:{type:String},
  driverRequired:{type:Boolean},
  pickupAddress:{type:String},
  place:{type:String},

  cancelled: { type: Boolean,
    default: false 
},

},
{timestamps:true}
);
const bookingModel =mongoose.model('bookings',bookingSchema)
module.exports =bookingModel
