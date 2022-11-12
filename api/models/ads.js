const mongoose = require("mongoose"); 

const adsSchema = new mongoose.Schema({
    _id : {
        type: Number, 
        required: true, 
    }, 
    companyID: {
        type: mongoose.Schema.Types.Number,
        ref: "Company"
    }, 
    primaryText: {
        type: String, 
        
    } , 
    headline: {
        type: String
    }, 
    description: {
        type: String
    }, 
    imageUrl : {
        type: String
    }
})

module.exports = mongoose.model("ads", adsSchema);