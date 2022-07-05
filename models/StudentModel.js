const mongoose = require('mongoose');


const studentSchema  = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    
    },
    phone:{
        type:String,
        required:true,
        unique:true

    },
    photo:{
        type:String
    }
},{
    timestamps:true
})


const Student = mongoose.model('Student', studentSchema)

module.exports = Student