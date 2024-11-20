import middlewares from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';

const router = Router();

router.use('/user', middlewares.session(), (req, res) => res.json(req.user || {}));

router.use('/data', (_, res) =>
  res.json({
    message: 'Hello Blocklet!',
  }),
);

router.use('/profile', (_, res) =>
  res.json({
    name: 'Blocklet',
    email: 'blocklet@example.com',
    phone: '123-456-7890',
  }),
);

export default router;
