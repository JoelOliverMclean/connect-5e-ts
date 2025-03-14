import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

async function main() {
  await prisma.baseClass.create({
    data: {
      id: randomUUID(),
      name: "Fighter",
      slug: "fighter",
      description: "",
      hitDice: "d10",
    },
  });
  const allBaseClasses = await prisma.baseClass.findMany();
  console.log(allBaseClasses);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
