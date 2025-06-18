import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import env from "../config/env.js";

console.log({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: env.MAIL_FROM,
    pass: env.MAIL_PASS, // App password
  },
});
// transporter
const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: env.MAIL_FROM,
    pass: env.MAIL_PASS, // App password
  },
});

export async function sendBackupEmail(zipPath, date) {
  const fileContent = await fs.promises.readFile(zipPath);

  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    subject: `Daily DB Backup - ${date}`,
    text: `Attached is the backup for ${date}.`,
    attachments: [
      {
        filename: path.basename(zipPath),
        content: fileContent,
        contentType: "application/zip",
      },
    ],
  };

  await transporter.sendMail(mailOptions);
}
