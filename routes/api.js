import express from "express";
import studentController from "../controllers/studentController.js";


const router = express.Router();

router.post("/create-student",studentController.addNewStudent);
// router.post("/login-student",studcontroller.Studentlogin);
router.get("/get-students",studentController.fetchAllStudents);
router.get("/get-student-id/:id",studentController.getSingleStudent);
router.put("/update-student-id/:id",studentController.updateStudent);
// // router.delete("/delete-student-id/:id",studcontroller.deletestudentbyId);
router.delete("/delete-student/:id",studentController.deleteStudent);

export default router;