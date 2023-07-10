module.exports = (app, forms) => {
    const { authJwt } = require("../middleware");
    const game = require("../controllers/game.controller.js");
    const router = require("express").Router();

   router.get("/",[authJwt.verifyToken], game.index);
   router.post("/create",[forms.single('picture'),authJwt.verifyToken], game.create);
   router.get("/:category",[authJwt.verifyToken], game.references);

    app.use('/api/game', router);
};
