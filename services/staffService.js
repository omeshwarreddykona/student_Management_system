import Staff from "../models/staff.js";
import { ObjectId } from "mongodb";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// let Key = "12344556770";


export default {

   // ============================ Create the Staff =================================================//

   async createStaff(body) {
      try {
         const name = body.name;
         const email = body.email;
         const department = body.department;
         const staff_Id = body.staff_Id;
         const role = body.role;
         // const password = req.body.password;
         // const confirm_password = req.body.confirm_password;

         if (!name) {
            throw { code : 400 , message: "Please enter the name" }
         }
         if (!email) {
            throw { code : 400 , message: "Please enter the email" }
         }
         if (!department) {
            throw { code : 400 , message: "Please enter the Department" }
         } if (!staff_Id) {
            throw { code : 400 , message: "Please enter the Staff_Id" }
         }
         if (!role) {
            throw { code : 400 , message: "Please enter the role" }
         }
         // if (!password) {
         //    return res.status(400).json({ success: false, message: "Please enter the password" })
         // }
         // if (password !== confirm_password) {
         //    return res.status(400).json({ success: false, message: "The password was incorrect" })
         // }
         let existing = await Staff.findOne({ staff_Id: staff_Id });
         if (existing) {
            return {code : 400 , message: "The person is already exists" }
         }

         // let hashpassword = await bcrypt.hash(password, 10);
         let data = {
            name: name,
            email: email,
            department: department,
            staff_Id: staff_Id,
            role: role,
            salary: body.salary,
            skills: body.skills

            // password: hashpassword,
         }

         let signin = await Staff.create(data);
         if (signin) {
            return { code : 200 , message: "Staff registered successfully" }
         }
      } catch (error) {
         throw { code : 500, message: error.message }
      }
   },


   // login staff

   // async loginStaff(req,res){
   //    try{
   //       const email = req.body.email;
   //       const password = req.body.password;

   //       let staff = await Staff.findOne({email:email});
   //       if(!staff){
   //          return res.status(404).json({success:false,message:"Teacher not found"})
   //       }
   //       let comparepassword = await bcrypt.compare(password,staff.password);
   //       if(!comparepassword){
   //          return res.status(400).json({success:false,message:"password was wrong check again"})
   //       }
   //       let token = jwt.sign({staffname:staff.name,email:staff.email,role:staff.role},Key);
   //       if(token){
   //          return res.status(200).json({success:true,message:"staff loggedin Successfully",token})
   //       }

   //    }catch(error){
   //       return res.status(400).json({success:false,message:"Something went back"})
   //    }
   // },
   // get all the staff


   // ============================ Get api for fetching the staff data =================================================//

   async getAllStaff(query) {
      try {
         const page = parseInt(query.page) || 1;
         const limit = parseInt(query.limit) || 5;
         const skip = (page - 1) * limit;
         const search = query.search?.trim();
         const filter = ({ deleted_at: null });
         if (search) {
            filter.$or = [
               { name: { $regex: search, $options: "i" } },
               { email: { $regex: search, $options: "i" } },
               { department: { $regex: search, $options: "i" } },
               { role: { $regex: search, $options: "i" } }
            ]
         };
         const result = await Staff.aggregate([

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
         return res.status(400).json({ success: false, message: error.message })
      }
   },


   // ============================ get the Staff data by Id =================================================//

   async getStaffById(req, res) {
      try {
         const id = req.params.id;
         let findStaff = await Staff.findOne({ _id: new ObjectId(id) });
         if (findStaff) {
            return res.status(200).json({ success: true, message: "Data fetched by using Id", data: findStaff })
         }

      } catch (error) {
         return res.status(400).json({ success: false, message: "Something went wrong while fetching the staff data by Id" })
      }
   },

   async updateStaffById(params,body) {
      try {
         const id = params.id;
         let findStaff = await Staff.findOne({ _id: new ObjectId(id) });
         if (findStaff) {
            let updateStaff = await Staff.updateOne({ _id: new ObjectId(id) }, { $set: body });
            if (updateStaff) {
               return { code : 200, message: "Staff data updated successfully" }
            }
         }
      } catch (error) {
      throw {code:500, message:error.message }
      }
   },

   async deleteStaffById(params) {
      try{
      const id = params.id;
      let findStaff = await Staff.findOne({ _id: new ObjectId(id) });
      if (findStaff) {
         let deleteStaff = await Staff.updateOne({ _id: new ObjectId(id) }, { $set: { deleted_at: new Date} });
         if (deleteStaff) {
            return {code : 200, message: "Staff data deleted successfully" }
         }
      }
   }catch(error){
      throw {code : 500 ,message : error.message}
   }

}
}