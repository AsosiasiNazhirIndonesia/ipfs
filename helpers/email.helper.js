const nodemailer = require('nodemailer');
const ejs = require('ejs');
// const hbs = require('nodemailer-express-handlebars');

// module.exports = sendEmail;

// const handlebarOptions = {
//     viewEngine: {
//         partialsDir: path.resolve('./src/views/'),
//         defaultLayout: false,
//     },
//     viewPath: path.resolve('./src/views/'),
// };

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pijiapp@gmail.com',
        pass: 'kpedhfpvndtbzvjx'
    }
});

// const transporter = nodemailer.createTransport(configSMTP);
// transporter.use('compile', hbs(handlebarOptions));

exports.sendEmail = async (to, subject, template, param) => {
    const html = await ejs.renderFile(__dirname + "/../assets/" + template, param);
    console.log(`Send email to = ${to}, subject = ${subject}`);
    var options = {
        from: 'no-reply@piji.app',
        to,
        subject,
        html
    };
    
    return new Promise((resolve, reject) => {
        transporter.sendMail(options, (err, info) => {
            if (err) {
                console.log(`Failed to send email, error = ${err}`);
                reject(err);
            }

            resolve(info);
        });
    });
}



