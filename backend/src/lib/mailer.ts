import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

const smtpOptions: SMTPTransport.Options = {
  host: process.env['SMTP_HOST'],
  port: Number(process.env['SMTP_PORT'] ?? 587),
  secure: false,
  auth: {
    user: process.env['SMTP_USER'],
    pass: process.env['SMTP_PASS'],
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
};

// family:4 forces IPv4 — Railway's IPv6 path to smtp.gmail.com is unreachable (ENETUNREACH)
export const transporter = nodemailer.createTransport({
  ...smtpOptions,
  family: 4,
} as SMTPTransport.Options);
