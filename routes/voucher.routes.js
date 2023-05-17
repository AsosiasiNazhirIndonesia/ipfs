module.exports = (app, forms) => {
    const { authJwt } = require("../middleware");
    const voucher = require("../controllers/voucher.controller.js");
    const router = require("express").Router();

   router.get("/",[authJwt.verifyToken], voucher.index);
   router.post("/create",[forms.single('picture'),authJwt.verifyToken], voucher.create);
   router.get("/references",[authJwt.verifyToken], voucher.references);
   router.get("/:id",[authJwt.verifyToken], voucher.detail);
   router.put("/:id/update",[forms.single('picture'),authJwt.verifyToken], voucher.update);

    app.use('/api/voucher', router);
};
