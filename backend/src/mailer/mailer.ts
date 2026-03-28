import nodemailer from "nodemailer";

export const sendEmail = async (
  email: string,
  subject: string,
  message: string,
  html: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text: message,
      html,
    };

    const mailRes = await transporter.sendMail(mailOptions);
    console.log("Mail response:", mailRes);

    if (mailRes.accepted.length === 0) {
      throw new Error("Email not sent, rejected by SMTP server");
    }

    return true;
  } catch (error: any) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email: " + error.message);
  }
};
