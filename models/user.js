const {Schema,model}=require("mongoose");

const userSchema=new Schema({
  name:{
    required:true,
    type:String,
  },
  image:{
    type:String,
    default:"/models/default.jpg",
  },
  HOD:{
    type:String,
    enum:["Yes","No"],
    default:"No",
  },
  gender:{
    type:String,
    default:"Male",
  },
  department:{
    type:String,
    required:true,
  },
  courses:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  age:{
    type:Number,
    required:true,
  }
})

const User=new model("UserAPI",userSchema);

module.exports=User;

