const fs = require('fs');
const path = require('path');
const https = require('https');

/**
 * Format DateTime
 * @param val
 * @returns {*|string}
 */
exports.dateTimeFormat = (val) => {
    return val.toISOString().replace('T', ' ').substring(0, 19);
};

exports.checkDirAndMake = (path) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, {recursive: true});
    }
};

exports.fileUrl = (req, file) => {
    return 'https://' + req.headers.host + '/file/' + file;
};


exports.generateRandomString = (length) => {
    const chars =
        "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
        {length: length},
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );

    const randomString = randomArray.join("");
    return randomString;
};

exports.generateRandomNumber = (length) => {
    const chars =
        "1234567890";
    const randomArray = Array.from(
        {length: length},
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );

    const randomString = randomArray.join("");
    return randomString;
};

exports.checkAttr = (body, attr, res) => {
    if (Object.hasOwnProperty.bind(body)(attr)) {
        if (res === "" || res === undefined) {
            return null;
        }
        return res;
    }
    return null;
};

exports.statusRequest = (val) => {
    switch (val) {
        case 1:
            return "Uploded";
        default:
            return "Sent";
    }
};

exports.statusApproval = (val) => {
    switch (val) {
        case 1:
            return "Approved";
        case 2:
            return "Approved with new document";
        case 3:
            return "Rejected";
        default:
            return "Requests";
    }
};

exports.downloadFile = (url) => {
    const req = https.get(url, function (res) {
        let fn = path.basename(url);
        console.log(url);
        console.log(res);
        const fileStream = fs.createWriteStream(fn);
        res.pipe(fileStream);

        fileStream.on("error", function (err) {
            console.log("Error writting to the stream.")
            console.log(err)
        });

        fileStream.on("finish", function () {
            fileStream.close();
            console.log("Done");
        })
    })

    req.on("error", function (err) {
        console.log("Download File Error.")
        console.log(err)
    });
}


exports.getDateNow = (format = null) => {
    let date_ob = new Date();

// current date
// adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

// current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
    let year = date_ob.getFullYear();

// current hours
    let hours = date_ob.getHours();

// current minutes
    let minutes = date_ob.getMinutes();

// current seconds
    let seconds = date_ob.getSeconds();

    switch (format) {
        case 1:
            return year + "" + month + "" + date;
        default:
            return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    }
}


exports.getDateBc = (strdate,format = null) => {
    let date_ob = new Date(strdate);

// current date
// adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

// current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
    let year = date_ob.getFullYear();

// current hours
    let hours = date_ob.getHours();

// current minutes
    let minutes = date_ob.getMinutes();

// current seconds
    let seconds = date_ob.getSeconds();

    switch (format) {
        case 1:
            return year + "" + month + "" + date;
        default:
            return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    }
}

exports.needBa = () => {

}
