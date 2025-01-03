import bcrypt from "bcrypt";
import prisma from "../src/utils/prisma.js";

async function main() {
  const password = await bcrypt.hash("12345678", 10);

  const user = {
    email: "test@gmail.com",
    name: "john doe",
    password,
  };

  await prisma.user.create({
    data: user,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
