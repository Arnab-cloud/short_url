const mongoose = require("mongoose");
async function connectToMongoDB(URL){
    await mongoose.connect(`${URL}short_url`)
    .then(()=>console.log("MongoDB connected"))
    .catch((err)=> console.log(`err: ${err}`));
};

module.exports = {
    connectToMongoDB
};