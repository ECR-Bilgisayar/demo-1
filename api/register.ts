import fs from "fs";
import path from "path";
import sgMail from "@sendgrid/mail";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || "no-reply@etkinlikbilgisayar.com";
const BCC_EMAIL = "info@etkinlikbilgisayar.com";

const allowedExtensions = [".gif", ".png", ".jpg", ".jpeg"];

const getMimeType = (fileName: string) => {
  const ext = path.extname(fileName).toLowerCase();
  if (ext === ".gif") return "image/gif";
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  return "application/octet-stream";
};

const loadEmailAssets = () => {
  const assetsDir = path.join(process.cwd(), "public", "email-assets");
  if (!fs.existsSync(assetsDir)) {
    return [];
  }

  return fs.readdirSync(assetsDir)
    .filter((fileName) => {
      const ext = path.extname(fileName).toLowerCase();
      return allowedExtensions.includes(ext);
    })
    .map((fileName) => {
      const filePath = path.join(assetsDir, fileName);
      const fileContent = fs.readFileSync(filePath).toString("base64");
      return {
        content: fileContent,
        filename: fileName,
        type: getMimeType(fileName),
        disposition: "inline",
        content_id: fileName,
      };
    });
};

const buildHtml = (payload: any, attachments: any[]) => {
  const { name, email, phone, company, message } = payload;
  const findCid = (fileName: string) => {
    const attachment = attachments.find((item) => item.filename === fileName);
    return attachment ? `cid:${attachment.filename}` : "";
  };

  const logoCid = findCid("Email-logo-top.jpg") || findCid("Email-logo-top-Retina.jpg");
  const heroGifCid = findCid("425217-HIB-Animation-Email.gif");
  const starsCid = findCid("Email-body-stars.jpg") || findCid("Email-body-stars-Retina.jpg");

  return `
    <div style="font-family: Inter, Arial, sans-serif; color: #111827; background: #eff2f7; padding: 24px;">
      <div style="max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 28px; overflow: hidden; box-shadow: 0 24px 80px rgba(15, 23, 42, 0.12);">
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 36px 24px; text-align: center; color: #ffffff;">
          ${logoCid ? `<img src=\"${logoCid}\" alt=\"Küresel Liderlik Zirvesi\" width=\"180\" style=\"display: block; margin: 0 auto 24px; max-width: 100%; height: auto;\" />` : ""}
          <h1 style="margin: 0 0 12px; font-size: 32px; line-height: 1.1; letter-spacing: -0.03em;">Kayıt Onayı</h1>
          <p style="margin: 0; color: rgba(255,255,255,0.72); font-size: 15px;">Hilton Istanbul Bosphorus | 15–17 Eylül 2026</p>
        </div>

        ${heroGifCid ? `<div style="text-align: center; padding: 24px 16px 0;"><img src=\"${heroGifCid}\" alt=\"Kayıt Onayı\" style=\"width: 100%; max-width: 640px; height: auto; border-radius: 24px;\" /></div>` : ""}

        <div style="padding: 32px 32px 24px;">
          <p style="margin: 0 0 20px; font-size: 16px; color: #0f172a;">Merhaba ${name},</p>
          <p style="margin: 0 0 24px; font-size: 15px; color: #475569; line-height: 1.7;">Kaydınız başarıyla alındı. Başvurunuz inceleme altına alındı ve ekibimiz en kısa sürede sizinle iletişime geçecektir.</p>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 20px; padding: 24px;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; color: #334155; font-size: 14px; line-height: 1.7;">
              <tr>
                <td style="padding: 10px 0; font-weight: 700; width: 35%;">Ad Soyad</td>
                <td style="padding: 10px 0; text-align: right;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 700;">E-posta</td>
                <td style="padding: 10px 0; text-align: right;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 700;">Telefon</td>
                <td style="padding: 10px 0; text-align: right;">${phone || "Belirtilmedi"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 700;">Şirket / Ünvan</td>
                <td style="padding: 10px 0; text-align: right;">${company}</td>
              </tr>
            </table>
          </div>

          <div style="margin-top: 24px; padding: 24px; border-radius: 20px; background: #ffffff; border: 1px solid #e2e8f0;">
            <p style="margin: 0 0 10px; font-weight: 700; color: #0f172a;">Mesajınız</p>
            <p style="margin: 0; color: #475569; line-height: 1.7;">${message}</p>
          </div>

          ${starsCid ? `<div style="text-align: center; margin: 32px 0 0;"><img src=\"${starsCid}\" alt=\"Stars\" style=\"max-width: 100%; height: auto; border-radius: 18px;\" /></div>` : ""}

          <div style="margin-top: 32px; padding: 24px; border-radius: 20px; background: #0f172a; color: #f8fafc;">
            <p style="margin: 0 0 12px; font-size: 15px; font-weight: 700;">Bir adım daha yaklaştınız</p>
            <p style="margin: 0; font-size: 14px; color: #cbd5e1; line-height: 1.7;">Kayıt e-postanız ayrıca info@etkinlikbilgisayar.com adresine BCC olarak gönderildi. En kısa zamanda sizinle iletişime geçeceğiz.</p>
          </div>
        </div>

        <div style="padding: 22px 24px 28px; text-align: center; background: #f8fafc; color: #64748b; font-size: 13px;">
          <p style="margin: 0;">Hilton Istanbul Bosphorus · Küresel Liderlik Zirvesi 2026</p>
          <p style="margin: 8px 0 0;">© 2026 Etkinlik Bilgisayar. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </div>
  `;
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Sadece POST isteğine izin verilir." });
  }

  if (!SENDGRID_API_KEY) {
    return res.status(500).json({ error: "SendGrid API anahtarı yapılandırılmamış." });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  const { name, email, phone, company, message } = body || {};

  if (!name || !email || !company || !message) {
    return res.status(400).json({ error: "Ad, e-posta, şirket ve mesaj alanları zorunludur." });
  }

  sgMail.setApiKey(SENDGRID_API_KEY);

  const attachments = loadEmailAssets();
  const mailPayload: any = {
    to: email,
    from: SENDGRID_FROM_EMAIL,
    bcc: [{ email: BCC_EMAIL }],
    subject: `Kayıt Onayı | Küresel Liderlik Zirvesi 2026`,
    text: `Merhaba ${name},\n\nKayıt talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.\n\nGönderdiğiniz bilgiler:\n- Ad Soyad: ${name}\n- E-posta: ${email}\n- Telefon: ${phone || "Belirtilmedi"}\n- Şirket / Ünvan: ${company}\n- Mesaj: ${message}\n\nTeşekkür ederiz.\n`,
    html: buildHtml({ name, email, phone, company, message }, attachments),
  };

  if (attachments.length > 0) {
    mailPayload.attachments = attachments;
  }

  try {
    await sgMail.send(mailPayload);
    return res.status(200).json({ ok: true });
  } catch (error: any) {
    console.error("SendGrid error:", error?.response?.body || error);
    return res.status(500).json({ error: "E-posta gönderilirken bir hata oluştu." });
  }
}
