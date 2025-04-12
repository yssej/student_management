
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

require('dotenv').config()

const connectToDatabase = async () => {
    const uri = process.env.MONGO_URI;
    const options = {};

    try {
        await mongoose.connect(uri, options);
        console.log("Connexion à la base OK");
    } catch (err) {
        console.error("Erreur de connexion:", err);
    }
};

module.exports = {
    connectToDatabase
}
