const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required!"],
        minlength: [3, "title must be 3 characters or longer!"],
        unique: [true, "Title must be unique!"]
    },
    dueDate: {
        type: Date,
        required: [true, "Date is required!"],
    },
    status: {
        type: String,
        required: [true],
    }
}, {timestamps: true});

ProjectSchema.plugin(uniqueValidator);

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
