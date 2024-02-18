import { CustomerTypeEnum } from '@enums/customer-type.enum';
import { UserTypeEnum } from '@enums/user-type.enum';
import * as Joi from '@hapi/joi';
import { customerHeaderValidator, userHeaderValidator } from '../../config/utils/joi-utils';

export const userGetAllValidator: Joi.ObjectSchema = Joi.object({
  headers: userHeaderValidator([UserTypeEnum.INTERNAL]),
});

export const userGetByIdValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator([CustomerTypeEnum.SYSTEM]),
});

export const userSearchValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator([CustomerTypeEnum.SYSTEM]),
  // body: Joi.object({}),
});

export const userCreateValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator([CustomerTypeEnum.SYSTEM]),
  body: Joi.object({
    name: Joi.string().required(),
    userName: Joi.string().required(),
    password: Joi.string().required(),
    internal: Joi.boolean().required(),
    userGroupId: Joi.string().required(),
    userType: Joi.string().valid(Object.values(UserTypeEnum)).required(),
  }),
});

export const userUpdateValidator: Joi.ObjectSchema = Joi.object({
  // body: Joi.object({}),
});

export const userChangePasswordValidator: Joi.ObjectSchema = Joi.object({
  // body: Joi.object({}),
});

export const userDeleteValidator: Joi.ObjectSchema = Joi.object({
  // body: Joi.object({}),
});
