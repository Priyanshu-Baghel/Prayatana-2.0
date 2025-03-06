const ResponseSchema = new mongoose.Schema({
    name: String,
    email: String,
    complaintType: String,
    description: String,
    response: String, // Stores the response to the complaint
});

module.exports = mongoose.model("Response", ResponseSchema);