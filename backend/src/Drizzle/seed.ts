import db from "./db"; // Drizzle DB instance
import { systemUsers, users, elections, positions, candidates } from "./schema";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

function generatePasswordHash(password: string) {
  // Password must have at least 8 chars, uppercase, lowercase, number, special char
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!regex.test(password)) {
    throw new Error(
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
    );
  }
  return bcrypt.hashSync(password, 10);
}

async function seed() {
  // Clear tables
  await db.delete(candidates).execute();
  await db.delete(positions).execute();
  await db.delete(elections).execute();
  await db.delete(users).execute();
  await db.delete(systemUsers).execute();

  // Seed system users
  const systemUsersData = Array.from({ length: 15 }, (_, i) => ({
    systemUserId: uuid(),
    fullName: `System User ${i + 1}`,
    email: `systemuser${i + 1}@example.com`,
    registrationNumber: `REG00${i + 1}`,
    role: i === 0 ? "Admin" : i === 1 ? "ElectoralOfficer" : "Student",
    isActive: true,
    createdAt: new Date(),
  }));

  await db.insert(systemUsers).values(systemUsersData).execute();

  // Seed verified users
  const verifiedUsersData = [
    {
      userId: uuid(),
      systemUserId: systemUsersData[0].systemUserId,
      fullName: systemUsersData[0].fullName,
      registrationNumber: systemUsersData[0].registrationNumber,
      email: systemUsersData[0].email,
      role: "Admin",
      passwordHash: generatePasswordHash("Admin123!"),
      verificationCode: null,
      isVerified: true,
      createdAt: new Date(),
    },
    {
      userId: uuid(),
      systemUserId: systemUsersData[1].systemUserId,
      fullName: systemUsersData[1].fullName,
      registrationNumber: systemUsersData[1].registrationNumber,
      email: systemUsersData[1].email,
      role: "ElectoralOfficer",
      passwordHash: generatePasswordHash("Officer123!"),
      verificationCode: null,
      isVerified: true,
      createdAt: new Date(),
    },
    {
      userId: uuid(),
      systemUserId: systemUsersData[2].systemUserId,
      fullName: systemUsersData[2].fullName,
      registrationNumber: systemUsersData[2].registrationNumber,
      email: systemUsersData[2].email,
      role: "Student",
      passwordHash: generatePasswordHash("Student123!"),
      verificationCode: null,
      isVerified: true,
      createdAt: new Date(),
    },
  ];

  await db.insert(users).values(verifiedUsersData).execute();

  // Seed elections
  const electionId = uuid();
  await db.insert(elections).values({
    electionId,
    title: "Student Council Election 2025",
    description: "Annual student council election",
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: "Upcoming",
    createdBy: verifiedUsersData[0].userId,
    createdAt: new Date(),
  }).execute();

  // Seed positions
  const positionsData = [
    { positionId: uuid(), electionId, name: "President", createdAt: new Date() },
    { positionId: uuid(), electionId, name: "Vice President", createdAt: new Date() },
    { positionId: uuid(), electionId, name: "Secretary", createdAt: new Date() },
    { positionId: uuid(), electionId, name: "Treasurer", createdAt: new Date() },
    { positionId: uuid(), electionId, name: "Sports Captain", createdAt: new Date() },
  ];
  await db.insert(positions).values(positionsData).execute();

  // Seed candidates
  const candidatesData = positionsData.flatMap((pos) =>
    verifiedUsersData.map((user, idx) => ({
      candidateId: uuid(),
      userId: user.userId,
      electionId,
      positionId: pos.positionId,
      faculty: `Faculty ${idx + 1}`,
      manifesto: `Manifesto for ${pos.name} by ${user.fullName}`,
      createdAt: new Date(),
    }))
  );
  await db.insert(candidates).values(candidatesData).execute();

  console.log("✅ Database seeded successfully!");
}

seed().catch((err) => console.error("❌ Seeding failed:", err));
