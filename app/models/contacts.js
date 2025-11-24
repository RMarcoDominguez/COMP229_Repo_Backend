const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema(
    {
        firstName: String,
        contactNumber: String,
        message: String,
        lastName: String,
        email: {
            type: String,
            unique: true,
            match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
        },
        
    },
    {
        collection: "contacts"
    }
);

module.exports = mongoose.model("Contact", ContactSchema);