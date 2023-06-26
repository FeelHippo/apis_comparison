import { Router } from 'express';

import Authorizer from 'middlewares/authorizer';
import EnvironmentCheck from 'middlewares/environment-check';

import bullshit from './cheatsheet';

const v1 = Router();

v1.use('/cheatsheet', [Authorizer, EnvironmentCheck], bullshit);

export default v1;
