import * as Joi from '@hapi/joi';

export const customerHeaderValidator = (dataValid: string[]) => Joi.object().keys({
  'x-parse-customer': Joi.string()
    .valid(...dataValid)
    .required().error((errors: any) => {
      errors.forEach((err) => {
        switch (err.code) {
          case 'any.required':
            err.message = 'Header: Custom error required';
            break;
          case 'any.valid':
            err.message = 'Header: Custom error validate';
            break;
          default:
            err.message = 'Header: Chave deve ser informada.';
            break;
        }
      });
      return errors;
    }),
});

export const userHeaderValidator = (dataValid: string[]) => Joi.object().keys({
  'X-Parse-User': Joi.string()
    .valid(...dataValid)
    .required().error((errors: any) => {
      errors.forEach((err) => {
        switch (err.code) {
          case 'any.required':
            err.message = 'Header: Custom error required';
            break;
          case 'any.valid':
            err.message = 'Header: Custom error validate';
            break;
          default:
            err.message = 'Header: Chave deve ser informada.';
            break;
        }
      });
      return errors;
    }),
});
