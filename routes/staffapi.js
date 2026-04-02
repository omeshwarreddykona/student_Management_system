import express from "express";
import staffController from "../controllers/staffController.js";
// import Skills from "../controller/skillController.js";



const api = express.Router();   

api.post("/create-staff",staffController.createThestaff);
// api.post("/login-staff",StaffController.loginStaff);
api.get("/get-all-staff",staffController. fetchAllStaff);
// api.get("/get-staff-id/:id",staffController.getStaffById);
api.put("/update-staff/:id",staffController.updateStaff);
api.delete("/delete-staff/:id",staffController.deleteStaff);

// api.post("/create-skill",Skills.createSkills)
// api.get("/get-data",Skills.getSkills)





export default api;