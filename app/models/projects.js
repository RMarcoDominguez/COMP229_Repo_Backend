const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
    {
        title: {type:String,
            unique:true,
        required:'Title is required'},
            
        completion: Date,
        description: {
            type: String
        }
    },
    {
        collection: "projects"
    }
);

module.exports = mongoose.model("Project", ProjectSchema);