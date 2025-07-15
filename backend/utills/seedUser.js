import { User } from "../models/User.js";
const seedUsers = async () => {
  const users = [
    { name: "Rahul", totalPoints: 0 },
    { name: "Kamal", totalPoints: 0 },
    { name: "Sanak", totalPoints: 0 },
    { name: "Amit", totalPoints: 0 },
    { name: "Deepak", totalPoints: 0 },
    { name: "Anjali", totalPoints: 0 },
    { name: "Priya", totalPoints: 0 },
    { name: "Ravi", totalPoints: 0 },
    { name: "Neha", totalPoints: 0 },
    { name: "Suresh", totalPoints: 0 },
  ];
 try {
    for (const user of users) {
      const exists = await User.findOne({ name: user.name });
      if (!exists) {
        await User.create(user);
        console.log(`✅ User ${user.name} inserted.`);
      } else {
        console.log(`ℹ️ User ${user.name} already exists. Skipping.`);
      }
    }
    console.log("Seeding complete.");
  } catch (error) {
    console.error("❌ Error inserting users:", error);
  }
};

export default seedUsers;
