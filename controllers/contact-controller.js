const Contact = require("../models/contact-model");


const contactForm = async(req,res)=>{
    try{
        const response = req.body;
        const data=await Contact.create(response);
        return res.status(200).send({data,success:true});

    }catch(err){
        return res.status(500).send({error:'message not delivered'});
    }
}

module.exports = contactForm;