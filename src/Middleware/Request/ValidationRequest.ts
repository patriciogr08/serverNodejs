import { Joi } from 'express-validation';

export const ACCESS_SERVICES_CUSTOM = {
  body: Joi.object({
    usuario: Joi.string().required().messages({
      'any.required': 'El campo usuario es obligatorio',
    }),
    password: Joi.string().required().messages({
      'any.required': 'El campo password es obligatorio',
    }),
    codigoWs: Joi.string().required().messages({
      'any.required': 'El campo codigoWs es obligatorio',
    }),
  }),
};

module.exports = {  
  ACCESS_SERVICES_CUSTOM,
}