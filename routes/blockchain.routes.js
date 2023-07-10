module.exports = (app, forms) => {
    const {authJwt} = require("../middleware");
    const bc = require("../controllers/blockchain.controller.js");
    const router = require("express").Router();


    router.post("/new-wallet", [forms.single('file'),authJwt.verifyToken], bc.newWallet);
    router.post("/transfer", [forms.single('file'),authJwt.verifyToken], bc.reward);
    router.post("/reedem", [forms.single('file'),authJwt.verifyToken], bc.punish);
    router.get("/:address/balance", [forms.single('file'),authJwt.verifyToken], bc.balance);
    app.use('/api/request', router);
};
