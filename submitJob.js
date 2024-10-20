const mongoose= require('mongoose');
const jobSchema=new mongoose.Schema({
    ownername:{
        type:String,
        required:true,
        unique:true
    },
    jobOrbusiness:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    jobDescription:{
        type:String,
        required:true
    },
    images:{
        type:String,
       // data:Buffer,
        //required:true
    },
    BNumber:{
        type:String,
        required:true,
        unique:true
    },
    location:{
        type:String,
        required:true,
        unique:true
    },
},
{ timestamps:true})
const Job=mongoose.model('Job',jobSchema);
module.exports=Job;