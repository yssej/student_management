const _studentManager = require("../manager/studentManager")

async function updateOrCreate (studentData , id=null) {

    try {
        const data = await _studentManager.updateOrCreate(studentData,id)
        return data

    }catch(err) {
        throw err
    }
}


async function GetAll() {
    try {

     const data =  await _studentManager.GetAll()
     return data

    }catch(err) {
        throw err
    }
}

async function destroy (id) {

    try {
          const data = await _studentManager.destroy(id)
          return data

    }catch(err) {
        throw err
    }
}

module.exports = {
    updateOrCreate ,
    GetAll ,
    destroy
}