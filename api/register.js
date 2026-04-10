import sgMail from "@sendgrid/mail";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || "no-reply@etkinlikbilgisayar.com";
const BCC_EMAIL = "info@etkinlikbilgisayar.com";

// Base URL for email assets (should be the deployed site's URL)
const BASE_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:5173";

const buildHtml = (payload) => {
  const { name, email, phone, company, message } = payload;

  return `
    <div style="font-family: Inter, Arial, sans-serif; color: #111827; background: #eff2f7; padding: 24px;">
      <div style="max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 28px; overflow: hidden; box-shadow: 0 24px 80px rgba(15, 23, 42, 0.12);">
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 36px 24px; text-align: center; color: #ffffff;">
          <img src="${BASE_URL}/email-assets/Email-logo-top.jpg" alt="Küresel Liderlik Zirvesi" width="140" style="display: block; margin: 0 auto 20px; max-width: 100%; height: auto;" />
          <h1 style="margin: 0 0 12px; font-size: 28px; line-height: 1.1; letter-spacing: -0.03em;">Kayıt Onayı</h1>
          <p style="margin: 0; color: rgba(255,255,255,0.72); font-size: 15px;">Hilton Istanbul Bosphorus | 15–17 Eylül 2026</p>
        </div>

        <div style="text-align: center; padding: 24px 16px 0;">
          <img src="${BASE_URL}/email-assets/425217-HIB-Animation-Email.gif" alt="Kayıt Onayı" style="width: 100%; max-width: 640px; height: auto; border-radius: 24px;" />
        </div>

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

          <div style="text-align: center; margin: 32px 0 0;">
            <img src="${BASE_URL}/email-assets/Email-body-stars.jpg" alt="Stars" style="max-width: 100%; height: auto; border-radius: 18px;" />
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

export default async function handler(req, res) {
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

  const mailPayload = {
    to: email,
    from: SENDGRID_FROM_EMAIL,
    bcc: [{ email: BCC_EMAIL }],
    subject: `Kayıt Onayı | Küresel Liderlik Zirvesi 2026`,
    text: `Merhaba ${name},\n\nKayıt talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.\n\nGönderdiğiniz bilgiler:\n- Ad Soyad: ${name}\n- E-posta: ${email}\n- Telefon: ${phone || "Belirtilmedi"}\n- Şirket / Ünvan: ${company}\n- Mesaj: ${message}\n\nTeşekkür ederiz.\n`,
    html: buildHtml({ name, email, phone, company, message }),
  };

  try {
    await sgMail.send(mailPayload);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("SendGrid error:", error?.response?.body || error);
    return res.status(500).json({ error: "E-posta gönderilirken bir hata oluştu." });
  }
}
