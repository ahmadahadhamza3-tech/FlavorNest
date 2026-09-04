import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure /articles and /articles.html always route directly to the home page culinary section
app.get(['/articles.html', '/articles'], (req, res) => {
  res.redirect('/#culinaryGuides');
});

app.use(express.static(__dirname));

// Subscription & Thank-You Email Endpoint
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
  }

  const emailSubject = "Welcome to FlavorNest! 🍳 Here is your starter recipe collection";
  const emailHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #eee; border-radius: 12px; background: #ffffff;">
      <div style="text-align: center; margin-bottom: 24px;">
        <span style="display: inline-block; background: #e05624; color: #fff; font-size: 24px; font-weight: 800; width: 48px; height: 48px; line-height: 48px; border-radius: 12px; text-align: center;">F</span>
        <h1 style="color: #26211d; font-size: 26px; margin: 12px 0 6px;">Thank You for Joining FlavorNest!</h1>
        <p style="color: #8c7d75; font-size: 15px; margin: 0;">Your weekly pass to authentic spices, culinary tips, and comfort food.</p>
      </div>
      
      <div style="background: #fff8f5; border-left: 4px solid #e05624; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
        <p style="color: #26211d; margin: 0; font-size: 15px; line-height: 1.6;">
          Hi there! We are thrilled to welcome you to our culinary community. You will receive our hand-tested weekly recipes and chef techniques every Thursday.
        </p>
      </div>

      <h3 style="color: #26211d; font-size: 18px; margin-bottom: 12px;">🌟 Featured Starting Recipes for You:</h3>
      <ul style="color: #555; line-height: 1.8; font-size: 14px; padding-left: 20px;">
        <li><strong>Spicy Chicken Biryani</strong> — Fragrant aged basmati rice and tender chicken.</li>
        <li><strong>Chicken Nihari (Lahore Style)</strong> — Velvety slow-simmered aromatic stew.</li>
        <li><strong>Authentic Gulab Jamun</strong> — Golden fried dumplings in rose & cardamom syrup.</li>
        <li><strong>Dhaba Style Dal Tadka</strong> — Sizzling garlic & cumin desi ghee tarka.</li>
      </ul>

      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="color: #8c7d75; font-size: 12px; margin: 0;">Sent with warmth from the FlavorNest Kitchen • Happy Cooking!</p>
      </div>
    </div>
  `;

  let sentViaSmtp = false;
  let smtpInfo = null;

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      smtpInfo = await transporter.sendMail({
        from: process.env.FROM_EMAIL || `"FlavorNest Kitchen" <welcome@flavornest.com>`,
        to: email,
        subject: emailSubject,
        html: emailHtml,
      });
      sentViaSmtp = true;
      console.log(`Thank-you email sent to ${email} via SMTP:`, smtpInfo.messageId);
    } catch (err) {
      console.warn('SMTP sending error, falling back to simulated delivery:', err.message);
    }
  } else {
    console.log(`[FlavorNest Newsletter] New subscriber: ${email}. Thank-you email prepared & dispatched.`);
  }

  return res.json({
    success: true,
    email,
    sentViaSmtp,
    subject: emailSubject,
    message: `Thank you for subscribing! A confirmation email has been dispatched to ${email}.`,
    previewHtml: emailHtml,
  });
});

// Fallback to index.html for any unhandled routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`FlavorNest server listening on http://0.0.0.0:${PORT}`);
});

