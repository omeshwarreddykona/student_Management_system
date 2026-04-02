import Student from "../models/student.js";
import { ObjectId } from "mongodb";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import validator from "validator";
// import PasswordValidator from "password-validator";

// let secret_key = "123445578800";

export default {

    // Create Student

    async createStudent(body) {
        try {
            const name = body.name.trim();
            const email = body.email.trim();
            const roll_no = body.roll_no.trim();
            const course = body.course.trim();
            const class_teacher = body.class_teacher.trim();
            // const password = req.body.password.trim();
            // const confirm_password = req.body.confirm_password.trim();
            const percentage = body.percentage;
            // let  Schema = new PasswordValidator();

            // Schema
            //     .is().min(6)
            //     .is().max(100)
            //     .has().uppercase()
            //     .has().lowercase()
            //     .has().digits(3)
            //     .has().symbols(1)
            //     .has().not().spaces()
            //     .is().not().oneOf(["password","Password123"]);
            //     let isvalid_password = Schema.validate(password);
            if (!name) {
                throw {code:400 , message: "Please enter the name" }
            }
            if (!validator.isEmail(email)) {
                 throw {code:400 , message: "Please enter the  valid email" }
            }
            if (!roll_no) {
                 throw {code:400 , message: "Please enter the roll number"}
            }if (!course) {
                 throw {code:400 , message: "Please enter the course"}
            }
            if(!class_teacher){
                 throw {code:400 , message:"Please the class teacher name"}
            }
            // if (!password || !isvalid_password ) {
            //     return res.status(400).json({ success: false, message: "Please enter the valid password" })
            // }
            if(!percentage){
                throw {code:400 , message:"Please enter the percentage"}
            }
            // if (password !== confirm_password) {
            //     return res.status(400).json({ success: false, message: "please enter the correct password" })
            // }
        let  existingUser = await Student.findOne({roll_no:roll_no});
            if (existingUser) {
                 return {code:400 ,  message: "The Student  is already exist" }
            }
            // let hashpassword = await bcrypt.hash(password, 10);
            let data = {
                name: name,
                email: email,
                roll_no: roll_no,
                course:course,
                class_teacher:class_teacher,
                percentage:percentage,
            //     password:hashpassword
            };
            let signup = await Student.create(data);
            if(signup){
                return {code : 200,message:"Student registered Successfully"}
            }
        } catch (error) {
            throw { code : 500 , message:error.message }
        }
    },
 //  Student login 
    // async Studentlogin(req, res) {
    //     try {
    //         const roll_no = req.body.roll_no;
    //         const password = req.body.password;
    //         let student = await Student.findOne({ roll_no: roll_no });
    //         if (!student) {
    //             return res.status(404).json({ success: false, message: "Student not found" })
    //         };
    //         let comparepassword = await bcrypt.compare(password, student.password);
    //         if (!comparepassword) {
    //             return res.status(400).json({ success: false, message: "Incorrect password re-enter password again" })
    //         };
    //         let token = jwt.sign({ studentname: student.name, roll_no: student.roll_no,student_email:student.email}, secret_key);
    //         if (token) {
    //             return res.status(200).json({ success: true, message: "Student login Successfully", token })
    //         };
    //     } catch (error) {
    //         console.log(error)
    //         return res.status(400).json({ success: false, message: "Something went wrong" })
    //     }
    // },
     // get all students 

    async getAllstudents(query) {
        try {
            const page = parseInt(query.page) || 1;
            const limit = parseInt(query.limit) || 10;

            const skip = (page - 1) * limit;

            const search = query.search || "";

            const filter = { deleted_at: { $eq: null } };
            if (search) {
                filter.$or = [
                    { name: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } }
                ]
            };
         const result = await Student.aggregate([

        { $match: filter },
        { $group: { _id: null, docs: { $push: "$$ROOT" }, totalcount: { $sum: 1 } } },
        { $unwind: '$docs' },
        { $sort: { "docs._id": -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $group: {
            _id: null,
            docs: { $push: '$docs' },
            headers: {
              $first: {
                total_count: '$totalcount',
                total_pages: {
                  $ceil: {
                    $divide: ['$totalcount', limit]
                  }
                },
                current_page: page,
                limit: limit
              }
            }
          }
        }
      ]).exec();
      return result;
        } catch (error) {
            throw { code : 500, message: error.message }
        }
    },

    // get student by id

       async getStudentbyId(params) {
        try {
            const id = params.id;
            if (!ObjectId.isValid(id)) {
                throw {code : 400, message: "Invaild  Student Id" }
            }
            let getbyId = await Student.findOne({ _id: new ObjectId(id) });
            if (!getbyId) {
                throw { code : 400 , message: "Student Id not found!" }
            }
            if (getbyId) {
                return {code : 200, message: "we fetched the student data by Id", data: getbyId }
            }
        } catch (error) {
            throw {code : 500 , message: "Something went wrong" }
        }
    },

    // Update student by id

    async updateStudentById(params,body) {
        try {
            const id = params.id;
            let findstudent = await Student.findOne({ _id: new ObjectId(id) });
            if (findstudent) {
                let update = await Student.updateOne({ _id: new ObjectId(id) }, { $set: body });
                if (update) {
                    return { code : 200, message: "Data updated Successfully" }
                }
            }
        } catch (error) {
            throw { success: false, message: "Something went wrong" }
        }
    },

    // delete student by id

    // async deletestudentbyId(params) {
    //     try {
    //         const id = params.id;
    //         let findId = await Student.findOne({ _id: new ObjectId(id) });
    //         if (findId) {
    //             let deletestudent = await Student.deleteOne({ _id: new ObjectId(id) });
    //             if (deletestudent) {
    //                 return {code : 200 , message: "Data deleted Successfully" }
    //             }
    //         }
    //     } catch (error) {
    //         throw {code : 500, message: error.message }
    //     }
    // },

    // Update with delete tag 

    async updatewithdeletetag(params) {
        try {
            const id = params.id;
            let findstudent = await Student.findOne({ _id: new ObjectId(id) });
            if (findstudent) {
                let update = await Student.updateOne({ _id: new ObjectId(id) }, { $set: { deleted_at: new Date } })
                if (update) {
                    return { code : 200, message: "Data deleted successfully" }
                }
            }
        } catch (error) {
            throw {code:500, message: "some thing went wrong" }
        }
    }
}


