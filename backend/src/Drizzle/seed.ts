import db from "../Drizzle/db";
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
    const insertedSystemUsers = await db.insert(systemUsers)
      .values([
        { fullName: "Admin User", email: "admin@evote.com", registrationNumber: "ADM-2026-001", role: "Admin" },
        { fullName: "Election Officer", email: "officer@evote.com", registrationNumber: "OFF-2026-001", role: "ElectionOfficer" },
        { fullName: "Student One", email: "student1@evote.com", registrationNumber: "STU-2026-001", role: "Student" },
        { fullName: "Student Two", email: "student2@evote.com", registrationNumber: "STU-2026-002", role: "Student" },
        { fullName: "Student Three", email: "student3@evote.com", registrationNumber: "STU-2026-003", role: "Student" },
        { fullName: "Student Four", email: "student4@evote.com", registrationNumber: "STU-2026-004", role: "Student" },
        { fullName: "Student Five", email: "student5@evote.com", registrationNumber: "STU-2026-005", role: "Student" },
        { fullName: "Student Six", email: "student6@evote.com", registrationNumber: "STU-2026-006", role: "Student" },
        { fullName: "Student Seven", email: "student7@evote.com", registrationNumber: "STU-2026-007", role: "Student" },
        { fullName: "Student Eight", email: "student8@evote.com", registrationNumber: "STU-2026-008", role: "Student" },
        { fullName: "Emmanuel Mose", email: "emmanuelmose806@gmail.com", registrationNumber: "COM/B/01-00141/2022", role: "Student" },
        { fullName: "Emmanuel Guru", email: "emmanuelmose10204@gmail.com", registrationNumber: "COM/B/01-00140/2022", role: "Admin" },
        { fullName: "Emmanuel Ongera", email: "moseemmanuel64@yahoo.com", registrationNumber: "COM/B/01-00139/2022", role: "ElectionOfficer" }
      ])
      .returning({ id: systemUsers.systemUserId, email: systemUsers.email });

    const usersData = insertedSystemUsers.map(u => ({
      systemUserId: u.id,
      fullName: u.email.includes("admin@") ? "Admin User" : u.email.includes("officer@") ? "Election Officer" : "Student",
      registrationNumber: u.email.includes("admin@") ? "ADM-2026-001" : u.email.includes("officer@") ? "OFF-2026-001" : "STU-2026-001",
      email: u.email,
      role: u.email.includes("admin@") ? "Admin" : u.email.includes("officer@") ? "ElectionOfficer" : "Student",
      passwordHash: "hashed_Secure@123A",
      isVerified: true
    }));

    const insertedUsers = await db.insert(users).values(usersData).returning({ id: users.userId, email: users.email });

    const adminUserId = insertedUsers.find(u => u.email === "admin@evote.com")?.id;

    const insertedElections = await db.insert(elections).values([
      { title: "Student Council Election 2026", description: "Main student leadership election", startDate: new Date("2026-02-01"), endDate: new Date("2026-02-07"), status: "Ongoing", createdBy: adminUserId! },
      { title: "Faculty Representatives Election 2026", description: "Faculty leadership election", startDate: new Date("2026-03-01"), endDate: new Date("2026-03-05"), status: "Upcoming", createdBy: adminUserId! }
    ]).returning({ id: elections.electionId });

    const insertedPositions = await db.insert(positions).values([
      { electionId: insertedElections[0].id, name: "President" },
      { electionId: insertedElections[0].id, name: "Vice President" },
      { electionId: insertedElections[0].id, name: "Secretary" },
      { electionId: insertedElections[0].id, name: "Treasurer" },
      { electionId: insertedElections[0].id, name: "Organizing Secretary" },
      { electionId: insertedElections[1].id, name: "President" },
      { electionId: insertedElections[1].id, name: "Vice President" },
      { electionId: insertedElections[1].id, name: "Secretary" },
      { electionId: insertedElections[1].id, name: "Treasurer" },
      { electionId: insertedElections[1].id, name: "Organizing Secretary" }
    ]).returning({ id: positions.positionId });

    await db.insert(candidates).values([
      { userId: insertedUsers.find(u => u.email === "student1@evote.com")!.id, electionId: insertedElections[0].id, positionId: insertedPositions[0].id, faculty: "Computing", manifesto: "Transparency and accountability" },
      { userId: insertedUsers.find(u => u.email === "student2@evote.com")!.id, electionId: insertedElections[0].id, positionId: insertedPositions[0].id, faculty: "Business", manifesto: "Student empowerment" },
      { userId: insertedUsers.find(u => u.email === "student3@evote.com")!.id, electionId: insertedElections[0].id, positionId: insertedPositions[0].id, faculty: "Engineering", manifesto: "Better facilities" }
    ]);

    await db.insert(complaints).values([
      { userId: insertedUsers.find(u => u.email === "student1@evote.com")!.id, complaint: "Voting page was slow during peak hours" },
      { userId: insertedUsers.find(u => u.email === "student2@evote.com")!.id, complaint: "Candidate list was not loading properly" }
    ]);

    console.log("Seeding completed");
  } catch (error) {
    console.error(error);
  }
}

seed();
