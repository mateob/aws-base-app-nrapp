import { CustomerTypeEnum } from '@enums/customer-type.enum';
import * as Joi from '@hapi/joi';
import { customerHeaderValidator } from '../../config/utils/joi-utils';

export const vehicleCreateValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator(Object.values(CustomerTypeEnum)),
  body: Joi.object({}),
});

export const vehicleUpdateByIdValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator(Object.values(CustomerTypeEnum)),
  body: Joi.object({}),
});

export const vehicleGetAllValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator(Object.values(CustomerTypeEnum)),
  body: Joi.object({}),
});

export const vehicleGetByIdValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator(Object.values(CustomerTypeEnum)),
  body: Joi.object({}),
});

export const vehicleDeleteValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator(Object.values(CustomerTypeEnum)),
  body: Joi.object({}),
});

export const vehicleBloquedValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator(Object.values(CustomerTypeEnum)),
  body: Joi.object({}),
});
