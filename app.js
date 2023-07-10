const moment = require('moment');
const bodyParser = require('body-parser');
const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const multer = require('multer');
const cors = require("cors");
const utils = require("./helpers/utils.helper")
const app = express();
let path = "assets/upload/";
const service = require("./services");
// const {readDataUim, compareData, punishUser} = require("./services/task/schaduler");
const trxReportService = service.trxreportodp;
const BcService = service.blockchain;
const UserService = service.user;
const OdpWitelService = service.odpwitel;
const {Op} = require("sequelize");

//HTTPS
var https = require('https');
var fs = require('fs');
var https_options = {
key: fs.readFileSync("./ssl/private.key.pem"),
cert: fs.readFileSync("./ssl/domain.cert.pem"),
// ca: [
// fs.readFileSync('./ssl/intermediate.cert.pem'),
// fs.readFileSync('path/to/ca_bundle_certificate.crt')
// ]
};



// SET STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log("app.js", file.mimetype)
        // if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
        //     path = "assets/img/";
        // }
        console.log(file.mimetype);
        console.log(path);
        utils.checkDirAndMake(path);
        cb(null, path)
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, Date.now() + '-' + file.originalname)
    }
});

let forms = multer({storage: storage});

const corsOptions = {};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./routes/auth.routes.js')(app, forms);
require('./routes/blockchain.routes.js')(app, forms);
require('./routes/voucher.routes.js')(app, forms);
require('./routes/user.routes.js')(app, forms);
require('./routes/game.routes.js')(app, forms);
require('./routes/merchant.routes.js')(app, forms);

app.use('/file', express.static(__dirname + '/assets/upload/'));
// app.use('/image', express.static(__dirname + '/assets/img/'));

app.get("/", (req, res) => {
    res.json({message: "Welcome to API PIJI."});
});


// // set port, listen for requests
const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}.`);
// });


// var httpsServer = https.createServer(credentials, app);

// httpServer.listen(8080);
// httpsServer.listen(8443);

https.createServer(https_options, app).listen(PORT,() => {
        console.log(`Server is running on port ${PORT}.`);
    })