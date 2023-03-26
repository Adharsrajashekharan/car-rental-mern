const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    rating: {
      type: String,
    },
    description: {
      type: String,
    },
    // rentPerHour
    rentPerHour: {
      type: Number,
      required: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    capacity: {
      type: Number,
      required: true,
    },
    place: String,
    
    pickType: String,


    fuelType: {
      type: String,
      required: true,
    },
    deleted: { type: Boolean, default: false },

    bookedTimeSlots: [
      {
        from: {
          type: String,
          required: true,
        },

        to: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
const carmodel = mongoose.model("cars", carSchema);

module.exports = carmodel;

//  {
//     id: 1,
//     brand: "Tesla",
//     rating: 112,
//     carName: "Tesla Malibu",
//     imgUrl: img01,
//     model: "Model 3",
//     price: 50,
//     time: "8am -7pm",
//     speed: "20kmpl",
//     gps: "GPS Navigation",
//     seatType: "Heated seats",
//     automatic: "Automatic",
//     description:
//       " Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua, amet duo et gubergren vero gubergren dolor. At diam. Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua, amet duo et gubergren vero gubergren dolor. At diam.",
//   },
