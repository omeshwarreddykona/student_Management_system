//  import Skills from "../models/skills.js";

//  export default{
//     async createSkills (req,res){
//          let data = [
//              {
//                  name: "A",
//                  role: "Admin",
//                  sequence_number: 1,
//                  department: "IT",
//                  salary: 90000,
//                  skills: ["NodeJS", "MongoDB"]
//              },
//              {
//                  name: "B",
//                  role: "Manager",
//                  sequence_number: 2,
//                  department: "IT",
//                  salary: 70000,
//                  skills: ["React", "NodeJS"]
//              },
//              {
//                  name: "C",
//                  role: "Lead",
//                  sequence_number: 3,
//                  department: "IT",
//                  salary: 60000,
//                  skills: ["JavaScript"]
//              },
//              {
//                  name: "D",
//                  role: "Developer",
//                  sequence_number: 4,
//                  department: "IT",
//                  salary: 40000,
//                  skills: ["JavaScript", "React"]
//              },
//              {
//                  name: "E",
//                  role: "HR",
//                  sequence_number: 5,
//                  department: "HR",
//                  salary: 35000,
//                  skills: ["Recruitment"]
//              }]
//              await Skills.create(data)
//     },
// async getSkills(req, res) {
//   try {
//     const result = await Skills.aggregate([
//       { $match: { department: "IT" } },
//       { $project : {
//         _id:0,
//         name :1,
//         skills:1,
//         salary:1,
//         sequence_number:1,
//         department:1
//       }},
//     { $sort: { sequence_number: -1 } },
//     { $limit : 200},
//     { $unwind: "$skills" },
//     {
//   $addFields: {
//     yearly_salary: { $multiply: ["$salary", 12] }
//   }
// },
// // {
// //   $group: {
// //     _id: "$department",
// //     total: { $sum: "$salary" },
// //     avg: { $avg: "$salary" },
// //     max: { $max: "$salary" },
// //     min: { $min: "$salary" }
// //   }
// // },
// {
//     $lookup:{
//         from:"staffs",
//         localField:"department",
//         foreignField:"Department",
//         as:"Data"
//     }
// }
//     ]);

//     return res.status(200).json({
//       success: true,
//       data: result
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// }

//  }