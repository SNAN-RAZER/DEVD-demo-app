const mongooose=require('mongoose');
const now = new Date();
const userSchema = new
mongooose.Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:1024
    },
    data:{
        type:Date,
        default:now .toLocaleDateString("en-US")
    }

})

module.exports=mongooose.model('test',userSchema);