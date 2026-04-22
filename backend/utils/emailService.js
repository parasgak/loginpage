const nodemailer = require('nodemailer');

let transporter;

async function initTransporter() {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });
    } else {
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
        console.log('Ethereal Email Test Account Created:', testAccount.user);
    }
}

initTransporter();

async function sendEmailOTP(to, otp) {
    if (!transporter) {
        await initTransporter();
    }
    const info = await transporter.sendMail({
        from: '"Auth System" <no-reply@authapp.com>',
        to,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
        html: `<b>Your OTP code is ${otp}</b>. It will expire in 10 minutes.`,
    });
    
    console.log('Message sent: %s', info.messageId);
    if (info.messageId && nodemailer.getTestMessageUrl) {
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
}

module.exports = { sendEmailOTP };
