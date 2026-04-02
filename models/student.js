import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    roll_no:{type:String,required:true,unique:true},
    course:{type:String},
    class_teacher:{type:String,required:true},
    percentage:{type:Number,required:true},
    // password:{type:String,required:true},
    deleted_at:{type:Date,default:null}
},{
    timestamps : true
});

const Student = mongoose.model("Student",StudentSchema);
export default Student;