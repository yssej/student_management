const express =require("express")

const route = express.Router();  // Create a router instance
const studentController = require("../../controller/studentController")


route.post('/', studentController.updateOrCreate);
route.get("/" ,studentController.getAll)
route.delete("/" , studentController.destroy)

module.exports = route;
