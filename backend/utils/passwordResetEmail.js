const nodemailer = require('nodemailer');

const getSmtpConfiguration = () => {
    const port = Number(process.env.SMTP_PORT);
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const password = process.env.SMTP_PASSWORD;
    const from = process.env.SMTP_FROM;

    return {
        host,
        port,
        user,
        password,
        from,
        secure: process.env.SMTP_SECURE === 'true',
        presence: {
            host: Boolean(host && host.trim()),
            port: Number.isInteger(port) && port > 0 && port <= 65535,
            user: Boolean(user && user.trim()),
            password: Boolean(password && password.trim()),
            from: Boolean(from && from.trim())
        }
    };
};

const createTransporter = (config) => {
    const { host, port, user, password, secure, presence } = config;

    if (!presence.host || !presence.port || !presence.user ||
        !presence.password || !presence.from) {
        throw new Error('SMTP configuration is incomplete or invalid.');
    }

    return nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass: password }
    });
};

const escapeHtml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const createResetUrl = (token) => {
    const clientUrl = process.env.CLIENT_URL;
    if (!clientUrl || !clientUrl.trim()) {
        throw new Error('CLIENT_URL is not configured.');
    }

    let baseUrl;
    try {
        baseUrl = new URL(clientUrl);
    } catch (error) {
        throw new Error('CLIENT_URL is invalid.');
    }

    if (!['http:', 'https:'].includes(baseUrl.protocol)) {
        throw new Error('CLIENT_URL must use HTTP or HTTPS.');
    }

    const resetUrl = new URL('/reset-password', baseUrl);
    resetUrl.searchParams.set('token', token);
    return resetUrl.toString();
};

const sendPasswordResetEmail = async (student, token) => {
    const recipient = student && typeof student.email === 'string'
        ? student.email.trim()
        : '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) {
        throw new Error('Account does not have a valid recipient email address.');
    }

    const config = getSmtpConfiguration();
    const resetUrl = createResetUrl(token);
    const transporter = createTransporter(config);
    const name = student.fullName || 'there';
    const text = [
        `Hello ${name},`,
        '',
        'We received a request to reset your CLUB-GRID password.',
        `Use this link within 15 minutes to choose a new password: ${resetUrl}`,
        '',
        'If you did not request a password reset, you can ignore this email.'
    ].join('\n');
    const html = `
        <div style="font-family: Arial, sans-serif; color: #243047; line-height: 1.6; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2457a7;">Reset your CLUB-GRID password</h2>
            <p>Hello ${escapeHtml(name)},</p>
            <p>We received a request to reset your CLUB-GRID password.</p>
            <p><a href="${escapeHtml(resetUrl)}">Reset your password</a></p>
            <p>This link expires in 15 minutes. If you did not request a reset,
            you can ignore this email.</p>
        </div>`;

    const result = await transporter.sendMail({
        from: config.from,
        to: recipient,
        subject: 'Reset your CLUB-GRID password',
        text,
        html
    });
    const acceptedCount = Array.isArray(result.accepted) ? result.accepted.length : 0;
    const rejectedCount = Array.isArray(result.rejected) ? result.rejected.length : 0;
    if (acceptedCount === 0 || rejectedCount > 0) {
        throw new Error('SMTP server did not accept the password reset email.');
    }

    return result;
};

module.exports = sendPasswordResetEmail;
