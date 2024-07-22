const DepSec = require("../models/depsec-model");


const depSecForm = async(req,res)=>{
    try{
        const response = req.body;
        console.log(response);
        await DepSec.create(response);
        return res.status(200).send({success:true},{message:"data send successfully"},res)
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"message not delivered"});
    }
}

const depSecHome = async (req, res) => {
    try {
      const data=await DepSec.find({});
      res.status(200).json({success:true,data:data});
    } catch (err) {
      res.status(400).send({ msg: "page not found" });
      console.error(err);
    }
  };

  const depSecMng = async (req, res) => {
    try {
      const id = req.params.id;
      const { Manager } = req.body;
  
      const depSec = await DepSec.findByIdAndUpdate(id, { Manager }, { new: true });
  
      if (!depSec) {
        return res.status(404).json({ message: 'DepSec not found' });
      }
  
      res.json({ message: 'Manager name updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating Manager name' });
    }
  };

module.exports = {depSecForm,depSecHome,depSecMng};