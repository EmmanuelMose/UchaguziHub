import  db  from "../Drizzle/db";
import {
  systemUsers,
  users,
  elections,
  positions,
  candidates,
  complaints
} from "../Drizzle/schema";

async function seed() {
  try {
    await db.insert(systemUsers).values([
      { systemUserId: "1", fullName: "Admin User", email: "admin@evote.com", registrationNumber: "ADM-2026-001", role: "Admin" },
      { systemUserId: "2", fullName: "Election Officer", email: "officer@evote.com", registrationNumber: "OFF-2026-001", role: "ElectionOfficer" },
      { systemUserId: "3", fullName: "Student One", email: "student1@evote.com", registrationNumber: "STU-2026-001", role: "Student" },
      { systemUserId: "4", fullName: "Student Two", email: "student2@evote.com", registrationNumber: "STU-2026-002", role: "Student" },
      { systemUserId: "5", fullName: "Student Three", email: "student3@evote.com", registrationNumber: "STU-2026-003", role: "Student" },
      { systemUserId: "6", fullName: "Student Four", email: "student4@evote.com", registrationNumber: "STU-2026-004", role: "Student" },
      { systemUserId: "7", fullName: "Student Five", email: "student5@evote.com", registrationNumber: "STU-2026-005", role: "Student" },
      { systemUserId: "8", fullName: "Student Six", email: "student6@evote.com", registrationNumber: "STU-2026-006", role: "Student" },
      { systemUserId: "9", fullName: "Student Seven", email: "student7@evote.com", registrationNumber: "STU-2026-007", role: "Student" },
      { systemUserId: "10", fullName: "Student Eight", email: "student8@evote.com", registrationNumber: "STU-2026-008", role: "Student" },
      { systemUserId: "11", fullName: "Emmanuel Mose", email: "emmanuelmose806@gmail.com", registrationNumber: "COM/B/01-00141/2022", role: "Student" },
      { systemUserId: "12", fullName: "Emmanuel Guru", email: "emmanuelmose10204@gmail.com", registrationNumber: "COM/B/01-00140/2022", role: "Admin" },
      { systemUserId: "13", fullName: "Emmanuel Ongera", email: "moseemmanuel64@yahoo.com", registrationNumber: "COM/B/01-00139/2022", role: "ElectionOfficer" },
    ]);

    await db.insert(users).values([
      { userId: "1", systemUserId: "1", fullName: "Admin User", registrationNumber: "ADM-2026-001", email: "admin@evote.com", role: "Admin", passwordHash: "hashed_Secure@123A", isVerified: true },
      { userId: "2", systemUserId: "2", fullName: "Election Officer", registrationNumber: "OFF-2026-001", email: "officer@evote.com", role: "ElectionOfficer", passwordHash: "hashed_Secure@123A", isVerified: true },
      { userId: "3", systemUserId: "3", fullName: "Student One", registrationNumber: "STU-2026-001", email: "student1@evote.com", role: "Student", passwordHash: "hashed_Secure@123A", isVerified: true },
      { userId: "4", systemUserId: "4", fullName: "Student Two", registrationNumber: "STU-2026-002", email: "student2@evote.com", role: "Student", passwordHash: "hashed_Secure@123A", isVerified: true },
      { userId: "5", systemUserId: "5", fullName: "Student Three", registrationNumber: "STU-2026-003", email: "student3@evote.com", role: "Student", passwordHash: "hashed_Secure@123A", isVerified: true },
      { userId: "6", systemUserId: "6", fullName: "Student Four", registrationNumber: "STU-2026-004", email: "student4@evote.com", role: "Student", passwordHash: "hashed_Secure@123A", isVerified: true },
      { userId: "7", systemUserId: "7", fullName: "Student Five", registrationNumber: "STU-2026-005", email: "student5@evote.com", role: "Student", passwordHash: "hashed_Secure@123A", isVerified: true },
      { userId: "8", systemUserId: "8", fullName: "Student Six", registrationNumber: "STU-2026-006", email: "student6@evote.com", role: "Student", passwordHash: "hashed_Secure@123A", isVerified: true },
      { userId: "9", systemUserId: "9", fullName: "Student Seven", registrationNumber: "STU-2026-007", email: "student7@evote.com", role: "Student", passwordHash: "hashed_Secure@123A", isVerified: true },
      { userId: "10", systemUserId: "10", fullName: "Student Eight", registrationNumber: "STU-2026-008", email: "student8@evote.com", role: "Student", passwordHash: "hashed_Secure@123A", isVerified: true }
    ]);

    await db.insert(elections).values([
      { electionId: "1", title: "Student Council Election 2026", description: "Main student leadership election", startDate: new Date("2026-02-01"), endDate: new Date("2026-02-07"), status: "Ongoing", createdBy: "1" },
      { electionId: "2", title: "Faculty Representatives Election 2026", description: "Faculty leadership election", startDate: new Date("2026-03-01"), endDate: new Date("2026-03-05"), status: "Upcoming", createdBy: "1" }
    ]);

    await db.insert(positions).values([
      { positionId: "1", electionId: "1", name: "President" },
      { positionId: "2", electionId: "1", name: "Vice President" },
      { positionId: "3", electionId: "1", name: "Secretary" },
      { positionId: "4", electionId: "1", name: "Treasurer" },
      { positionId: "5", electionId: "1", name: "Organizing Secretary" },
      { positionId: "6", electionId: "2", name: "President" },
      { positionId: "7", electionId: "2", name: "Vice President" },
      { positionId: "8", electionId: "2", name: "Secretary" },
      { positionId: "9", electionId: "2", name: "Treasurer" },
      { positionId: "10", electionId: "2", name: "Organizing Secretary" }
    ]);

    await db.insert(candidates).values([
      { candidateId: "1", userId: "3", electionId: "1", positionId: "1", faculty: "Computing", manifesto: "Transparency and accountability" },
      { candidateId: "2", userId: "4", electionId: "1", positionId: "1", faculty: "Business", manifesto: "Student empowerment" },
      { candidateId: "3", userId: "5", electionId: "1", positionId: "1", faculty: "Engineering", manifesto: "Better facilities" },
      { candidateId: "4", userId: "6", electionId: "1", positionId: "2", faculty: "Science", manifesto: "Unity and inclusion" },
      { candidateId: "5", userId: "7", electionId: "1", positionId: "2", faculty: "Education", manifesto: "Academic excellence" },
      { candidateId: "6", userId: "8", electionId: "1", positionId: "2", faculty: "Law", manifesto: "Policy reform" },
      { candidateId: "7", userId: "3", electionId: "2", positionId: "6", faculty: "Computing", manifesto: "Fair representation" },
      { candidateId: "8", userId: "4", electionId: "2", positionId: "6", faculty: "Business", manifesto: "Transparency" },
      { candidateId: "9", userId: "5", electionId: "2", positionId: "6", faculty: "Engineering", manifesto: "Accountability" }
    ]);

    await db.insert(complaints).values([
      { complaintId: "1", userId: "3", complaint: "Voting page was slow during peak hours" },
      { complaintId: "2", userId: "4", complaint: "Candidate list was not loading properly" }
    ]);

    console.log("Seeding completed");
  } catch (error) {
    console.error(error);
  }
}

seed();
