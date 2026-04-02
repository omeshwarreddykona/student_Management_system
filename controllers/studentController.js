import services from "../services/studentService.js";


export default {

    addNewStudent(req,res,next){
        services.createStudent(req.body).then(result =>{
            res.json(result)
        }).catch(error =>{
            next(error)
        })
    },

    fetchAllStudents(req,res,next){
        services.getAllstudents(req.query).then(result =>{
             if (result.length > 0) {
                res.set(result[0].headers || {});
                res.json(result[0].docs);
            }
            else {
                res.set({
                    "limit": request.query.limit ? request.query.limit : 1,
                    "page": request.query.page ? request.query.page : 1,
                    "total_count": 0,
                    "total_pages": 0
                });
            res,json(result)
            }
        }).catch(error =>{
            next(error)
        })
    },

    getSingleStudent(req,res,next){
        services.getStudentbyId(req.params).then(result =>{
            res.json(result)
        }).catch(error =>{
            next(error)
        })
    },


    updateStudent(req,res,next){
        services.updateStudentById(req.params,req.body).then(result =>{
            res.json(result)
        }).catch(error =>{
            next(error)
        })
    },

    deleteStudent(req,res,next){
        services.updatewithdeletetag(req.params).then(result =>{
            res.json(result)
        }).catch(error =>{
            next(error)
        })
    }
}