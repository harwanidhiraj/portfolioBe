import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

export const sendMail = async ({ name, email, message }: any) => {
  try {
    const templatePath = path.join(
      __dirname,
      "../",
      "templates",
      "message.ejs"
    );
    const html = await ejs.renderFile(templatePath, { name, email, message });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: "Portfolio",
      to: process.env.SEND_EMAIL,
      subject: "portfolio feedback",
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
