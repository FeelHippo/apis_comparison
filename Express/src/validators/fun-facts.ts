import * as joi from 'joi';

export const fun_facts_schema = joi
  .object({
    phrase: joi.string().required(),
  })
  .required();
