import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (email: string, username: string, password: string) => {
  return await prisma.user.create({
    data: {
      email,
      username,
      password,
    },
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const findUserByUsername = async (username: string) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

export const findUserByEmailAndUsername = async (username: string, email: string) => {
  return await prisma.user.findFirst({
    where: {
      OR: [
        { username },
        { email },
      ],
    },
  });
};