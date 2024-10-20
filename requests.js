const mongoose= require('mongoose');
const requestSchema=new mongoose.Schema({
    userId: { type: ObjectId, ref: "User", required: true },
    request: [
      {
        producerId: { type: ObjectId, ref: "Producer", required: true },
        deadline: { type: Date, required: true },
        adrs: { type: String, required: true },
        service: { type: String, required: true },
        _id: false,
      },
    ],
    
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "completed", "cancled"],
    },
   requestedOn: { type: Date },
  },
  { timestamps: true }
);



const Request=mongoose.model('Request',requestSchema);
module.exports=Request;