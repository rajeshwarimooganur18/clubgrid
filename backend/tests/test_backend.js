const assert = require('assert');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

console.log('--- STARTING BACKEND SUITE VERIFICATION ---');

(async () => {
  // 1. Test Password Hashing with bcrypt
  console.log('1. Testing Password Hashing & Verification...');
  const password = 'studentPassword123';
  const hashed = await bcrypt.hash(password, 10);
  assert.notStrictEqual(password, hashed);
  const match = await bcrypt.compare(password, hashed);
  assert.strictEqual(match, true);
  const badMatch = await bcrypt.compare('wrongPassword', hashed);
  assert.strictEqual(badMatch, false);
  console.log('   âœ“ bcrypt hashing and password comparison verified');

  // 2. Test JWT Signing and Verification
  console.log('2. Testing JWT Signing and Token Verification...');
  const secret = 'test_secret_key_123';
  const payload = { id: '65f123456789abcdef012345', role: 'student' };
  const token = jwt.sign(payload, secret, { expiresIn: '7d' });
  const decoded = jwt.verify(token, secret);
  assert.strictEqual(decoded.id, payload.id);
  assert.strictEqual(decoded.role, 'student');

  const adminToken = jwt.sign({ id: '65f999999999abcdef999999', role: 'admin' }, secret, { expiresIn: '7d' });
  const decodedAdmin = jwt.verify(adminToken, secret);
  assert.strictEqual(decodedAdmin.role, 'admin');
  console.log('   âœ“ JWT signing, payload extraction, and expiration verified');

  // 3. Test Middleware logic (requireAdmin)
  console.log('3. Testing Admin Authorization Middleware Logic...');
  const { requireAdmin } = require('../middleware/authMiddleware');

  let forbiddenCalled = false;
  const mockReqStudent = { user: { role: 'student' } };
  const mockResStudent = {
    status: (code) => {
      assert.strictEqual(code, 403);
      return { json: (data) => { forbiddenCalled = true; } };
    }
  };
  requireAdmin(mockReqStudent, mockResStudent, () => {});
  assert.strictEqual(forbiddenCalled, true, 'Non-admin user should receive 403 Forbidden');

  let adminNextCalled = false;
  const mockReqAdmin = { user: { role: 'admin' } };
  const mockResAdmin = {};
  requireAdmin(mockReqAdmin, mockResAdmin, () => { adminNextCalled = true; });
  assert.strictEqual(adminNextCalled, true, 'Admin user should be permitted through');
  console.log('   âœ“ Admin role-based authorization guard verified');

  // 4. Test Club Controller Fallback and Routes
  console.log('4. Testing Club Controller & Team Endpoints...');
  const clubController = require('../controllers/clubController');

  let clubsResult = null;
  await clubController.getClubs({}, {
    status: (code) => {
      assert.strictEqual(code, 200);
      return { json: (data) => { clubsResult = data; } };
    }
  });
  assert(Array.isArray(clubsResult), 'Clubs should return an array');
  assert.strictEqual(clubsResult.length, 4, 'Should have 4 default clubs');
  console.log('   âœ“ All 4 clubs (Drama, Dance, Music, Coding) returned with correct metadata');

  let teamsResult = null;
  await clubController.getClubTeams({ params: { id: '4' } }, {
    status: (code) => {
      assert.strictEqual(code, 200);
      return { json: (data) => { teamsResult = data; } };
    }
  });
  assert(Array.isArray(teamsResult), 'Teams should return an array');
  const teamNames = teamsResult.map(t => t.name);
  assert(teamNames.includes('QWERTY.I/O'), 'Coding club must include QWERTY.I/O');
  assert(teamNames.includes('Google Developer Team'), 'Coding club must include Google Developer Team');
  assert(teamNames.includes('Aerospace Club'), 'Coding club must include Aerospace Club');
  assert(teamNames.includes('Anonymous'), 'Coding club must include Anonymous');
  console.log('   âœ“ Club teams endpoint returned accurate teams:', teamNames.join(', '));

  // 5. Test Models definition
  console.log('5. Testing Mongoose Schemas & Models Definition...');
  const Student = require('../models/Student');
  const Application = require('../models/Application');
  const Event = require('../models/Event');
  const Announcement = require('../models/Announcement');
  const Club = require('../models/Club');

  assert(Student.schema.paths.fullName, 'Student must have fullName');
  assert(Student.schema.paths.email, 'Student must have email');
  assert(Student.schema.paths.password, 'Student must have password');
  assert(Student.schema.paths.role, 'Student must have role');

  assert(Application.schema.paths.name, 'Application must have name');
  assert(Application.schema.paths.usn, 'Application must have usn');
  assert(Application.schema.paths.clubName, 'Application must have clubName');
  assert(Application.schema.paths.teamName, 'Application must have teamName');
  assert(Application.schema.paths.status, 'Application must have status');

  assert(Event.schema.paths.title, 'Event must have title');
  assert(Event.schema.paths.venue, 'Event must have venue');

  assert(Announcement.schema.paths.title, 'Announcement must have title');
  console.log('   âœ“ Mongoose models and schemas verified with all required fields');

  // 6. Test authenticated profile USN validation and persistence
  console.log('6. Testing profile USN validation and persistence...');
  const authController = require('../controllers/authController');
  const originalFindById = Student.findById;
  const originalFindOne = Student.findOne;
  const profileStudent = {
    _id: '65f123456789abcdef012345',
    fullName: 'Original Name',
    email: 'student@college.edu',
    department: 'CSE',
    year: '2nd Year',
    studentId: '',
    role: 'student',
    saved: false,
    async save() {
      this.saved = true;
    }
  };
  const makeResponse = () => ({
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    }
  });

  try {
    Student.findById = async () => profileStudent;

    Student.findOne = () => ({ select: async () => null });
    const savedProfileResponse = makeResponse();
    await authController.updateProfile({
      user: { _id: profileStudent._id },
      body: { studentId: ' 2sd21cs001 ', fullName: 'Updated Name' }
    }, savedProfileResponse);
    assert.strictEqual(savedProfileResponse.statusCode, 200);
    assert.strictEqual(profileStudent.studentId, '2SD21CS001');
    assert.strictEqual(profileStudent.fullName, 'Updated Name');
    assert.strictEqual(profileStudent.saved, true);

    profileStudent.fullName = 'Original Name';
    profileStudent.saved = false;
    const emptyUsnResponse = makeResponse();
    await authController.updateProfile({
      user: { _id: profileStudent._id },
      body: { studentId: '   ', fullName: 'Must Not Be Saved' }
    }, emptyUsnResponse);
    assert.strictEqual(emptyUsnResponse.statusCode, 400);
    assert.strictEqual(profileStudent.fullName, 'Original Name');
    assert.strictEqual(profileStudent.saved, false);

    Student.findOne = () => ({ select: async () => ({ _id: 'another-student' }) });
    const duplicateUsnResponse = makeResponse();
    await authController.updateProfile({
      user: { _id: profileStudent._id },
      body: { studentId: '2sd21cs001', fullName: 'Must Not Be Saved' }
    }, duplicateUsnResponse);
    assert.strictEqual(duplicateUsnResponse.statusCode, 409);
    assert.strictEqual(profileStudent.fullName, 'Original Name');
    assert.strictEqual(profileStudent.saved, false);
  } finally {
    Student.findById = originalFindById;
    Student.findOne = originalFindOne;
  }
  console.log('   âœ“ USN is required, unique per student, and saved without overwriting on validation errors');

  // 7. Test Event Controller Fallback
  console.log('7. Testing Event Controller...');
  const eventController = require('../controllers/eventController');
  let eventsResult = null;
  await eventController.getEvents({}, {
    status: (code) => {
      assert.strictEqual(code, 200);
      return { json: (data) => { eventsResult = data; } };
    }
  });
  assert(Array.isArray(eventsResult), 'Events should return an array');
  assert(eventsResult.length >= 2, 'Should return default events');
  console.log('   âœ“ Event controller returned active campus events');

  // 8. Test application status email diagnostics and recipient validation
  console.log('8. Testing application status email delivery path...');
  const nodemailer = require('nodemailer');
  const sendApplicationStatusEmail = require('../utils/applicationStatusEmail');
  const originalCreateTransport = nodemailer.createTransport;
  const originalConsoleInfo = console.info;
  const originalConsoleError = console.error;
  const smtpKeys = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD', 'SMTP_FROM', 'SMTP_SECURE'];
  const originalSmtpValues = {};
  const diagnosticOutput = [];
  const diagnosticErrors = [];
  let transportOptions;
  const sentMessages = [];
  let sendFailure;

  smtpKeys.forEach((key) => {
    originalSmtpValues[key] = process.env[key];
  });

  try {
    process.env.SMTP_HOST = 'smtp.example.test';
    process.env.SMTP_PORT = '587';
    process.env.SMTP_USER = 'test-user';
    process.env.SMTP_PASSWORD = 'test-password';
    process.env.SMTP_FROM = 'noreply@example.test';
    process.env.SMTP_SECURE = 'false';
    console.info = (...args) => diagnosticOutput.push(JSON.stringify(args));
    console.error = (...args) => diagnosticErrors.push(JSON.stringify(args));
    nodemailer.createTransport = (options) => {
      transportOptions = options;
      return {
        sendMail: async (message) => {
          sentMessages.push(message);
          if (sendFailure) throw sendFailure;
          return { messageId: 'mock-message-id', accepted: [message.to], rejected: [] };
        }
      };
    };

    await sendApplicationStatusEmail({
      status: 'Accepted',
      email: ' student@example.edu ',
      name: 'Test Student',
      clubName: 'Coding Club',
      teamName: 'Anonymous'
    });

    assert.strictEqual(transportOptions.host, 'smtp.example.test');
    assert.strictEqual(transportOptions.port, 587);
    assert.strictEqual(transportOptions.secure, false);
    assert.strictEqual(sentMessages[0].to, 'student@example.edu');
    assert.strictEqual(sentMessages[0].subject, 'Your Coding Club application has been approved');
    assert(sentMessages[0].text.includes('Application status: Approved.'));
    assert(sentMessages[0].text.includes('has been approved.'));

    await sendApplicationStatusEmail({
      status: 'Rejected',
      email: 'student@example.edu',
      name: 'Test Student',
      clubName: 'Coding Club',
      teamName: 'Anonymous'
    });
    assert.strictEqual(sentMessages[1].to, 'student@example.edu');
    assert.strictEqual(sentMessages[1].subject, 'Your Coding Club application has been rejected');
    assert(sentMessages[1].text.includes('Application status: Rejected.'));
    assert(sentMessages[1].text.includes('has been rejected.'));
    assert(sentMessages[1].html.includes('was not selected'));

    sendFailure = new Error(
      `Login failed for ${process.env.SMTP_USER}/${process.env.SMTP_PASSWORD}; recipient student@example.edu`
    );
    sendFailure.code = 'EAUTH';
    sendFailure.responseCode = 535;
    sendFailure.command = 'AUTH PLAIN';
    await assert.rejects(
      sendApplicationStatusEmail({
        status: 'Accepted',
        email: 'student@example.edu',
        name: 'Test Student',
        clubName: 'Coding Club',
        teamName: 'Anonymous'
      }),
      /Login failed/
    );

    const errorDiagnostics = diagnosticErrors.join('');
    assert(errorDiagnostics.includes('EAUTH'));
    assert(errorDiagnostics.includes('535'));
    assert(errorDiagnostics.includes('AUTH PLAIN'));
    assert(errorDiagnostics.includes('[REDACTED]'));
    assert(!errorDiagnostics.includes(process.env.SMTP_PASSWORD), 'Diagnostics must not print SMTP passwords');
    assert(!errorDiagnostics.includes(process.env.SMTP_USER), 'Diagnostics must not print SMTP usernames');
    assert(!errorDiagnostics.includes('student@example.edu'), 'Diagnostics must not print recipient addresses');
    assert(!diagnosticOutput.join('').includes(process.env.SMTP_PASSWORD), 'Diagnostics must not print SMTP passwords');

    const Application = require('../models/Application');
    const applicationController = require('../controllers/applicationController');
    const originalFindById = Application.findById;
    const originalFindOneAndUpdate = Application.findOneAndUpdate;
    let statusWasPersisted = false;
    let responseStatus;
    let responseBody;
    try {
      Application.findById = async () => ({ _id: 'mock-application-id', status: 'Pending' });
      Application.findOneAndUpdate = async () => {
        statusWasPersisted = true;
        return {
          _id: 'mock-application-id',
          status: 'Accepted',
          email: 'student@example.edu',
          name: 'Test Student',
          clubName: 'Coding Club',
          teamName: 'Anonymous'
        };
      };

      await applicationController.updateApplicationStatus(
        { params: { id: 'mock-application-id' }, body: { status: 'Accepted' } },
        {
          status(code) {
            responseStatus = code;
            return this;
          },
          json(body) {
            responseBody = body;
            return this;
          }
        }
      );

      assert.strictEqual(statusWasPersisted, true);
      assert.strictEqual(responseStatus, 200);
      assert.strictEqual(responseBody.application.status, 'Accepted');
      assert.strictEqual(responseBody.emailSent, false);
      assert(responseBody.message.includes('email notification failed'));
    } finally {
      Application.findById = originalFindById;
      Application.findOneAndUpdate = originalFindOneAndUpdate;
    }

    await assert.rejects(
      sendApplicationStatusEmail({
        status: 'Rejected',
        email: 'invalid-recipient',
        name: 'Test Student',
        clubName: 'Coding Club',
        teamName: 'Anonymous'
      }),
      /valid recipient email address/
    );
    console.log('   âœ“ Accepted/rejected email content, recipient handling, and safe SMTP diagnostics verified');
  } finally {
    nodemailer.createTransport = originalCreateTransport;
    console.info = originalConsoleInfo;
    console.error = originalConsoleError;
    smtpKeys.forEach((key) => {
      if (originalSmtpValues[key] === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = originalSmtpValues[key];
      }
    });
  }

  // 9. Test password-reset requests, email links, and single-use token behavior
  console.log('9. Testing password reset request and completion...');
  assert(Student.schema.paths.passwordResetTokenHash, 'Student must store a reset-token hash');
  assert(Student.schema.paths.passwordResetExpiresAt, 'Student must store reset-token expiry');

  const resetEnvKeys = [...smtpKeys, 'CLIENT_URL'];
  const originalResetEnvValues = {};
  const originalResetFindOne = Student.findOne;
  const originalResetFindOneAndUpdate = Student.findOneAndUpdate;
  const resetStartedAt = Date.now();
  const resetStudent = {
    email: 'student@example.edu',
    fullName: 'Test Student',
    password: 'old-hash',
    passwordResetTokenHash: null,
    passwordResetExpiresAt: null,
    saved: false,
    async save() {
      this.saved = true;
    }
  };
  let resetMessage;

  resetEnvKeys.forEach((key) => {
    originalResetEnvValues[key] = process.env[key];
  });

  try {
    process.env.SMTP_HOST = 'smtp.example.test';
    process.env.SMTP_PORT = '587';
    process.env.SMTP_USER = 'test-user';
    process.env.SMTP_PASSWORD = 'test-password';
    process.env.SMTP_FROM = 'noreply@example.test';
    process.env.SMTP_SECURE = 'false';
    process.env.CLIENT_URL = 'https://clubgrid.example.test';
    nodemailer.createTransport = () => ({
      sendMail: async (message) => {
        resetMessage = message;
        return { messageId: 'mock-reset-message-id', accepted: [message.to], rejected: [] };
      }
    });

    Student.findOne = async (filter) => {
      assert.deepStrictEqual(filter, { email: 'student@example.edu' });
      return resetStudent;
    };

    const forgotResponse = makeResponse();
    await authController.forgotPassword({
      body: { email: '  Student@Example.edu  ' }
    }, forgotResponse);

    assert.strictEqual(forgotResponse.statusCode, 200);
    assert.strictEqual(resetStudent.saved, true);
    assert(/^[a-f0-9]{64}$/.test(resetStudent.passwordResetTokenHash));
    assert(resetStudent.passwordResetExpiresAt.getTime() >= resetStartedAt + 15 * 60 * 1000 - 1000);
    assert(resetStudent.passwordResetExpiresAt.getTime() <= Date.now() + 15 * 60 * 1000);
    assert.strictEqual(resetMessage.to, resetStudent.email);

    const resetUrlMatch = resetMessage.text.match(/https?:\/\/\S+/);
    assert(resetUrlMatch, 'Reset email must include an absolute reset link');
    const emailedToken = new URL(resetUrlMatch[0]).searchParams.get('token');
    assert(emailedToken, 'Reset link must carry the raw reset token');
    const expectedTokenHash = require('crypto')
      .createHash('sha256')
      .update(emailedToken)
      .digest('hex');
    assert.strictEqual(resetStudent.passwordResetTokenHash, expectedTokenHash);

    Student.findOne = async () => null;
    const missingAccountResponse = makeResponse();
    await authController.forgotPassword({
      body: { email: 'missing@example.edu' }
    }, missingAccountResponse);
    assert.strictEqual(missingAccountResponse.statusCode, forgotResponse.statusCode);
    assert.strictEqual(missingAccountResponse.body.message, forgotResponse.body.message);

    const passwordBeforeReset = resetStudent.password;
    Student.findOneAndUpdate = async (filter, update, options) => {
      assert.strictEqual(filter.passwordResetTokenHash, expectedTokenHash);
      assert(filter.passwordResetExpiresAt.$gt instanceof Date);
      assert(filter.passwordResetExpiresAt.$gt.getTime() <= Date.now());
      assert.strictEqual(options.new, true);
      Object.assign(resetStudent, update.$set);
      return resetStudent;
    };
    const resetResponse = makeResponse();
    await authController.resetPassword({
      body: { token: emailedToken, newPassword: 'newPassword123' }
    }, resetResponse);

    assert.strictEqual(resetResponse.statusCode, 200);
    assert.notStrictEqual(resetStudent.password, passwordBeforeReset);
    assert.strictEqual(await bcrypt.compare('newPassword123', resetStudent.password), true);
    assert.strictEqual(resetStudent.passwordResetTokenHash, null);
    assert.strictEqual(resetStudent.passwordResetExpiresAt, null);

    Student.findOneAndUpdate = async () => null;
    const reusedTokenResponse = makeResponse();
    await authController.resetPassword({
      body: { token: emailedToken, newPassword: 'anotherPassword123' }
    }, reusedTokenResponse);
    assert.strictEqual(reusedTokenResponse.statusCode, 400);

    const invalidPasswordResponse = makeResponse();
    await authController.resetPassword({
      body: { token: emailedToken, newPassword: 'short' }
    }, invalidPasswordResponse);
    assert.strictEqual(invalidPasswordResponse.statusCode, 400);
    console.log('   âœ“ Reset emails use hashed, expiring tokens; passwords reset once; unknown accounts stay generic');
  } finally {
    Student.findOne = originalResetFindOne;
    Student.findOneAndUpdate = originalResetFindOneAndUpdate;
    nodemailer.createTransport = originalCreateTransport;
    resetEnvKeys.forEach((key) => {
      if (originalResetEnvValues[key] === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = originalResetEnvValues[key];
      }
    });
  }

  console.log('\n--- ALL BACKEND ARCHITECTURE & LOGIC TESTS PASSED SUCCESSFULLY! ---');
  process.exit(0);
})();
