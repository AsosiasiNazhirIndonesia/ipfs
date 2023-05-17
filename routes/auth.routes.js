
module.exports = function(app,forms) {
    const auth = require("../controllers/auth.controller.js");

    app.post("/api/request/token", auth.signin);
};
