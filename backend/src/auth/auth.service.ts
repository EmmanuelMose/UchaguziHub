import db from "../Drizzle/db";
import { users, systemUsers } from "../Drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../mailer/mailer";

const JWT_SECRET = process.env.JWT_SECRET!;

const generateCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code

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
    } else {
      // Update password and resend code
      await db.update(users)
        .set({ passwordHash, verificationCode })
        .where(eq(users.userId, existingUser.userId));

      await sendEmail(
        email,
        "Account Verification - VoteSecure",
        `Your new verification code is ${verificationCode}`,
        `<h2>Account Verification</h2><p>Your verification code is: <b>${verificationCode}</b></p>`
      );

      return true;
    }
  }

  // Insert new user
  await db.insert(users).values({
    systemUserId: systemUser.systemUserId,
    fullName,
    email,
    role: systemUser.role,
    passwordHash,
    verificationCode,
    isVerified: false,
  });

  await sendEmail(
    email,
    "Account Verification - VoteSecure",
    `Your verification code is ${verificationCode}`,
    `<h2>Account Verification</h2><p>Your verification code is: <b>${verificationCode}</b></p>`
  );

  return true;
};

export const verifyService = async (email: string, code: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user || user.verificationCode !== code) {
    throw new Error("Invalid verification code");
  }

  await db.update(users)
    .set({ isVerified: true, verificationCode: null })
    .where(eq(users.userId, user.userId));

  return true;
};

export const loginService = async (email: string, password: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) throw new Error("User not registered");
  if (!user.isVerified) throw new Error("Account not verified");

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { userId: user.userId, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, role: user.role };
};
