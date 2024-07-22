const {Schema,model} = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        unique:true,
    },
    email:{
        type:String,
        unique:true,      
    },
    phone:{
        type:String,
        unique:true,    
    },
    role:{
        type:String,
    },
    password:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    CountLeave:{
        type:Number,
        default:0
    }
})

//secure the password with bcrypt

userSchema.pre("save",async function(){
    const user = this

    if(!user.isModified("password")){
        next();
    }
    try{

        //hash the password
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;

    }catch(err){
        console.log(err);
    }
})

//json web token
userSchema.methods.generateToken = async function (){

    try{
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin: this.isAdmin
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"90d",
        }
    )
    }catch(err){
        console.error(err);
    }
}

//compare function

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}


//define the model or the collection name
const User = new model("User",userSchema);

module.exports = User;