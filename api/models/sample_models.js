const mongoose = require("mongoose"); 





const companyiesSchema = new mongoose.Schema({
    _id : {
        type: Number, 
        required : true,
        unique: true
    } 
    , 
    companies : {
        type: String, 
        required : true, 
        
    }, 
    url: {
        type: String, 
        required: true
    }
})






module.exports = mongoose.model("Company", companyiesSchema);