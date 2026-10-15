const Joi = require("joi");
const MAILE = process.env.MAILE;
const mailer = require("nodemailer");
const Contact = require("../models/Contact");

const contactsValidator = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    emailPassword: Joi.string().required(),
    phone: Joi.string().allow("", null),
    subject: Joi.string().required(),
    message: Joi.string().required(),
  });
  return schema.validate(data);
};

let sendMassege = async (data = {}) => {
  let getSmtpHost = (email) => {
    if (email.endsWith('@gmail.com')) return 'smtp.gmail.com';
    if (email.endsWith('@outlook.com') || email.endsWith('@hotmail.com')) return 'smtp.office365.com';
    if (email.endsWith('@yahoo.com')) return 'smtp.mail.yahoo.com';
    return process.env.DEFAULT_SMTP_HOST || 'smtp.gmail.com';
  };

  let transporter = mailer.createTransport({
    host: getSmtpHost(data.email),
    port: 465,
    secure: true,
    auth: {
      user: data.email,       
      pass: data.emailPassword, 
    },
  });

  let htmlContent = `
    <h3>התקבלה פנייה חדשה מאת: ${data.fullName}</h3>
    <p><strong>אימייל שולח:</strong> ${data.email}</p>
    <p><strong>טלפון:</strong> ${data.phone || 'לא צוין'}</p>
    <p><strong>נושא:</strong> ${data.subject}</p>
    <p><strong>הודעה:</strong> ${data.message}</p>
  `;

  let info = await transporter.sendMail({
    from: `${data.fullName} <${data.email}>`,
    to: MAILE, 
    subject: data.subject,
    html: htmlContent,
  });

  console.log("Message sent: " + info.messageId);
};

exports.uploadContact = async (req, res) => {
  console.log("REQ.BODY:", req.body);
  try {
    let { value, error } = contactsValidator(req.body);
    
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { firstName, lastName, email, emailPassword, phone, subject, message } = value;
    const fullName = `${firstName} ${lastName}`.trim();

    const newContact = new Contact({
      fullName,
      email,
      phone,
      subject,
      message
    });
    
    await newContact.save();
    await sendMassege({ fullName, email, emailPassword, phone, subject, message });

    return res.status(201).json({ success: true, data: newContact });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
