import nodemailer from "nodemailer";

export const mailsender = async (email:string, title: string, body: string) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        let info = await transporter.sendMail({
            from: "www.peerchat.com - Peer",
            to: email,
            subject: title,
            html: body,
        });

        return info;

    } catch (error) {
        console.error("Error while sending the mail", error);
    }
}
