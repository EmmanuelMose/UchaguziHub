import db from "../Drizzle/db";
import { systemUsers, users, elections, positions, candidates, votes } from "../Drizzle/schema";

async function seed() {
  try {
    await db.delete(votes).execute();
    await db.delete(candidates).execute();
    await db.delete(positions).execute();
    await db.delete(elections).execute();
    await db.delete(users).execute();
    await db.delete(systemUsers).execute();

    const insertedSystemUsers = await db.insert(systemUsers).values([
      { fullName: "John Mwangi", email: "john.mwangi1@mmust.ac.ke", registrationNumber: "MMU/001/2022", role: "Student" },
      { fullName: "Jane Wanjiku", email: "jane.wanjiku2@mmust.ac.ke", registrationNumber: "MMU/002/2022", role: "Student" },
      { fullName: "Peter Otieno", email: "peter.otieno3@mmust.ac.ke", registrationNumber: "MMU/003/2022", role: "Student" },
      { fullName: "Mary Achieng", email: "mary.achieng4@mmust.ac.ke", registrationNumber: "MMU/004/2022", role: "Student" },
      { fullName: "David Kiptoo", email: "david.kiptoo5@mmust.ac.ke", registrationNumber: "MMU/005/2022", role: "Student" },
      { fullName: "Brian Mutiso", email: "brian.mutiso6@mmust.ac.ke", registrationNumber: "MMU/006/2022", role: "Student" },
      { fullName: "Kevin Ouma", email: "kevin.ouma7@mmust.ac.ke", registrationNumber: "MMU/007/2022", role: "Student" },
      { fullName: "Faith Njeri", email: "faith.njeri8@mmust.ac.ke", registrationNumber: "MMU/008/2022", role: "Student" },
      { fullName: "Grace Wambui", email: "grace.wambui9@mmust.ac.ke", registrationNumber: "MMU/009/2022", role: "Student" },
      { fullName: "Daniel Cheruiyot", email: "daniel.cheruiyot10@mmust.ac.ke", registrationNumber: "MMU/010/2022", role: "Student" },
      { fullName: "Samuel Kamau", email: "samuel.kamau11@mmust.ac.ke", registrationNumber: "MMU/011/2022", role: "Student" },
      { fullName: "Josephine Atieno", email: "josephine.atieno12@mmust.ac.ke", registrationNumber: "MMU/012/2022", role: "Student" },
      { fullName: "Victor Maina", email: "victor.maina13@mmust.ac.ke", registrationNumber: "MMU/013/2022", role: "Student" },
      { fullName: "Mercy Chebet", email: "mercy.chebet14@mmust.ac.ke", registrationNumber: "MMU/014/2022", role: "Student" },
      { fullName: "Allan Onyango", email: "allan.onyango15@mmust.ac.ke", registrationNumber: "MMU/015/2022", role: "Student" },
      { fullName: "Lilian Jepkorir", email: "lilian.jepkorir16@mmust.ac.ke", registrationNumber: "MMU/016/2022", role: "Student" },
      { fullName: "Dennis Kiprotich", email: "dennis.kiprotich17@mmust.ac.ke", registrationNumber: "MMU/017/2022", role: "Student" },
      { fullName: "Caroline Wanjiru", email: "caroline.wanjiru18@mmust.ac.ke", registrationNumber: "MMU/018/2022", role: "Student" },
      { fullName: "Paul Odhiambo", email: "paul.odhiambo19@mmust.ac.ke", registrationNumber: "MMU/019/2022", role: "Student" },
      { fullName: "Esther Nyambura", email: "esther.nyambura20@mmust.ac.ke", registrationNumber: "MMU/020/2022", role: "Student" },
      { fullName: "Mark Kiplangat", email: "mark.kiplangat21@mmust.ac.ke", registrationNumber: "MMU/021/2022", role: "Student" },
      { fullName: "Irene Akinyi", email: "irene.akinyi22@mmust.ac.ke", registrationNumber: "MMU/022/2022", role: "Student" },
      { fullName: "George Mutua", email: "george.mutua23@mmust.ac.ke", registrationNumber: "MMU/023/2022", role: "Student" },
      { fullName: "Lucy Wairimu", email: "lucy.wairimu24@mmust.ac.ke", registrationNumber: "MMU/024/2022", role: "Student" },
      { fullName: "Patrick Njuguna", email: "patrick.njuguna25@mmust.ac.ke", registrationNumber: "MMU/025/2022", role: "Student" },
      { fullName: "Ann Wanjala", email: "ann.wanjala26@mmust.ac.ke", registrationNumber: "MMU/026/2022", role: "Student" },
      { fullName: "Eric Barasa", email: "eric.barasa27@mmust.ac.ke", registrationNumber: "MMU/027/2022", role: "Student" },
      { fullName: "Rose Auma", email: "rose.auma28@mmust.ac.ke", registrationNumber: "MMU/028/2022", role: "Student" },
      { fullName: "Felix Kiprono", email: "felix.kiprono29@mmust.ac.ke", registrationNumber: "MMU/029/2022", role: "Student" },
      { fullName: "Agnes Jepchirchir", email: "agnes.jepchirchir30@mmust.ac.ke", registrationNumber: "MMU/030/2022", role: "Student" },
      { fullName: "Collins Otieno", email: "collins.otieno31@mmust.ac.ke", registrationNumber: "MMU/031/2022", role: "Student" },
      { fullName: "Nancy Naliaka", email: "nancy.naliaka32@mmust.ac.ke", registrationNumber: "MMU/032/2022", role: "Student" },
      { fullName: "Kelvin Kibet", email: "kelvin.kibet33@mmust.ac.ke", registrationNumber: "MMU/033/2022", role: "Student" },
      { fullName: "Diana Chepkemoi", email: "diana.chepkemoi34@mmust.ac.ke", registrationNumber: "MMU/034/2022", role: "Student" },
      { fullName: "Alex Ochieng", email: "alex.ochieng35@mmust.ac.ke", registrationNumber: "MMU/035/2022", role: "Student" },
      { fullName: "Judith Wekesa", email: "judith.wekesa36@mmust.ac.ke", registrationNumber: "MMU/036/2022", role: "Student" },
      { fullName: "Benard Simiyu", email: "benard.simiyu37@mmust.ac.ke", registrationNumber: "MMU/037/2022", role: "Student" },
      { fullName: "Naomi Chepkoech", email: "naomi.chepkoech38@mmust.ac.ke", registrationNumber: "MMU/038/2022", role: "Student" },
      { fullName: "Victor Wanyama", email: "victor.wanyama39@mmust.ac.ke", registrationNumber: "MMU/039/2022", role: "Student" },
      { fullName: "Hannah Jepkemboi", email: "hannah.jepkemboi40@mmust.ac.ke", registrationNumber: "MMU/040/2022", role: "Student" },
      { fullName: "Stephen Njoroge", email: "stephen.njoroge41@mmust.ac.ke", registrationNumber: "MMU/041/2022", role: "Student" },
      { fullName: "Joyce Anyango", email: "joyce.anyango42@mmust.ac.ke", registrationNumber: "MMU/042/2022", role: "Student" },
      { fullName: "Anthony Mwiti", email: "anthony.mwiti43@mmust.ac.ke", registrationNumber: "MMU/043/2022", role: "Student" },
      { fullName: "Beatrice Muthoni", email: "beatrice.muthoni44@mmust.ac.ke", registrationNumber: "MMU/044/2022", role: "Student" },
      { fullName: "Chris Odongo", email: "chris.odongo45@mmust.ac.ke", registrationNumber: "MMU/045/2022", role: "Student" },
      { fullName: "Purity Chepkorir", email: "purity.chepkorir46@mmust.ac.ke", registrationNumber: "MMU/046/2022", role: "Student" },
      { fullName: "Fredrick Otieno", email: "fredrick.otieno47@mmust.ac.ke", registrationNumber: "MMU/047/2022", role: "Student" },
      { fullName: "Ruth Wanjiku", email: "ruth.wanjiku48@mmust.ac.ke", registrationNumber: "MMU/048/2022", role: "Student" },
      { fullName: "Oscar Kipkemoi", email: "oscar.kipkemoi49@mmust.ac.ke", registrationNumber: "MMU/049/2022", role: "Student" },
      { fullName: "Dorcas Naliaka", email: "dorcas.naliaka50@mmust.ac.ke", registrationNumber: "MMU/050/2022", role: "Student" },
      { fullName: "Martin Wekesa", email: "martin.wekesa51@mmust.ac.ke", registrationNumber: "MMU/051/2022", role: "Student" },
      { fullName: "Emily Chebet", email: "emily.chebet52@mmust.ac.ke", registrationNumber: "MMU/052/2022", role: "Student" },
      { fullName: "Brian Odhiambo", email: "brian.odhiambo53@mmust.ac.ke", registrationNumber: "MMU/053/2022", role: "Student" },
      { fullName: "Sharon Wairimu", email: "sharon.wairimu54@mmust.ac.ke", registrationNumber: "MMU/054/2022", role: "Student" },
      { fullName: "George Kiptoo", email: "george.kiptoo55@mmust.ac.ke", registrationNumber: "MMU/055/2022", role: "Student" },
      { fullName: "Faith Achieng", email: "faith.achieng56@mmust.ac.ke", registrationNumber: "MMU/056/2022", role: "Student" },
      { fullName: "Kevin Mutiso", email: "kevin.mutiso57@mmust.ac.ke", registrationNumber: "MMU/057/2022", role: "Student" },
      { fullName: "Grace Njeri", email: "grace.njeri58@mmust.ac.ke", registrationNumber: "MMU/058/2022", role: "Student" },
      { fullName: "Daniel Ouma", email: "daniel.ouma59@mmust.ac.ke", registrationNumber: "MMU/059/2022", role: "Student" },
      { fullName: "Samuel Kamau Jr", email: "samuel.kamau60@mmust.ac.ke", registrationNumber: "MMU/060/2022", role: "Student" },
      { fullName: "Ivy Wambui", email: "ivy.wambui61@mmust.ac.ke", registrationNumber: "MMU/061/2022", role: "Student" },
      { fullName: "Victor Maina Jr", email: "victor.maina62@mmust.ac.ke", registrationNumber: "MMU/062/2022", role: "Student" },
      { fullName: "Mercy Chebet Jr", email: "mercy.chebet63@mmust.ac.ke", registrationNumber: "MMU/063/2022", role: "Student" },
      { fullName: "Allan Onyango Jr", email: "allan.onyango64@mmust.ac.ke", registrationNumber: "MMU/064/2022", role: "Student" },
      { fullName: "Lilian Jepkorir Jr", email: "lilian.jepkorir65@mmust.ac.ke", registrationNumber: "MMU/065/2022", role: "Student" },
      { fullName: "Dennis Kiprotich Jr", email: "dennis.kiprotich66@mmust.ac.ke", registrationNumber: "MMU/066/2022", role: "Student" },
      { fullName: "Caroline Wanjiru Jr", email: "caroline.wanjiru67@mmust.ac.ke", registrationNumber: "MMU/067/2022", role: "Student" },
      { fullName: "Paul Odhiambo Jr", email: "paul.odhiambo68@mmust.ac.ke", registrationNumber: "MMU/068/2022", role: "Student" },
      { fullName: "Esther Nyambura Jr", email: "esther.nyambura69@mmust.ac.ke", registrationNumber: "MMU/069/2022", role: "Student" },
      { fullName: "Mark Kiplangat Jr", email: "mark.kiplangat70@mmust.ac.ke", registrationNumber: "MMU/070/2022", role: "Student" }
    ]).returning({ id: systemUsers.systemUserId, email: systemUsers.email, fullName: systemUsers.fullName, registrationNumber: systemUsers.registrationNumber, role: systemUsers.role });

    const insertedUsers = await db.insert(users).values(
      insertedSystemUsers.map(u => ({
        systemUserId: u.id,
        fullName: u.fullName,
        registrationNumber: u.registrationNumber,
        email: u.email,
        role: u.role,
        passwordHash: "hashed_password",
        isVerified: true
      }))
    ).returning({ id: users.userId });

    const adminId = insertedUsers[0].id;

    const [election] = await db.insert(elections).values({
      title: "MMUST 2026 General Elections",
      description: "University general elections",
      startDate: new Date("2026-05-01"),
      endDate: new Date("2026-05-05"),
      status: "Ongoing",
      createdBy: adminId
    }).returning({ id: elections.electionId });

    const insertedPositions = await db.insert(positions).values([
      { electionId: election.id, name: "President" },
      { electionId: election.id, name: "Vice President" },
      { electionId: election.id, name: "Secretary General" },
      { electionId: election.id, name: "Treasurer" },
      { electionId: election.id, name: "Organizing Secretary" }
    ]).returning({ id: positions.positionId });

    const insertedCandidates = await db.insert(candidates).values([
      { userId: insertedUsers[1].id, electionId: election.id, positionId: insertedPositions[0].id, faculty: "Computing", manifesto: "Leadership" },
      { userId: insertedUsers[2].id, electionId: election.id, positionId: insertedPositions[0].id, faculty: "Business", manifesto: "Growth" },
      { userId: insertedUsers[3].id, electionId: election.id, positionId: insertedPositions[0].id, faculty: "Engineering", manifesto: "Development" },

      { userId: insertedUsers[4].id, electionId: election.id, positionId: insertedPositions[1].id, faculty: "Computing", manifesto: "Unity" },
      { userId: insertedUsers[5].id, electionId: election.id, positionId: insertedPositions[1].id, faculty: "Business", manifesto: "Service" },
      { userId: insertedUsers[6].id, electionId: election.id, positionId: insertedPositions[1].id, faculty: "Engineering", manifesto: "Efficiency" },

      { userId: insertedUsers[7].id, electionId: election.id, positionId: insertedPositions[2].id, faculty: "Computing", manifesto: "Communication" },
      { userId: insertedUsers[8].id, electionId: election.id, positionId: insertedPositions[2].id, faculty: "Business", manifesto: "Records" },
      { userId: insertedUsers[9].id, electionId: election.id, positionId: insertedPositions[2].id, faculty: "Engineering", manifesto: "Organization" },

      { userId: insertedUsers[10].id, electionId: election.id, positionId: insertedPositions[3].id, faculty: "Computing", manifesto: "Finance" },
      { userId: insertedUsers[11].id, electionId: election.id, positionId: insertedPositions[3].id, faculty: "Business", manifesto: "Budget" },
      { userId: insertedUsers[12].id, electionId: election.id, positionId: insertedPositions[3].id, faculty: "Engineering", manifesto: "Transparency" },

      { userId: insertedUsers[13].id, electionId: election.id, positionId: insertedPositions[4].id, faculty: "Computing", manifesto: "Events" },
      { userId: insertedUsers[14].id, electionId: election.id, positionId: insertedPositions[4].id, faculty: "Business", manifesto: "Activities" },
      { userId: insertedUsers[15].id, electionId: election.id, positionId: insertedPositions[4].id, faculty: "Engineering", manifesto: "Planning" }
    ]).returning({ id: candidates.candidateId, positionId: candidates.positionId });

    for (const user of insertedUsers) {
      for (const position of insertedPositions) {
        const candidate = insertedCandidates.find(c => c.positionId === position.id)!;
        await db.insert(votes).values({
          voterId: user.id,
          candidateId: candidate.id,
          electionId: election.id,
          positionId: position.id
        });
      }
    }

    console.log("Seeding completed");
  } catch (e) {
    console.error(e);
  }
}

seed();