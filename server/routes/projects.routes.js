const projects = require("../controllers/projects.controller");

module.exports = app => {
    app.get("/api/projects", projects.getAll);
    app.get("/api/projects/:_id", projects.getOne);
    app.post("/api/projects/new", projects.create);
    app.put("/api/projects/update/:_id", projects.update);
    app.delete("/api/projects/delete/:_id", projects.remove);
}
