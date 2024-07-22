const { Schema , model } = require('mongoose')

const depsecSchema = new Schema(
{
    departmentid:{
        type:String,
        required:true,
        unique:true
    },
    departmentName:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
    },
    Manager:{
        type:String,
        required:true,
        unique:true
    },
    Leaveapprovalflow:{
        type:String,
    },
})

const DepSec = new model("depSec",depsecSchema);

module.exports = DepSec;