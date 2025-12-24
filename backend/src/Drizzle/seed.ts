import  db  from "./db"; // your Drizzle DB instance
import { systemUsers, users, elections, positions, candidates, votes } from "./schema";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

async function seed() {
  await db.delete(votes).execute();
  await db.delete(candidates).execute();
  await db.delete(positions).execute();
  await db.delete(elections).execute();
  await db.delete(users).execute();
  await db.delete(systemUsers).execute();

  const systemUsersData = Array.from({ length: 15 }, (_, i) => ({
    systemUserId: uuid(),
    fullName: `System User ${i + 1}`,
    email: `systemuser${i + 1}@example.com`,
    registrationNumber: `REG00${i + 1}`,
    role: i === 0 ? "Admin" : i === 1 ? "ElectoralOfficer" : "Student",
    isActive: true,
    createdAt: new Date()
  }));

  await db.insert(systemUsers).values(systemUsersData).execute();

  const verifiedUsersData = [
    {
      userId: uuid(),
      systemUserId: systemUsersData[0].systemUserId,
      email: systemUsersData[0].email,
      role: "Admin",
      passwordHash: bcrypt.hashSync("AdminPass123!", 10),
      verificationCode: null,
      isVerified: true,
      createdAt: new Date()
    },
    {
      userId: uuid(),
      systemUserId: systemUsersData[1].systemUserId,
      email: systemUsersData[1].email,
      role: "ElectoralOfficer",
      passwordHash: bcrypt.hashSync("OfficerPass123!", 10),
      verificationCode: null,
      isVerified: true,
      createdAt: new Date()
    },
    {
      userId: uuid(),
      systemUserId: systemUsersData[2].systemUserId,
      email: systemUsersData[2].email,
      role: "Student",
      passwordHash: bcrypt.hashSync("StudentPass123!", 10),
      verificationCode: null,
      isVerified: true,
      createdAt: new Date()
    }
  ];

  await db.insert(users).values(verifiedUsersData).execute();

  const electionId = uuid();

  await db.insert(elections).values({
    electionId,
    title: "Student Council Election 2025",
    description: "Annual student council election",
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: "Upcoming",
    createdBy: verifiedUsersData[0].userId,
    createdAt: new Date()
  }).execute();

  const positionsData = [
    { positionId: uuid(), electionId, name: "President", createdAt: new Date() },
    { positionId: uuid(), electionId, name: "Vice President", createdAt: new Date() },
    { positionId: uuid(), electionId, name: "Secretary", createdAt: new Date() },
    { positionId: uuid(), electionId, name: "Treasurer", createdAt: new Date() },
    { positionId: uuid(), electionId, name: "Sports Captain", createdAt: new Date() }
  ];

  await db.insert(positions).values(positionsData).execute();

  const candidatesData = positionsData.flatMap((pos, posIndex) =>
    Array.from({ length: 5 }, (_, i) => ({
      candidateId: uuid(),
      userId: verifiedUsersData[i % 3].userId,
      electionId,
      positionId: pos.positionId,
      faculty: `Faculty ${i + 1}`,
      manifesto: `Manifesto for ${pos.name} Candidate ${i + 1}`,
      createdAt: new Date()
    }))
  );

  await db.insert(candidates).values(candidatesData).execute();

  const votesData = Array.from({ length: 20 }, (_, i) => {
    const voter = verifiedUsersData[i % 3];
    const position = positionsData[i % positionsData.length];
    const candidate = candidatesData[i % candidatesData.length];
    return {
      voteId: uuid(),
      voterId: voter.userId,
      candidateId: candidate.candidateId,
      electionId,
      positionId: position.positionId,
      createdAt: new Date()
    };
  });

  await db.insert(votes).values(votesData).execute();

  console.log("✅ Database seeded successfully!");
}

seed().catch(err => console.error("❌ Seeding failed:", err));
