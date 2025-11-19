import * as joi from 'joi';

export const fun_facts_schema = joi
  .object({
    iconUrl: joi.string().required(),
    factId: joi.string().required(),
    url: joi.string().required(),
    value: joi.string().required(),
  })
  .rename('icon_url', 'iconUrl')
  .rename('id', 'factId')
  .options({ stripUnknown: true })
  .required();
