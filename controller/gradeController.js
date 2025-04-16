const _gradeService = require("../service/gradeService")

async function updateOrCreate(req, res) {

    const { id: _id } = req.query;
    const body = {
        student: req.body.student.trim(),
        course: req.body.course.trim() ,
        grade : req.body.grade.toString().trim()

    }
    try {
        const data = await _gradeService.updateOrCreate(body, _id)
        return res.status(200).json({ index: data.index, status: data.status, message: data.message, data: data.data })

    } catch (err) {
        return res.status(500).json({ index: data.index, status: data.status, message: data.message, data: data.data })

    }
}

async function getAll(req, res) {

    try {
        const search = req.query.search ? req.query.search  : ""
    
        const page = req.query.page 
    
        const limit = req.query.limit

        const data = await _gradeService.GetAll(search, page, limit)
        return res.status(200).json({ index: data.index, status: data.status, message: data.message, data: data.data })
    } catch (err) {
        return res.status(500).json({ index: data.index, status: data.status, message: data.message, data: null })
    }
}

async function destroy(req ,res) {

    const id = req.query.id.trim()
    try {
        const data = await _gradeService.destroy(id)
        return  res.status(200).json({index : data.index , status : data.status , message : data.message , data : data.data})

    }catch(err) {
        return  res.status(500).json({index : data.index , status : data.status , message : data.message , data : null})

    }
}

module.exports = {
    destroy ,
    updateOrCreate ,
    getAll
}