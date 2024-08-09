import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../utilities/auth';
import app from '../index';

const prisma = new PrismaClient();

// Note: this dummy credentials can be found in seed.ts
const email = 'user1@example.com';
const username = 'user1';
const password = 'password123';

beforeAll(async () => {
  // Setup: Create a test user
  const hashedPassword = await hashPassword(password);
  await prisma.user.create({
    data: {
      email: email,
      username: username,
      password: hashedPassword,
    },
  });
});

afterAll(async () => {
  // Cleanup: Delete test data and disconnect
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});

describe('POST /auth/signin', () => {
  it('should login and return a token', async () => {
    const response = await request(app)
      .post('/auth/signin')
      .send({
        email: email,
        password: password,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should return 401 for invalid credentials', async () => {
    const response = await request(app)
      .post('/auth/signin')
      .send({
        email: email,
        password: 'wrongpassword',
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });
});
