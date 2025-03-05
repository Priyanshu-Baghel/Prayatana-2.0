const User = require('../../models/Auth/userModel');
const Message = require("../../models/contact/contactModel");

/* 
----------------------------------
ALL Get APIS Here
----------------------------------
*/

const getAllActiveUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getAllMessages = async (req, res) => {
    try {
    const message = await Message.find();
    if(message === null){
      res.status(200).json({message: "No Messages Found" })
    }

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


/* 
----------------------------------
ALL Post APIS Here
----------------------------------
*/



module.exports = { getAllActiveUsers, getAllMessages};