const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema(
    {
        title: {
        type:String,
        unique:true,
        required:'Title is required'},

        description: {
        type: String
        }
    },
    {
        collection: "services"
    }
);

module.exports = mongoose.model("Service", ServiceSchema);