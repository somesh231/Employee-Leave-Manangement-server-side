const {Schema,model} = require('mongoose');

const EmpLeavSchema = new Schema(
    {
        EmpName:{
            type:String,
        },
        EmpId:{
            type:String,
            default:"",
        },
        StartingDate:{
            type:String,
        },
        EndingDate:{
            type:String,
        },
        LeaveType:{
            type:String,
        },
        Description:{
            type:String
        },
        Status:{
            type:String,
            default:'Pending'
        }
    },{timestamps:true}
)

const EmpLeavForm = new model("empleave",EmpLeavSchema);

module.exports = EmpLeavForm;