import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    staff_Id: { type: Number, required: true, unique: true },
    role: { type: String, required: true },
    salary: { type: Number },
    skills: [{ type: String }],
    deleted_at: { type: Date }
    // password :{type:String,required:true},
    // status:{type:String,enum:["pending","approved","rejected"],default:"pending"},
    // is_approved:{type:Boolean,default:false}
}, {
    timestamps: true
});
const Staff = mongoose.model("Staff", StaffSchema);
export default Staff;

