module.exports = (app, forms) => {
    const { authJwt } = require("../middleware");
    const merchant = require("../controllers/merchant.controller.js");
    const router = require("express").Router();

   router.get("/",[authJwt.verifyToken], merchant.index);
   router.post("/create",[forms.single('picture'),authJwt.verifyToken], merchant.create);
   router.get("/bycategory/:category",[authJwt.verifyToken], merchant.byCategory);
   router.get("/searchName/:keyword",[authJwt.verifyToken], merchant.searchName);
   router.get("/bycity/:kotamadya_kabupaten",[authJwt.verifyToken], merchant.byCity);
   router.get("/byprovince/:provinsi",[authJwt.verifyToken], merchant.byProvince);
   router.get("/byuserid/:userid",[authJwt.verifyToken], merchant.byUserId);
   router.get("/getreview/:id",[authJwt.verifyToken], merchant.getReview);
    app.use('/api/merchant', router);
};
