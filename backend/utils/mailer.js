const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 465,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEnquiryEmail({ name, email, phone, message, type }) {
  await transporter.sendMail({
    from: `"${process.env.FROM_NAME || "Retro Roots"}" <${process.env.EMAIL_USER}>`,
    to: process.env.RECEIVER_EMAIL,
    subject: `New Enquiry from ${name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e0d0b0;border-radius:8px;overflow:hidden;">
        <div style="background:#b8860b;padding:24px 32px;">
          <h2 style="color:#fff;margin:0;font-size:22px;">New Enquiry — Retro Roots</h2>
        </div>
        <div style="padding:32px;background:#fffdf7;">
          <table style="width:100%;border-collapse:collapse;font-size:15px;">
            <tr><td style="padding:10px 0;color:#555;width:130px;font-weight:bold;">Name</td><td style="padding:10px 0;color:#222;">${name}</td></tr>
            <tr><td style="padding:10px 0;color:#555;font-weight:bold;">Phone</td><td style="padding:10px 0;color:#222;">${phone || "—"}</td></tr>
            <tr><td style="padding:10px 0;color:#555;font-weight:bold;">Email</td><td style="padding:10px 0;color:#222;">${email || "—"}</td></tr>
            <tr><td style="padding:10px 0;color:#555;font-weight:bold;">Type</td><td style="padding:10px 0;color:#222;">${type || "—"}</td></tr>
            <tr><td style="padding:10px 0;color:#555;font-weight:bold;vertical-align:top;">Message</td><td style="padding:10px 0;color:#222;">${message || "—"}</td></tr>
          </table>
        </div>
        <div style="background:#f5f0e8;padding:16px 32px;text-align:center;font-size:12px;color:#888;">
          Retro Roots — The Furniture Concept · info@retroroots.co.in
        </div>
      </div>
    `,
  });
}

module.exports = { sendEnquiryEmail };
