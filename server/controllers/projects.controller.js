const Project = require("../models/projects.model");

class ProjectController {

    getAll(req, res) {
        Project.find({})
            .then(Projects => res.json(Projects))
            .catch(err => res.json(err));
    }
    getOne(req, res) {
        Project.findById(req.params._id)
            .then(Project => res.json(Project))
            .catch(err => res.json(err));
    }
    create(req, res) {
        Project.create(req.body)
            .then(Project => res.json(Project))
            .catch(err => res.json(err));
    }
    update(req, res) {
        Project.findByIdAndUpdate({ _id: req.params._id }, req.body, { runValidators: true })
            .then(Project => res.json(Project))
            .catch(err => res.json(err));
    }
    remove(req, res) {
        Project.deleteOne({ _id: req.params._id })
            .then(() => res.json({ msg: "ok, it's deleted" }))
            .catch(err => res.json(err));
    }
    
}

module.exports = new ProjectController();
