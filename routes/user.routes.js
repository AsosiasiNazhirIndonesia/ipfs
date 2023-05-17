module.exports = (app, forms) => {
    const { authJwt } = require("../middleware");
    const user = require("../controllers/user.controller.js");
    const router = require("express").Router();

   router.get("/",[authJwt.verifyToken], user.index);
   router.post("/create",[forms.single('picture'),authJwt.verifyToken], user.create);
   router.post("/signin",[forms.single('picture'),authJwt.verifyToken], user.signin);
   router.get("/checkemail/:email",[authJwt.verifyToken], user.checkEmail);
   router.post("/refer",[forms.single('picture'),authJwt.verifyToken], user.refer);
   router.get("/:id",[authJwt.verifyToken], user.detail);
   router.get("/forgot/:email",[authJwt.verifyToken], user.forgotPassword);
   router.get("/verif/:email",[authJwt.verifyToken], user.emailVerif);
   router.get("/verifdone/:email",[authJwt.verifyToken], user.emailVerifDone);
   router.put("/:id/update",[forms.single('picture'),authJwt.verifyToken], user.update);
   router.get("/verify/:address",[authJwt.verifyToken], user.checkAddress);
   router.post("/encrypt",[forms.single('picture'),authJwt.verifyToken], user.encrypt);
   router.post("/decrypt",[forms.single('picture'),authJwt.verifyToken], user.decrypt);

    app.use('/api/user', router);
};
