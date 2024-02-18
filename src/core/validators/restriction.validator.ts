import * as Joi from '@hapi/joi';
import { CustomerTypeEnum } from '@enums/customer-type.enum';
import { customerHeaderValidator } from '../../config/utils/joi-utils';

export const restrictionGetByAnalysisValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator(Object.values(CustomerTypeEnum)),
});
