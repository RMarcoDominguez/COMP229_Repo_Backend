let ContactModel = require('../models/contacts');
const nodemailer = require('nodemailer');

// create transporter if SMTP settings provided via env; otherwise leave null and log emails to console
let mailTransporter = null;
if (process.env.SMTP_HOST) {
  mailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
  });
}

module.exports.getContact = async function (req, res, next) {
  try {
    let contact = await ContactModel.findOne({ _id: req.params.contactId });

    res.json(contact);

  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.create = async function (req, res, next) {
  try {
    let contact = req.body;
    let result = await ContactModel.create(contact);
    console.log(result);

    // Send email notification to site owner with contact details
    try {
      const toAddress = process.env.CONTACT_NOTIFY_EMAIL || 'rmarcodominguez@gmail.com';
      const fullName = contact.firstName || contact.fullname || '';
      const subject = `Website contact from ${fullName || contact.email || 'unknown'}`;
      const bodyLines = [
        `Full name: ${fullName}`,
        `Email: ${contact.email || ''}`,
        `Contact number: ${contact.contactNumber || contact.contact || ''}`,
        `Message:`,
        `${contact.message || ''}`
      ];
      const mailOptions = {
        from: process.env.SMTP_FROM || (process.env.SMTP_USER || 'no-reply@example.com'),
        to: toAddress,
        subject,
        text: bodyLines.join('\n')
      };

      if (mailTransporter) {
        const info = await mailTransporter.sendMail(mailOptions);
        console.log('Contact email sent:', info && info.messageId);
      } else {
        console.log('Mail transporter not configured — contact email content:\n', mailOptions);
      }
    } catch (mailErr) {
      console.error('Failed to send contact email:', mailErr);
      // don't fail the request because of email issues — just continue
    }

    res.status(200);
    res.json({
      success: true,
      message: "Contact created successfully."
    });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      res.status(400).json({
        success: false,
        message: "Duplicate key error: A contact with this email already exists."
      });
    } else {
      console.error('Error creating contact:', error);
      res.status(500).json({
        success: false,
        message: "An error occurred while creating the contact."
      });
    }
  }
}

module.exports.getAll = async function (req, res, next) {
  try {
    let list = await ContactModel.find();

    res.json(list);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.update = async function (req, res, next) {
  try {
    let updatedContact = ContactModel(req.body);
    updatedContact._id = req.params.contactId;
    let result = await ContactModel.updateOne({ _id: req.params.contactId }, updatedContact);
    console.log(result);

    if (result.modifiedCount > 0) {
      res.status(200);
      res.json(
        {
          success: true,
          message: "Contact updated successfully."
        }
      );
    } else {
      throw new Error('Contact not updated. Are you sure it exists?')
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
}


module.exports.remove = async function (req, res, next) {
  try {
    let result = await ContactModel.deleteOne({ _id: req.params.contactId });
    console.log(result);

    if (result.deletedCount > 0) {
      res.status(200);
      res.json(
        {
          success: true,
          message: "Contact deleted successfully."
        }
      );
    } else {
      throw new Error('Contact not deleted. Are you sure it exists?')
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
}


module.exports.removeAll = async function (req, res, next) {
  try {
    let result = await ContactModel.deleteMany();
    console.log(result);

    if (result.deletedCount > 0) {
      res.status(200);
      res.json(
        {
          success: true,
          message: "All contacts were deleted successfully."
        }
      );
    } else {
      throw new Error('Contacts were not deleted')
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
}
