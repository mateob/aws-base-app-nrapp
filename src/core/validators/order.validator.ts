import { CustomerTypeEnum } from '@enums/customer-type.enum';
import * as Joi from '@hapi/joi';
import { customerHeaderValidator } from '../../config/utils/joi-utils';

export const orderCreateCalidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator([CustomerTypeEnum.SYSTEM]),
  body: Joi.object({}),
});
