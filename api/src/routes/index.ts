import middlewares from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';

const router = Router();

router.use('/user', middlewares.session(), (req, res) => res.json(req.user || {}));

let profile = {
  name: 'Blocklet',
  email: 'blocklet@example.com',
  phone: '123-456-7890',
};

router.get('/profile', (_, res) => res.json(profile));

router.patch('/profile', (req, res) => {
  const { name, email, phone } = req.body;

  // Basic validation
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'All fields (name, email, phone) are required' });
  }

  // Update the profile
  profile = { ...profile, name, email, phone };

  return res.json(profile);
});

export default router;
