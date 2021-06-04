const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },
      
    order:[
      {
      payment:{
        type:Object,

      },
      header:{
        type:Object
      },
      cart:{
        type:Array,
        default:[]
      }
    }
    ]
  },
   /* address: {
      type: String,

      default: "",
      trim: true,
    },

    mobileNumber: {
      type: Number,

      default: "",
    },
    city: {
      type: String,

      default: "",
    },
    state: {
      type: String,

      default: "",
    },
    pincode: {
      type: Number,

      default: 0,
    },
  },*/

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
