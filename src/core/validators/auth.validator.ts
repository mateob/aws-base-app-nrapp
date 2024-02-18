import { CustomerTypeEnum } from '@enums/customer-type.enum';
import * as Joi from '@hapi/joi';
import { customerHeaderValidator } from '../../config/utils/joi-utils';

export const authRequestValidator: Joi.ObjectSchema = Joi.object({
  body: Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required(),
  }).required(),
});

export const changePasswordValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator(Object.values(CustomerTypeEnum)),
  body: Joi.object({
    userName: Joi.string().required(),
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  }),
});

export const authValidateToquenValidator: Joi.ObjectSchema = Joi.object({
  // colocar validador de header
});

export const registerNewUserValidator: Joi.ObjectSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    celular: Joi.string().pattern(/ˆ[1-9]{2}?:[2-8]|9[1-9][0-9]{3}[0-9]{4}$/)
      .messages({ 'string.pattern.base': 'Phone number must have 10 digits' })
      .required(),
    isWhatsapp: Joi.boolean().required(),
    userName: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.ref('password'),
  }),
});
