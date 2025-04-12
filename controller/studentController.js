const _studentService = require("../service/studentsService")


async function updateOrCreate(req, res) {

    const { id: _id } = req.query;
    const body = {
        firstName: req.body.firstName.trim(),
        lastName: req.body.lastName.trim()
    }
    try {
        const data = await _studentService.updateOrCreate(body, _id)
        return res.status(200).json({ index: data.index, status: data.status, message: data.message, data: data.data })

    } catch (err) {
        return res.status(500).json({ index: data.index, status: data.status, message: data.message, data: data.data })

    }
}

async function getAll(req, res) {

    try {
        const data = await _studentService.GetAll()
        return res.status(200).json({ index: data.index, status: data.status, message: data.message, data: data.data })
    } catch (err) {
        return res.status(500).json({ index: data.index, status: data.status, message: data.message, data: null })
    }
}

async function destroy(req ,res) {

    const id = req.query.id.trim()
    try {
        const data = await _studentService.destroy(id)
        return  res.status(200).json({index : data.index , status : data.status , message : data.message , data : data.data})

    }catch(err) {
        return  res.status(500).json({index : data.index , status : data.status , message : data.message , data : null})

    }
}

module.exports = {
    updateOrCreate,
    getAll , 
    destroy
}