import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findUser = async (username?: string, email?: string) => {
  if (!username && !email) {
    throw new Error('Either username or email must be provided');
  }

  return await prisma.user.findFirst({
    where: {
      OR: [
        { username },
        { email },
      ],
    },
  });
};
