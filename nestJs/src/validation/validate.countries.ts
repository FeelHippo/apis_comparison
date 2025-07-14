import Joi, { ValidationError } from 'joi';
import { Countries } from '../interfaces/interface.countries.js';

const nodeSchema = Joi.object().keys({
  name: Joi.string(),
  phone_code: Joi.string(),
  capital: Joi.string(),
  currency: Joi.string(),
  native: Joi.string(),
  emoji: Joi.string(),
});

const edgesSchema = Joi.object().keys({
  cursor: Joi.string(),
  node: nodeSchema,
});

const countriesSchema = Joi.object().keys({
  totalCount: Joi.number().integer().required(),
  edges: Joi.array().items(edgesSchema),
  pageInfo: Joi.object().keys({
    hasNextPage: Joi.boolean().default(false),
    endCursor: Joi.string(),
    hasPreviousPage: Joi.boolean().default(false),
    startCursor: Joi.string(),
  }),
});

export const validateCountriesResponse = (
  input: object,
): { error: ValidationError; warning?: ValidationError; value: Countries } => {
  const schema = Joi.object().keys({
    countries: countriesSchema.required(),
  });
  return schema.validate(input);
};
