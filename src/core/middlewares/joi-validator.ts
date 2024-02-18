/* eslint-disable consistent-return */
import * as Joi from '@hapi/joi';
import { StatusCodes } from 'http-status-codes';

const joiValidateOptions: Joi.ValidationOptions = {
  abortEarly: false,
  errors: { wrap: { label: '' } },
  allowUnknown: true,
};

export const joiValidator = (schema: Joi.ObjectSchema) => {
  const joiValidatorBefore = async (request) => {
    const { event } = request;
    const { error }: Joi.ValidationResult = schema.validate(event, joiValidateOptions);
    if (error) {
      const errors = error.details.map((detail: any) => {
        return { key: detail.context.key, message: detail.message };
      });
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: JSON.stringify({ errors }),
      };
    }
  };
  return {
    before: joiValidatorBefore,
  };
};
