import db from "./db";
import {
  systemUsers,
  users,
  elections,
  positions,
  candidates,
  votes,
  complaints,
} from "./schema";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

function generatePasswordHash(password: string) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!regex.test(password)) {
    throw new Error("Weak password");
  }
  return bcrypt.hashSync(password, 10);
}

const firstNames = [
  "John","Jane","Alex","Emily","Michael","Sarah","David","Olivia","Daniel","Sophia",
  "Brian","Grace","Kevin","Linda","Peter","Nancy","Samuel","Diana","Joseph","Angela",
  "Mark","Ruth","Paul","Esther","James","Rebecca","Andrew","Joy","Stephen","Faith",
  "Robert","Lucy","Eric","Hannah","Chris","Mercy","Victor","Irene","Dennis","Carol",
  "Martin","Sharon","Philip","Naomi","Allan","Deborah","George","Prisca","Henry","Lydia"
];

const lastNames = [
  "Smith","Johnson","Brown","Taylor","Wilson","Lee","Clark","Walker","Hall","Allen",
  "King","Wright","Scott","Green","Baker","Adams","Nelson","Carter","Mitchell","Perez",
  "Roberts","Turner","Phillips","Campbell","Parker","Evans","Edwards","Collins","Stewart","Morris",
  "Rogers","Reed","Cook","Morgan","Bell","Murphy","Bailey","Rivera","Cooper","Richardson",
  "Cox","Howard","Ward","Torres","Peterson","Gray","Ramirez","James","Watson","Brooks"
];

function generateUniqueName(i: number) {
  const first = firstNames[i % firstNames.length];
  const last = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
  return `${first} ${last}`;
}

function generateRegistrationNumber(i: number) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const threeLetters =
    letters[i % 26] +
    letters[Math.floor(i / 26) % 26] +
    letters[Math.floor(i / (26 * 26)) % 26];
  const singleLetter = letters[i % 26];
  const twoDigits = String((i % 100)).padStart(2, "0");
  const fiveDigits = String(i + 1).padStart(5, "0");
  const year = new Date().getFullYear();
  return `${threeLetters}/${singleLetter}/${twoDigits}-${fiveDigits}/${year}`;
}

async function seed() {
  await db.delete(votes).execute();
  await db.delete(candidates).execute();
  await db.delete(positions).execute();
  await db.delete(elections).execute();
  await db.delete(users).execute();
  await db.delete(systemUsers).execute();

  const systemUsersData = Array.from({ length: 50 }, (_, i) => {
    let role: "Admin" | "ElectoralOfficer" | "Student" = "Student";
    if (i === 0) role = "Admin";
    else if (i === 1) role = "ElectoralOfficer";

    const fullName = generateUniqueName(i);
    const emailSafe = fullName.toLowerCase().replace(/\s+/g, ".");

    return {
      systemUserId: uuid(),
      fullName,
      email: `${emailSafe}${i}@gmail.com`,
      registrationNumber: generateRegistrationNumber(i),
      role,
      isActive: true,
      createdAt: new Date(),
    };
  });

  await db.insert(systemUsers).values(systemUsersData).execute();

  const usersData = systemUsersData.map((su) => ({
    userId: uuid(),
    systemUserId: su.systemUserId,
    fullName: su.fullName,
    registrationNumber: su.registrationNumber,
    email: su.email,
    role: su.role,
    passwordHash:
      su.role === "Admin"
        ? generatePasswordHash("Admin123!")
        : su.role === "ElectoralOfficer"
        ? generatePasswordHash("Officer123!")
        : generatePasswordHash("Student123!"),
    verificationCode: null,
    isVerified: true,
    createdAt: new Date(),
  }));

  await db.insert(users).values(usersData).execute();

  const electionIds = [uuid(), uuid()];

  await db.insert(elections).values([
    {
      electionId: electionIds[0],
      title: "Student Council Election 2025",
      description: "Annual student council election",
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: "Upcoming",
      createdBy: usersData[0].userId,
      createdAt: new Date(),
    },
    {
      electionId: electionIds[1],
      title: "Faculty Representatives Election 2025",
      description: "Faculty representatives election",
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: "Upcoming",
      createdBy: usersData[1].userId,
      createdAt: new Date(),
    },
  ]).execute();

  const positionNames = [
    "President",
    "Vice President",
    "Secretary",
    "Treasurer",
    "Sports Captain",
  ];

  const positionsData = electionIds.flatMap((electionId) =>
    positionNames.map((name) => ({
      positionId: uuid(),
      electionId,
      name,
      createdAt: new Date(),
    }))
  );

  await db.insert(positions).values(positionsData).execute();

  const studentUsers = usersData.filter((u) => u.role === "Student");

  const candidatesData = positionsData.flatMap((pos) =>
    studentUsers.slice(0, 4).map((stu, idx) => ({
      candidateId: uuid(),
      userId: stu.userId,
      electionId: pos.electionId,
      positionId: pos.positionId,
      faculty: `Faculty ${idx + 1}`,
      manifesto: `Manifesto for ${pos.name} by ${stu.fullName}`,
      createdAt: new Date(),
    }))
  );

  await db.insert(candidates).values(candidatesData).execute();

  const firstElectionPositions = positionsData.filter(
    (p) => p.electionId === electionIds[0]
  );

  const votesData = studentUsers.flatMap((stu) =>
    firstElectionPositions.map((pos) => {
      const posCandidates = candidatesData.filter(
        (c) => c.positionId === pos.positionId
      );
      const chosen =
        posCandidates[Math.floor(Math.random() * posCandidates.length)];
      return {
        voteId: uuid(),
        voterId: stu.userId,
        candidateId: chosen.candidateId,
        electionId: pos.electionId,
        positionId: pos.positionId,
        createdAt: new Date(),
      };
    })
  );

  await db.insert(votes).values(votesData).execute();

  await db.insert(complaints).values([
    { complaintId: uuid(), userId: usersData[2].userId, complaint: "Complaint 1", createdAt: new Date() },
    { complaintId: uuid(), userId: usersData[3].userId, complaint: "Complaint 2", createdAt: new Date() },
    { complaintId: uuid(), userId: usersData[4].userId, complaint: "Complaint 3", createdAt: new Date() },
    { complaintId: uuid(), userId: usersData[5].userId, complaint: "Complaint 4", createdAt: new Date() },
    { complaintId: uuid(), userId: usersData[6].userId, complaint: "Complaint 5", createdAt: new Date() },
  ]).execute();

  console.log("Database seeded successfully");
}

seed().catch(console.error);
