import { CustomerTypeEnum } from '@enums/customer-type.enum';
import * as Joi from '@hapi/joi';
import { customerHeaderValidator } from '../../config/utils/joi-utils';

export const customerDocumentCreateValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator([CustomerTypeEnum.SYSTEM]),
});
export const customerDocumentUpdateValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator([CustomerTypeEnum.SYSTEM]),
});
export const customerDocumentGetAllValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator([CustomerTypeEnum.SYSTEM]),
});
export const customerDocumentGetByIdValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator([CustomerTypeEnum.SYSTEM]),
});
