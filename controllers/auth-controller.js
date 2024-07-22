const User = require("../models/user-model");
const bcrypt = require("bcrypt");

const UserData = async (req, res) => {
  try {
    const data = await User.find({});
    return res.status(200).send({success:true,data:data});
  } catch (err) {
    return res.status(400).json({ msg: "page not found" });
  }
};

const register = async (req, res) => {
  try {
    // console.log(req.body);
    // res.status(200).send({message:req.body});

    const { name, username, email, phone, role, password,CountLeave} = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ message: "User already exist"});
    }

    const userCreated = await User.create({
      name,
      username,
      email,
      phone,
      role,
      password,
      CountLeave,
    });

    return res.status(201).json({
      msg: "registration successfull",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (err) {
    res.status(501).json({ msg: "page not found" });
    console.log(err);
  }
};



const login = async (req, res) => {
  try {
    const { email, password,isAdmin} = req.body;

    const userExist = await User.findOne({ email });

    console.log(userExist);

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const user = await userExist.comparePassword(password);

    if (user) {
      return res.status(200).json({
        msg: "login successfull",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
        success:true,
      });
    } else {
      return res.status(401).json({ msg: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
    console.log(err);
  }
};

const Users = async (req,res)=>{
  try{
    const userData = req.user;
    console.log(userData)
    res.status(200).json({userData});
  }catch(err){
    console.log(`error from the user route ${err}`);
  }
}

const updateCountLeave = async(req,res)=>{
  try{
  const userId = req.userId;
  const CountLeave = req.body.CountLeave;

  const updateLeave = await User.findByIdAndUpdate(userId,{CountLeave});

  if(!updateLeave){
    return res.status(404).json({ message: 'CountLeave not found' });
  }

  res.json({ message: 'Manager name updated successfully' });
  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'Error updating CountLeave' });
  }
}

const countUsers = async(req,res)=>{
  try{
    const Countuser = await User.countDocuments();
    res.send({Countuser});
  }catch(err){
    console.error(err);
  }
}

module.exports = {register, login ,Users,UserData,updateCountLeave,countUsers};
