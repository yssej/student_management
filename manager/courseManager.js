let {Course} = require("../model/schemas");
const ReturnType = require("../utile/ReturnType");

async function updateOrCreate(courseData, id=null) {


    try {

        let course;
        let update = false
        let create = false
        console.log(courseData)

        if (id) {
            student = await Course.findById(id)
            if (!student) {

                throw ("le cours n'existe pas")
            }
            update = true
            create = false
            course.name = courseData.name
            course.code = courseData.code


        } else {
            update = false
            create = true
            course = new Course();
            course.name = courseData.name;
            course.code = courseData.code;
   }

        const courseDataInsert = await course.save();
         if(update) {
            return new ReturnType(1, "update_success", "le cours a été mis a jour avec succée", courseDataInsert)

         } else if(create) {
            return new ReturnType(1, "create_success", "le cours a été a insérer avec succée", courseDataInsert)

         }


    } catch (err) {
        console.error(err)
        return new ReturnType(-1, "failed_update_or_create", "Erreur sur la creation d'un etudiant", null)
    }

}


async function getAll() {
    try {
      return new ReturnType(1 , "get_all_course" ,"" , await Course.find())
  
    }catch(err) {
      
      throw err
    }
  
  }

  async function destroy(id) {

    try {
     const result = await Course.findByIdAndDelete(id)
     if (!result) {
        return  new ReturnType(-1 ,"not_found" ,"le cours n'existe pas" , null)
    }

    return  new ReturnType(1 ,"delete_success" ,"le cours a été supprimé" , null)

        
    }catch(err) {
        throw err
    }
}

module.exports = {
    updateOrCreate ,
    getAll ,
    destroy
}

