import * as express from 'express';
import * as validate from 'express-validation';
import controller from '../../controllers/auth';
import authValidation from '../../validations/auth';
const router = express.Router();

/**
 * @api {POST} /api/v1/auth/login
 * @apiDescription login
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup APP
 * @apiPermission public
 * 
 * @apiParam  {String}     email       Email(required)
 * @apiParam  {String}     password    Password(required)
 * 
 * @apiHeader {String} Content-Type application/json
 *
 * @apiSuccess (OK 200) {Number}     code         200=OK
 * @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
 * @apiSuccess (OK 200)  {String}    message      API Response message (Success)
 * @apiSuccess (OK 200) {Object[]}   result       result object
 * @apiSuccess (OK 200) {String}     appVersion   API version
 * 
 * @apiError (Bad Request 400)   {Boolean}    status    false
 * @apiError (Bad Request 400)   {String}     message   API Response message (username is required)
 * @apiError (Bad Request 400)   {Number}     code      400=Bad Request
 * @apiError (Bad Request 400)   {Object[]}   result    Blank Object
 * @apiError (Internal Server Error 500)   {Boolean}   status    false
 * @apiError (Internal Server Error 500)   {String}    message API Response message (Internal Server Error)
 * @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
 * @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
 * @apiSuccessExample {json} Success-Response:
 * 
 **/
router.route('/login').post(validate(authValidation.login),controller.login);
  
export default router;