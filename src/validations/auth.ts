import * as Joi from 'joi';

export default {
  login: {
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    })
  },
  addAsset: {
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    }),
    body: Joi.object().keys({
      name: Joi.string().required(),
      ethAddress: Joi.string().required(),
      assetAddress: Joi.string().required(),
      symbol: Joi.string().optional()
    })
  }

}
