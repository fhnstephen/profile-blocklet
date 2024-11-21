import { Router } from 'express';

import { Profile } from '../libs/db';
import logger from '../libs/logger';

const profileRouter = Router();

/**
 * Get the profile from db
 * TODO: when there are multiple profiles, this should return a list of profiles, and implement a get by id endpoint
 * @status 200 - OK
 * @status 404 - Profile not found
 * @status 500 - Failed to retrieve profile
 */
profileRouter.get('/', async function getProfile(_, res) {
  try {
    const profile = await Profile.findOne(); // Fetch the first profile
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    return res.json(profile);
  } catch (err) {
    logger.error('Failed to retrieve profile:', err);
    return res.status(500).json({ error: 'Failed to retrieve profile' });
  }
});

/**
 * Update the profile in db
 * TODO: when there are multiple profiles, this should update the profile by id
 * @param {string} name - The name of the user, required
 * @param {string} email - The email of the user, required
 * @param {string} phone - The phone number of the user, required
 * @status 200 - Profile updated
 * @status 400 - Bad request
 * @status 404 - Profile not found
 * @status 500 - Failed to update profile
 */
profileRouter.patch('/', async (req, res) => {
  const { name, email, phone } = req.body;

  // Validate input
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'All fields (name, email, phone) are required' });
  }

  try {
    const profile = await Profile.findOne();

    if (!profile) {
      // Profile not found
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Update existing profile
    profile.name = name;
    profile.email = email;
    profile.phone = phone;
    await profile.save();

    return res.json(profile);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update profile', details: err.message });
  }
});

/**
 * Create a new profile in db
 * @param {string} name - The name of the user, required
 * @param {string} email - The email of the user, required
 * @param {string} phone - The phone number of the user, required
 * @status 201 - Profile created
 * @status 400 - Bad request
 * @status 500 - Failed to create profile
 */
profileRouter.post('/', async (req, res) => {
  const { name, email, phone } = req.body;

  // Validate input
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'All fields (name, email, phone) are required' });
  }

  try {
    const newProfile = await Profile.create({ name, email, phone });
    return res.status(201).json(newProfile);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create profile', details: err.message });
  }
});

export default profileRouter;
