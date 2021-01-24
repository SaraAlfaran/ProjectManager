const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

require("./server/config/mongoose.config");
app.use(express.urlencoded({ extended: true }));
require("./server/routes/projects.routes")(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );

