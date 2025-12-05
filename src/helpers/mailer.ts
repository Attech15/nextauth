// const nodemailer = require("nodemailer");
import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: string;
  userId: string;
}) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: new Date(Date.now() + 3600000),
        }
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: new Date(Date.now() + 3600000), // expires in 1 hour from now 
        }
      });
    }

    // Create a test account or replace with real credentials.
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "8af12a05976d2d", //?
        pass: "56a75d7338d690", // ?
      },
    });

    const verifyEmail = `<p>Click <a href='${process.env.DOMAIN}/verifyemail?token=${hashedToken}'>here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`;

    // const forgotPassword = ;

    const mailOptions = {
      from: "akash@123", // sender address
      to: email, // receiver address
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: verifyEmail, // HTML body
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
