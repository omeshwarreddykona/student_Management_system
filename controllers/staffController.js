import services from "../services/staffService.js";

export default{

    createThestaff(req,res,next){
        services.createStaff(req.body).then(result =>{
            res.json(result)
        }).catch(error =>{
            next(error)
        })
    },

    fetchAllStaff(req,res,next){
        services.getAllStaff(req.query).then(result =>{
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
            res.json(result)
            }
        }).catch(error =>{
            next(error)
        })
    },

    updateStaff(req,res,next){
        services.updateStaffById(req.params,req.body).then(result =>{
            res.json(result)
        }).catch(error =>{
            next(error)
        })
    },

    deleteStaff(req,res,next){
        services.deleteStaffById(req.params).then(result =>{
            res.json(result)
        }).catch(error => {
            next(error)
        })
    }
}