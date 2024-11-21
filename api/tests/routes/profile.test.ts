import request from 'supertest';

import { app } from '../../src';
import { Profile } from '../../src/libs/db';

// Mock logger
jest.mock('../../src/libs/logger', () => ({
  error: jest.fn(),
}));

// Mock Profile model
jest.mock('../../src/libs/db', () => ({
  Profile: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

const baseUrl = '/v1/api/profile';

describe('Profile Router', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks between tests
  });

  describe(`GET ${baseUrl}`, () => {
    it('should return 404 if profile is not found', async () => {
      (Profile.findOne as jest.Mock).mockResolvedValue(null);

      const res = await request(app).get(baseUrl);

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'Profile not found' });
    });

    it('should return the profile if found', async () => {
      const mockProfile = { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' };
      (Profile.findOne as jest.Mock).mockResolvedValue(mockProfile);

      const res = await request(app).get(baseUrl);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockProfile);
    });

    it('should return 500 on database error', async () => {
      (Profile.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

      const res = await request(app).get(baseUrl);

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Failed to retrieve profile' });
    });
  });

  describe(`PATCH ${baseUrl}`, () => {
    it('should return 400 if required fields are missing', async () => {
      const res = await request(app).patch(baseUrl).send({ name: 'John' });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'All fields (name, email, phone) are required' });
    });

    it('should return 404 if none exists', async () => {
      const mockProfile = { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' };
      (Profile.findOne as jest.Mock).mockResolvedValue(null);
      (Profile.create as jest.Mock).mockResolvedValue(mockProfile);

      const res = await request(app).patch(baseUrl).send(mockProfile);

      expect(Profile.findOne).toHaveBeenCalled();
      expect(res.status).toBe(404);
    });

    it('should update an existing profile', async () => {
      const existingProfile = {
        id: 1,
        name: 'Old Name',
        email: 'old@example.com',
        phone: '111-222-3333',
      };
      const profileModelMock = {
        ...existingProfile,
        save: jest.fn().mockResolvedValue(true),
      };
      const updatedProfile = { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' };

      (Profile.findOne as jest.Mock).mockResolvedValue(profileModelMock);

      const res = await request(app).patch(baseUrl).send(updatedProfile);

      expect(Profile.findOne).toHaveBeenCalled();
      expect(profileModelMock.save).toHaveBeenCalled();
      expect(res.status).toBe(200);
      // delete save function from existingProfile to compare
      expect(res.body).toEqual({ ...existingProfile, ...updatedProfile });
    });

    it('should return 500 on database error', async () => {
      (Profile.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

      const res = await request(app).patch(baseUrl).send({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
      });

      expect(res.status).toBe(500);
      expect(res.body).toEqual({
        error: 'Failed to update profile',
        details: 'Database error',
      });
    });
  });
});

describe(`POST ${baseUrl}`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new profile with valid data', async () => {
    const mockProfile = { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' };

    (Profile.create as jest.Mock).mockResolvedValue(mockProfile);

    const res = await request(app).post(baseUrl).send(mockProfile);

    expect(Profile.create).toHaveBeenCalledWith(mockProfile);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockProfile);
  });

  it('should return 400 if any required field is missing', async () => {
    const invalidProfile = { name: 'John Doe', email: '' }; // Missing phone

    const res = await request(app).post(baseUrl).send(invalidProfile);

    expect(Profile.create).not.toHaveBeenCalled();
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: 'All fields (name, email, phone) are required',
    });
  });

  it('should return 500 if the database operation fails', async () => {
    const mockProfile = { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' };

    (Profile.create as jest.Mock).mockRejectedValue(new Error('Database error'));

    const res = await request(app).post(baseUrl).send(mockProfile);

    expect(Profile.create).toHaveBeenCalledWith(mockProfile);
    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      error: 'Failed to create profile',
      details: 'Database error',
    });
  });
});
