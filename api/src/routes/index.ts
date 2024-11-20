import middlewares from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';

import { Profile } from '../libs/db';

const router = Router();

router.use('/user', middlewares.session(), (req, res) => res.json(req.user || {}));

router.get('/profile', async (_, res) => {
  try {
    const profile = await Profile.findOne(); // Fetch the first profile
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    return res.json(profile);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to retrieve profile' });
  }
});

router.patch('/profile', async (req, res) => {
  const { name, email, phone } = req.body;

  // Validate input
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'All fields (name, email, phone) are required' });
  }

  try {
    const profile = await Profile.findOne();

    if (!profile) {
      // Create a new profile if none exists
      const newProfile = await Profile.create({ name, email, phone });
      return res.status(201).json(newProfile);
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

export default router;
