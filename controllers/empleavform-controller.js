const EmpLeavForm = require('../models/empleavform-model');

const Empleavepst = async(req,res)=>{
    try{
        const response = req.body;
        console.log(response);
        await EmpLeavForm.create(response);
        
        return res.status(200).json({success:true,response:response});
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"message not delivered"});
    }
}

const EmpLeaveHome = async(req,res)=>{
    try{
        const userId = req.userId;
        const data= await EmpLeavForm.find();
        res.status(200).json({success:true,data:data,userId});
    }catch(err){
        res.status(400).send({ msg: "page not found" });
      console.log(err);
    }
} 

const EmpLeave = async(req,res)=>{
    try {
        const data = await EmpLeavForm.find({});
        return res.status(200).send({success:true,data:data});
      } catch (err) {
        return res.status(400).json({ msg: "page not found" });
      }
}

const EmpLeaveApprove = async(req,res)=>{
    try{
        const _id = req.body;
        const {Status} = req.body
        const approve = await EmpLeavForm.findByIdAndUpdate(_id,{Status},{new:true});

        if(!approve){
            return res.status(404).json({ message: 'Approve not found' });
        }
        res.json({ message: 'Status updated successfully' });

    }catch(err){
        console.error(err);
      res.status(500).json({ message: 'Error updating Status' });
    }
}
const CountDeclined = async(req,res)=>{
    try{
        const count = await EmpLeavForm.countDocuments({ Status: "Declined" })
        res.json({ count });

    }catch(err){
        console.log(err);
    }
}
const CountApproved = async(req,res)=>{
    try{
        const count = await EmpLeavForm.countDocuments({ Status: "Approved" })
        res.json({ count });

    }catch(err){
        console.log(err);
    }
}



module.exports = {Empleavepst,EmpLeaveHome,EmpLeave,EmpLeaveApprove,CountApproved,CountDeclined};