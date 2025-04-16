
let { Grade } = require("../model/schemas")

let { DateTime } = require("luxon");
const ReturnType = require("../utile/ReturnType");

async function updateOrCreate(gradeData, id) {

    try {
        let grade;
        let update = false;
        let create = false;

        if (id) {
            create = false
            update = true
            const grade = await Grade.findById(id)

            if (!grade) {
                throw ("la note n'existe pas")
            }

            grade.date = DateTime.now().toFormat("yyyy-MM-dd")
            grade.grade = gradeData.grade
        } else {
            create = true
            update = false

            grade = new Grade({
                student: gradeData.student,
                course: gradeData.course,
                date: DateTime.now().toFormat("yyyy-MM-dd"),
                grade: gradeData.grade

            })
        }

        const gradeInsertedData = await grade.save()

        if (update) {
            return new ReturnType(1, "update_grade_success", "la note a été mis a jour", gradeInsertedData)
        } else if (create) {
            return new ReturnType(1, "create_grade_success", "la note a été ajouté avec succée", gradeInsertedData)

        }



    } catch (err) {
        throw err
    }
}


async function getAll(search = "", page = 1, limit = 6) {
    try {
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
  
      const skipNum = (pageNum - 1) * limitNum;
  
      const matchStage = search
        ? {
            $match: {
              $or: [
                { "studentDoc.firstName": { $regex: search, $options: "i" } },
                { "studentDoc.lastName": { $regex: search, $options: "i" } },
                { "courseDoc.name": { $regex: search, $options: "i" } },
              ],
            },
          }
        : { $match: {} };
  
      const pipeline = [
        {
          $lookup: {
            from: "students",
            localField: "student",
            foreignField: "_id",
            as: "studentDoc",
          },
        },
        {
          $lookup: {
            from: "courses",
            localField: "course",
            foreignField: "_id",
            as: "courseDoc",
          },
        },
        { $unwind: "$studentDoc" },
        { $unwind: "$courseDoc" },
  
        matchStage,
  
        { $skip: skipNum },
        { $limit: limitNum },
      ];
  
      const countPipeline = [
        pipeline[0],
        pipeline[1],
        pipeline[2],
        pipeline[3],
        pipeline[4], // the $match stage
        { $count: "count" },
      ];
  
      const [grades, totalCountArr] = await Promise.all([
        Grade.aggregate(pipeline),
        Grade.aggregate(countPipeline),
      ]);
  
      const total = totalCountArr?.[0]?.count || 0;
      const totalPages = Math.ceil(total / limitNum);
  
      return new ReturnType(1, "get_grades", "", {
        grades,
        total,
        page: pageNum,
        totalPages,
      });
    } catch (err) {
      return new ReturnType(0, "get_grades", err.message, {});
    }
  }
  


async function destroy(id) {

    try {
        const result = await Grade.findByIdAndDelete(id)
        if (!result) {
           return  new ReturnType(-1 ,"not_found" ,"la note avec l'identifiant n'existe pas" , null)
       }
   
       return  new ReturnType(1 ,"delete_success" ,"la note a été supprimé" , null)
   
           
       }catch(err) {
           throw err
       }
}

module.exports = {
    destroy ,
    updateOrCreate ,
    getAll
}