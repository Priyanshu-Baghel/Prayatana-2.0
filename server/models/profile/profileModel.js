const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user_id :{
        type : String,
        required : true,
    },
    phone_no : {
        type: Number,
        required : true,
    },
    alternative_phone_no : {
        type: Number,
        required : true,
    },
    address : {
        type: String, 
        required: true,
    },
    landmark : {
        type : String,
        required: true,
    },
    state : {
        type: String,
        required: true,
    },
    city : {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },    
    complaint_interest: { 
        type: String,
        required: true,
    },
    twitter : {
        type: String,
        required : false,
    }
});

const Profile = new mongoose.model("Profile", profileSchema);
module.exports = Profile;