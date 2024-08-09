import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const seed = async () => {
  if (process.env.NODE_ENV === 'production') {
    console.log('Seeding is not allowed in production.');
    return;
  }

  try {
    // Clear existing data
    await prisma.user.deleteMany();

    // Create sample users
    const hashedPassword1 = await bcrypt.hash('password123', 10);
    const hashedPassword2 = await bcrypt.hash('password456', 10);

    await prisma.user.createMany({
      data: [
        { email: 'user1@example.com', username: "user1", password: hashedPassword1 },
        { email: 'user2@example.com', username: "user2", password: hashedPassword2 },
      ],
    });

    console.log('Seeding completed.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
