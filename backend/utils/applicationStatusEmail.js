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

const escapeHtml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const createTransporter = () => {
    const config = getSmtpConfiguration();
    const { host, port, user, password, from, secure, presence } = config;

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

const buildMessage = (application) => {
    const approved = application.status === 'Accepted';
    const status = approved ? 'Approved' : 'Rejected';
    const name = application.name;
    const clubName = application.clubName;
    const teamName = application.teamName;
    const action = approved ? 'has been approved' : 'was not selected';
    const subject = `Your ${clubName} application has been ${status.toLowerCase()}`;
    const text = [
        `Hi ${name},`,
        '',
        `Application status: ${status}.`,
        `Your application to ${teamName} in ${clubName} has been ${status.toLowerCase()}.`,
        '',
        approved
            ? 'We are excited about your interest and look forward to welcoming you.'
            : 'Thank you for taking the time to apply. We appreciate your interest and encourage you to stay involved.',
        '',
        'Best,',
        `${clubName} Team`
    ].join('\n');
    const html = `
        <div style="font-family: Arial, sans-serif; color: #243047; line-height: 1.6; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2457a7;">Application update</h2>
            <p>Hi ${escapeHtml(name)},</p>
            <p><strong>Status:</strong> ${status}</p>
            <p>Your application to <strong>${escapeHtml(teamName)}</strong> in
            <strong>${escapeHtml(clubName)}</strong> ${action}.</p>
            <p>${approved
                ? 'We are excited about your interest and look forward to welcoming you.'
                : 'Thank you for taking the time to apply. We appreciate your interest and encourage you to stay involved.'}</p>
            <p>Best,<br>${escapeHtml(clubName)} Team</p>
        </div>`;

    return { subject, text, html };
};

const getSafeErrorDetails = (error) => ({
    name: error.name || 'Error',
    code: error.code || null,
    responseCode: Number.isInteger(error.responseCode) ? error.responseCode : null,
    command: error.command || null,
    originalCode: error.originalCode || null,
    errors: error instanceof AggregateError && Array.isArray(error.errors)
        ? error.errors.map((innerError) => ({
            code: innerError && innerError.code || null,
            syscall: innerError && innerError.syscall || null,
            address: innerError && innerError.address || null,
            port: innerError && innerError.port || null,
            hostname: innerError && innerError.hostname || null
        }))
        : []
});

const sendApplicationStatusEmail = async (application) => {
    const status = application && application.status;
    const recipient = application && typeof application.email === 'string'
        ? application.email.trim()
        : '';
    const recipientIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient);
    const smtpConfig = getSmtpConfiguration();

    console.info('[application-status-email] Notification function reached.', {
        status: status || 'unknown',
        recipientPresent: Boolean(recipient),
        recipientLooksValid: recipientIsValid
    });
    console.info('[application-status-email] SMTP configuration presence.', smtpConfig.presence);

    if (!['Accepted', 'Rejected'].includes(status)) {
        console.info('[application-status-email] Skipped: status is not final.');
        return;
    }
    try {
        if (!recipientIsValid) {
            throw new Error('Application does not have a valid recipient email address.');
        }

        const transporter = createTransporter();
        const message = buildMessage(application);
        const result = await transporter.sendMail({
            from: smtpConfig.from,
            to: recipient,
            ...message
        });
        const acceptedCount = Array.isArray(result.accepted) ? result.accepted.length : 0;
        const rejectedCount = Array.isArray(result.rejected) ? result.rejected.length : 0;
        if (acceptedCount === 0 || rejectedCount > 0) {
            console.error('[application-status-email] Nodemailer did not accept all recipients.', {
                acceptedCount,
                rejectedCount
            });
            throw new Error('SMTP server did not accept the recipient.');
        }

        console.info('[application-status-email] Nodemailer reported success.', {
            messageId: result.messageId || null,
            acceptedCount,
            rejectedCount
        });
        return result;
    } catch (error) {
        console.error(
            '[application-status-email] Nodemailer reported failure.',
            getSafeErrorDetails(error)
        );
        throw error;
    }
};

module.exports = sendApplicationStatusEmail;
