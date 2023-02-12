//install and use the nodemailer
//configure the email server
//whom and what to send email, make the email body.
//user the previous cofig to sent the email

import nodemailer from "nodemailer";

const emailProcessing = async (emailInfo) => {
  try {
    //config here
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,

      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    //send email here
    const result = await transporter.sendMail(emailInfo);

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};

//email tempelating
export const adminSignUpEmailVerification = ({ email, fName }, ul) => {
  let info = {
    from: `"Register Form 👻" ${email}`, // sender address
    to: process.env.SMTP_USER, // list of receivers
    subject: "New account confirmation - action required!", // Subject line
    text: `Hi ${fName}, please follow the link ${url} to verify your account`, // plain text body
    html: `
        <p>Hi ${fName}</p>,
        <br/>
        <br/>
        please follow the link below to verify your account:
        <br/>
        <br/>
        <a href="${ulr}" style="color:red font-weight: bolder;">Verify Now<a/>
        <br/>
        <br/>
        
        
        `, // html body
  };

  emailProcessing(info);
};
