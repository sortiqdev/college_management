const mongoose = require ("mongoose");
import { motion } from "framer-motion";

const OrganizationSchema =  new mongoose.Schema(
    {
        //  Organization Info
        orgname:{
           type:String,
           required:true,
           trim:true,
        },
        orgcode:{
            type:String,
            required:true,
            unique:true,
            uppercase:true,
        },
        orgemail:{
            type:String,
            required:true,
            lowercase:true,
        },
        orgphone:{
            type:String,
        },
         country: String,
         state: String,
         city: String,

      // Admin Info
    adminname: {
      type: String,
      required: true,
    },
    adminemail: {
      type: String,
      required: true,
      lowercase: true,
    },
    adminpassword: {
      type: String,
      required: true,
    },

    // Plan Info
    plan: {
      type: String,
      default: "basic",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Organization", OrganizationSchema);
      
