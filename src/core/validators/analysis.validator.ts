import * as Joi from '@hapi/joi';
import { CustomerTypeEnum } from '@enums/customer-type.enum';
import { customerHeaderValidator } from '../../config/utils/joi-utils';

export const analysisCreateValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator(Object.values(CustomerTypeEnum)),
  body: Joi.object({
    status: Joi.string().required(),
    analysisCustomer: Joi.object({
      uuidRef: Joi.string().required(),
      containRestriction: Joi.boolean().default((parent) => parent.a === ''),
      restrictions: Joi.array().items({
        restrictionType: Joi.string().required(),
        description: Joi.string().required(),
        gravity: Joi.string().required(),
        analysisCustomerUuid: Joi.string(),
        analysisVehicleUuid: Joi.string(),
      }),
      documents: Joi.array().items({
        analysisCustomerUuid: Joi.string(),
        analysisVehicleUuid: Joi.string(),
      }),
    }),
    analysisVehicle: Joi.object({
      uuidRef: Joi.string().required(),
      containRestriction: Joi.boolean().default((parent) => parent.a === ''),
      restrictions: Joi.array().items({
        restrictionType: Joi.string().required(),
        description: Joi.string().required(),
        gravity: Joi.string().required(),
        analysisCustomerUuid: Joi.string(),
        analysisVehicleUuid: Joi.string(),
      }),
      documents: Joi.array().items({
        analysisCustomerUuid: Joi.string(),
        analysisVehicleUuid: Joi.string(),
      }),
    }),
  }),
});

export const analysisUpdateValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator(Object.values(CustomerTypeEnum)),
  body: Joi.object({}),
});

export const analysisGetAllValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator(Object.values(CustomerTypeEnum)),
});

export const analysisGetByIdValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator(Object.values(CustomerTypeEnum)),
});

export const analysisAssignValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator([CustomerTypeEnum.SYSTEM, CustomerTypeEnum.ANALYZER]),
  body: Joi.object({}),
});

export const analysisUpdateStatusValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator([CustomerTypeEnum.SYSTEM, CustomerTypeEnum.ANALYZER]),
  body: Joi.object({}),
});

export const analysisCancelValidator: Joi.ObjectSchema = Joi.object({
  headers: customerHeaderValidator([CustomerTypeEnum.SYSTEM, CustomerTypeEnum.ANALYZER]),
  body: Joi.object({}),
});
