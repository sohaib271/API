const express=require("express");
const mongoose=require("mongoose");
const multer=require("multer");
const cors=require("cors");
const dotenv=require("dotenv");
const bodyParser=require("body-parser");
const User=require("./models/user");
const path=require("path");
dotenv.config();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("DB connected"))

const app=express();
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use("/uploads", express.static("uploads"));

app
.post("/teachers/api/post",upload.single("image"),(req,res)=>{
  const {name,HOD,gender,department,courses,description,age}=(req.body);
  const image = req.file && req.file.path;
  const user=new User({
    name,
    HOD,
    gender,
    department,
    courses,
    description,
    age,
    image:image,
  })
  user.save();
  return res.json({message:"User Created"});
})
.get("/teachers/api/all",async(req,res)=>{
  const users=await User.find();
  return res.json({user:users});
})

const port=process.env.PORT;

app.listen(port,()=> console.log("Server Started"))