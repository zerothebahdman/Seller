const bcrypt = require("bcryptjs");
const { randomBytes, createHash } = require("crypto");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const AppError = require("../utils/AppErrorClass");
const { Admin } = require("../../models");
const { loginMethod } = require("./FactoryFunctionController");
const sendEmail = require("../mail/AdminEmailVerification");

const jwtToken = (uuid) =>
  jwt.sign({ uuid }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

exports.getAllAdmins = async (req, res, next) => {
  try {
    const admin = await Admin.findAll();
    res.status(200).json({ status: "success", admin });
  } catch (err) {
    return next(new AppError(err.message, err.status || 500));
  }
};

exports.signup = async (req, res, next) => {
  const { name, email, password, shopName, phoneNumber, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 13);
  // send email verification
  const emailToken = randomBytes(7).toString("base64").replaceAll("/", "B");
  const hashedEmailToken = createHash("sha256")
    .update(emailToken)
    .digest("hex");
  console.log({ emailToken, hashedEmailToken });
  try {
    const checkIfUserExistsWithEmail = await Admin.findOne({
      where: { email },
    });
    if (checkIfUserExistsWithEmail)
      return next(
        new AppError(
          `Opps!, this email ${email} is already in use please try again`,
          403
        )
      );

    const admin = await Admin.create({
      name,
      email,
      role,
      password: hashedPassword,
      shop_name: shopName,
      phone_number: phoneNumber,
      email_verification_token: hashedEmailToken,
      email_verification_token_expires_at: Date.now() + 30 * 60 * 1000,
    });

    const verificationUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/admin/verify-email/${emailToken}`;

    sendEmail({
      email: admin.email,
      subject: `[Action Required:] Verify Your BarterPlex Email`,
      verificationUrl,
    });

    const jwttoken = jwtToken(admin.uuid);
    res.status(200).json({
      status: "success",
      message: `We just sent a verification email to ${admin.email}`,
      jwttoken,
      admin,
    });
  } catch (err) {
    return next(new AppError(err.message, err.status || 500));
  }
};

exports.login = loginMethod(Admin);

exports.verifyEmail = async (req, res, next) => {
  try {
    // 1, Check the email has not been tampered
    const hashedEmailToken = createHash("sha256")
      .update(req.params.verificationToken)
      .digest("hex");

    // 2, If the email is valid and the token has not expired verify the email
    const admin = await Admin.findOne({
      where: {
        email_verification_token: { [Op.eq]: hashedEmailToken },
        email_verified_at: { [Op.eq]: null },
        email_verification_token_expires_at: { [Op.gt]: Date.now() },
      },
    });

    if (!admin)
      return next(
        new AppError(`The email verification token has expired`, 401)
      );

    admin.email_verified_at = Date.now();
    admin.email_verification_token = null;
    admin.email_verification_token_expires_at = null;
    await admin.save();

    const token = jwtToken(admin.uuid);

    res.status(201).json({
      status: `success`,
      message: `Your email: ${admin.email} has been verified`,
      token,
    });
  } catch (err) {
    return next(new AppError(err.message, err.status || 500));
  }
};
