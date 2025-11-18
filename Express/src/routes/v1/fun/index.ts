import { Router } from 'express';
import { getFact } from './get-fact';
import { postFact } from './post-fact';
import { putFact } from './put-fact';
import { patchFact } from './patch-fact';
import { deleteFact } from './delete-fact';

const v1 = Router();

v1.get('/fact', getFact);
v1.post('/fact', postFact);
v1.put('/fact/:id', putFact);
v1.patch('/fact/:id', patchFact);
v1.delete('/fact/:id', deleteFact);

export default v1;
