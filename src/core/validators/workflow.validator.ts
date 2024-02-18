import { CustomerTypeEnum } from '@enums/customer-type.enum';
import * as Joi from '@hapi/joi';
import { customerHeaderValidator } from '../../config/utils/joi-utils';

export const workflowGetAllValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator(Object.values(CustomerTypeEnum)),
});

export const workflowGetByIdValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator(Object.values(CustomerTypeEnum)),
});

export const workflowCreateValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator(Object.values(CustomerTypeEnum)),
  body: Joi.object({}),
});

export const workflowAssignValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator([CustomerTypeEnum.ANALYZER]),
  body: Joi.object({}),
});

export const workflowUpdateValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator(Object.values(CustomerTypeEnum)),
  body: Joi.object({}),
});

export const workflowRemoveValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator(Object.values(CustomerTypeEnum)),
  body: Joi.object({}),
});
