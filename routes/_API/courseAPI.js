const express =require("express")

const route = express.Router();  // Create a router instance
const _courseController = require("../../controller/courseController")


route.post('/', _courseController.updateOrCreate);
route.get("/" ,_courseController.getAll)
route.delete("/" , _courseController.destroy)

module.exports = route;
