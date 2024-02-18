import { CustomerTypeEnum } from '@enums/customer-type.enum';
import * as Joi from '@hapi/joi';
import { customerHeaderValidator } from '../../config/utils/joi-utils';

export const userGroupGetAllValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator([CustomerTypeEnum.SYSTEM]),
});

export const userGroupCreateValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator([CustomerTypeEnum.SYSTEM]),
  body: Joi.object({}),
});

export const userGroupUpdateValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator([CustomerTypeEnum.SYSTEM]),
  body: Joi.object({}),
});

export const userGroupDeleteValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator([CustomerTypeEnum.SYSTEM]),
  body: Joi.object({}),
});
