const nodemailer = require('nodemailer');

let transporter = null;

const getTransporter = async () => {
  if (transporter) return transporter;

  const host = process.env.EMAIL_HOST;
  const port = process.env.EMAIL_PORT || 587;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (user && pass) {
    // Custom configured SMTP server (e.g. Gmail/Mailtrap)
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port == 465, // true for 465, false for other ports
      auth: { user, pass }
    });
    console.log(`Email Service: Configured transporter using environment variables (${user})`);
  } else {
    // Fallback: Create Ethereal test account dynamically
    try {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 587
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass  // generated ethereal password
        }
      });
      console.log('--------------------------------------------------');
      console.log('Email Service: Auto-created Ethereal SMTP test account:');
      console.log(`User: ${testAccount.user}`);
      console.log(`Pass: ${testAccount.pass}`);
      console.log('--------------------------------------------------');
    } catch (err) {
      console.error('Email Service: Failed to configure Ethereal test account:', err);
    }
  }
  return transporter;
};

// Send an email
const sendEmail = async (options) => {
  try {
    const mailTransporter = await getTransporter();
    if (!mailTransporter) {
      console.error('Email Service: Transporter not initialized.');
      return null;
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Task Manager" <no-reply@taskmanager.com>',
      to: options.to,
      subject: options.subject,
      html: options.html
    };

    const info = await mailTransporter.sendMail(mailOptions);
    console.log(`Email Service: Email sent successfully! MessageID: ${info.messageId}`);
    
    // Ethereal mail provides preview link
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`Email Service: Preview sent email at: ${previewUrl}`);
    }
    return info;
  } catch (err) {
    console.error('Email Service: Failed to send email:', err);
    return null;
  }
};

// Welcome email when a user registers
exports.sendWelcomeEmail = async (userEmail, userName) => {
  const subject = 'Welcome to Task Manager!';
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Hello ${userName}, welcome!</h2>
      <p>Thank you for registering at <strong>Task Manager</strong>. We are thrilled to have you onboard!</p>
      <p>With Task Manager, you can easily:</p>
      <ul>
        <li>Organize your projects inside lists and Kanban boards.</li>
        <li>Assign and complete tasks efficiently.</li>
        <li>Analyze progress with clean visual graphs.</li>
      </ul>
      <p style="margin-top: 30px;">If you have any questions, feel free to reply to this email.</p>
      <p style="color: #777; font-size: 12px; margin-top: 40px; border-top: 1px solid #eee; padding-top: 15px;">
        Best regards,<br/>
        <strong>Task Manager Team</strong>
      </p>
    </div>
  `;
  return await sendEmail({ to: userEmail, subject, html });
};

// Task notification email when a task is created/assigned
exports.sendTaskNotificationEmail = async (userEmail, userName, taskTitle, actionType = 'created') => {
  const subject = `Task Manager Alert: Task "${taskTitle}" has been ${actionType}`;
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Hello ${userName},</h2>
      <p>This is a quick notification to let you know that the following task has been <strong>${actionType}</strong> in your project:</p>
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb; margin: 20px 0;">
        <strong style="font-size: 16px; color: #111;">${taskTitle}</strong>
      </div>
      <p>Login to your dashboard to review updates and start collaborating!</p>
      <p style="color: #777; font-size: 12px; margin-top: 40px; border-top: 1px solid #eee; padding-top: 15px;">
        Best regards,<br/>
        <strong>Task Manager Team</strong>
      </p>
    </div>
  `;
  return await sendEmail({ to: userEmail, subject, html });
};
