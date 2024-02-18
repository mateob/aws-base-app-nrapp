import { CustomerTypeEnum } from '@enums/customer-type.enum';
import * as Joi from '@hapi/joi';
import { customerHeaderValidator } from '../../config/utils/joi-utils';

export const customerCreateValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator([CustomerTypeEnum.SYSTEM]),
  body: Joi.object({
    login: Joi.object({
      userName: Joi.string().required(),
      password: Joi.string().required(),
    }).required(),
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    document: Joi.string().required(),
    bithDate: Joi.date().required(),
    type: Joi.number().required(),
  }),
});

export const customerUpdateValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator([CustomerTypeEnum.SYSTEM]),
  body: Joi.object({}),
});

export const customerGetAllValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator([CustomerTypeEnum.SYSTEM, CustomerTypeEnum.COMPANY]),
  // userType: Joi.string().valid(['teno']).required(),
});

export const customerGetByIdValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator(Object.values(CustomerTypeEnum)),
});
