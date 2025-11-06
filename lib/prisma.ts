import { PrismaClient } from "@/lib/generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

function createPrismaClient() {
  return new PrismaClient().$extends(withAccelerate());
}

type PrismaClientWithAccelerate = ReturnType<typeof createPrismaClient>;

const globalForPrisma = global as unknown as {
  prisma: PrismaClientWithAccelerate | undefined;
};

const prismaClient: PrismaClientWithAccelerate =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prismaClient;
}

export default prismaClient;