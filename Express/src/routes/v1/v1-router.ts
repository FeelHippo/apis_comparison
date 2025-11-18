import { Router } from 'express';

import Authorizer from 'middlewares/authorizer';
import EnvironmentCheck from 'middlewares/environment-check';

import fun from './fun';

const v1 = Router();

v1.use('/fun', [Authorizer, EnvironmentCheck], fun);

export default v1;
