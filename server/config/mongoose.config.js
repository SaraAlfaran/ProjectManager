const mongoose = require("mongoose");

mongoose.set('useCreateIndex', true);

mongoose.connect("mongodb://localhost/belt_exam_db", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then( () => console.log("Succesfully connected to belt_exam_db")
).catch(err => console.err(err));