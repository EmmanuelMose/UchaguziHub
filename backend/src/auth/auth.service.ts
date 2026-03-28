import db from "../Drizzle/db";
import { users, systemUsers } from "../Drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../mailer/mailer";

const JWT_SECRET = process.env.JWT_SECRET!;

const generateCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Register
export const registerService = async (
  fullName: string,
  email: string,
  registrationNumber: string,
  password: string
) => {
  const systemUser = await db.query.systemUsers.findFirst({
    where: eq(systemUsers.email, email),
  });

  if (!systemUser || !systemUser.isActive) {
    throw new Error("You are not authorized to register");
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  const verificationCode = generateCode();
  const passwordHash = await bcrypt.hash(password, 10);

  if (existingUser) {
    if (existingUser.isVerified) {
      throw new Error("User already registered");
    }

    await db.update(users)
      .set({ passwordHash, verificationCode })
      .where(eq(users.userId, existingUser.userId));
  } else {
    await db.insert(users).values({
      systemUserId: systemUser.systemUserId,
      fullName,
      email,
      role: systemUser.role,
      passwordHash,
      verificationCode,
      isVerified: false,
    });
  }

  await sendEmail(
    email,
    "Account Verification",
    `Your verification code is ${verificationCode}`,
    `<h2>Verify Account</h2><p>Code: <b>${verificationCode}</b></p>`
  );
};

// Verify 
export const verifyService = async (email: string, code: string) => {
  const user = await db.query.users.findFirst({ where: eq(users.email, email) });

  if (!user || user.verificationCode !== code) {
    throw new Error("Invalid verification code");
  }

  await db.update(users)
    .set({ isVerified: true, verificationCode: null })
    .where(eq(users.userId, user.userId));
};

// Login 
export const loginService = async (email: string, password: string) => {
  const user = await db.query.users.findFirst({ where: eq(users.email, email) });

  if (!user) throw new Error("User not registered");
  if (!user.isVerified) throw new Error("Account not verified");

  const match = await bcrypt.compare(password.trim(), user.passwordHash);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { userId: user.userId, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    role: user.role,
    userId: user.userId,
    email: user.email
  };
};

// Forgot Password
export const forgotPasswordService = async (email: string) => {
  const user = await db.query.users.findFirst({ where: eq(users.email, email) });

  if (!user || !user.isVerified) {
    throw new Error("User not found or not verified");
  }

  const resetCode = generateCode();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  await db.update(users)
    .set({ resetCode, resetCodeExpiresAt: expiresAt })
    .where(eq(users.userId, user.userId));

  await sendEmail(
    email,
    "Password Reset",
    `Reset code: ${resetCode}`,
    `<h2>Password Reset</h2><p>Code: <b>${resetCode}</b></p>`
  );
};

//  Verify Reset Code 
export const verifyResetCodeService = async (email: string, code: string) => {
  const user = await db.query.users.findFirst({ where: eq(users.email, email) });

  if (
    !user ||
    user.resetCode !== code ||
    !user.resetCodeExpiresAt ||
    new Date() > new Date(user.resetCodeExpiresAt)
  ) {
    throw new Error("Invalid or expired code");
  }
};

// Reset Password 
export const resetPasswordService = async (email: string, password: string) => {
  if (!email) throw new Error("Email is required");

  const user = await db.query.users.findFirst({ where: eq(users.email, email) });
  if (!user) throw new Error("User not found");

  const passwordHash = await bcrypt.hash(password.trim(), 10);

  await db.update(users)
    .set({
      passwordHash,
      resetCode: null,
      resetCodeExpiresAt: null,
    })
    .where(eq(users.userId, user.userId));

  console.log(`Password updated successfully for userId=${user.userId}`);
};
