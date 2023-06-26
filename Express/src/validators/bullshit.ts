import * as joi from 'joi';

export const bullshit_schema = joi
  .object({
    phrase: joi.string().required(),
  })
  .required();
