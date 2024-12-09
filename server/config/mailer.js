const nodemailer = require('nodemailer');
const logger = require('./logger');
const schedule = require('node-schedule');
const MailLog = require('../models/MailLog');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendMail = async (options, retryCount = 0) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
        });

        logger.info(`Email sent successfully to ${options.to}`);
        await MailLog.create({ to: options.to, subject: options.subject, status: 'Sent', attempts: retryCount + 1 });
    } catch (error) {
        logger.error(`Failed to send email to ${options.to}: ${error.message}`);
        await MailLog.create({ to: options.to, subject: options.subject, status: 'Failed', attempts: retryCount + 1, error: error.message });

        if (retryCount < 3) {
            logger.info(`Retrying email to ${options.to} (Attempt ${retryCount + 1})`);
            schedule.scheduleJob(Date.now() + 5 * 60 * 1000, async () => {
                await sendMail(options, retryCount + 1);
            });
        } else {
            logger.error(`Max retries reached for ${options.to}`);
            throw new Error('Email sending failed after retries');
        }
    }
};


module.exports = sendMail;
