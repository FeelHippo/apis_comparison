import { Router } from 'express';
import { getBullshit } from './get-bullshit';
import { postBullshit } from './post-bullshit';
import { postBullcrap } from './post-bullcrap';
import { patchBullcrap } from './patch-bullcrap';
import { deleteBullcrap } from './delete-bullcrap';

const v1 = Router();

v1.get('/get-bullshit', getBullshit);
v1.post('/post-bullshit', postBullshit);
v1.post('/post-bullcrap', postBullcrap);
v1.patch('/patch-bullcrap', patchBullcrap);
v1.delete('/delete-bullcrap', deleteBullcrap);

export default v1;
