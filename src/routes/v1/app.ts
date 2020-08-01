import * as express from 'express';
import * as validate from 'express-validation';
import controller from '../../controllers/app';
import authValidation from '../../validations/auth';
import TokenHandler from '../../middlewares/auth';
const router = express.Router();


/**
 * @api {GET} /api/v1/app/assets Asset List
 * @apiDescription get asset list
 * @apiVersion 1.0.0
 * @apiName AssetList
 * @apiGroup APP
 * @apiPermission private
 *
 * @apiHeader {String} Content-Type application/json
 * 
 * @apiHeader {String} x-access-token {token}
 *
 * @apiSuccess (OK 200) {Number}     code         200=OK
 * @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
 * @apiSuccess (OK 200)  {String}    message      API Response message (Success)
 * @apiSuccess (OK 200) {Object[]}   result       result object
 * @apiSuccess (OK 200) {String}     appVersion   API version
 * @apiError (Bad Request 400)   {Boolean}    status    false
 * @apiError (Bad Request 400)   {String}     message   API Response message (username is required)
 * @apiError (Internal Server Error 500)   {Boolean}   status    false
 * @apiError (Internal Server Error 500)   {String}    message
 * @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
 * @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
 * @apiSuccessExample {json} Success-Response:
 * 
 **/
router.route('/assets').get(TokenHandler.authorize(), controller.assetList);

/**
 * @api {POST} /api/v1/app/aseet
 * @apiDescription create aseet
 * @apiVersion 1.0.0
 * @apiName create aseet
 * @apiGroup APP
 * @apiPermission public
 * 
 * @apiParam  {String}     name           (required)
 * @apiParam  {String}     ethAddress     (required)
 * @apiParam  {String}     assetAddress   (required)
 * @apiParam  {String}     symbol         (optional)
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
router.route('/asset').post(TokenHandler.authorize(), validate(authValidation.addAsset), controller.addAsset);

/**
 * @api {GET} /api/v1/app/asset/logs Asset Logs List
 * @apiDescription get asset logs list
 * @apiVersion 1.0.0
 * @apiName AssetLogList
 * @apiGroup APP
 * @apiPermission private
 *
 * @apiHeader {String} Content-Type application/json
 * 
 * @apiHeader {String} x-access-token {token}
 *
 * @apiSuccess (OK 200) {Number}     code         200=OK
 * @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
 * @apiSuccess (OK 200)  {String}    message      API Response message (Success)
 * @apiSuccess (OK 200) {Object[]}   result       result object
 * @apiSuccess (OK 200) {String}     appVersion   API version
 * @apiError (Bad Request 400)   {Boolean}    status    false
 * @apiError (Bad Request 400)   {String}     message   API Response message (username is required)
 * @apiError (Internal Server Error 500)   {Boolean}   status    false
 * @apiError (Internal Server Error 500)   {String}    message
 * @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
 * @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
 * @apiSuccessExample {json} Success-Response:
 * 
 **/
router.route('/asset/logs').get(TokenHandler.authorize(),validate(authValidation.assetLogs), controller.logsList);
export default router;