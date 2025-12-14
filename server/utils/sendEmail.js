const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Login',
    html: `
      
        Login OTP
        Your OTP for login is:
        ${otp}
        This OTP will expire in 10 minutes.
      
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOTPEmail };