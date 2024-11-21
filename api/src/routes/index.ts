import { Router } from 'express';

import Profile from './profile';

const ApiRouter = Router();

ApiRouter.use('/profile', Profile);

export default ApiRouter;
