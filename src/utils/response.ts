// eslint-disable-next-line no-unused-vars
import * as express from 'express';
import { version } from '../config/constants';
import { errorManager } from '../config/errorManager';

class CustomResponse {
  result: any;

  response: express.Response;

  status: boolean;

  message: string;

  messageText: string;

  version: string = version.v1;

  code: number = 200;

  /**
   *
   * @param {*} res
   * @param {*} successStatus
   * @param {*} status
   * @param {*} message
   * @param {*} appVersion
   * @param {*} result
   * @param {*} platformstatus
   */
  setResponse(
    response: express.Response,
    options: any = {
      status: true,
      message: null,
      result: null,
      messageText: null
    }
  ) {
    this.response = response;
    this.status = options.status;
    this.result = options.result;
    this.message = options.message;

    if (!this.message) {
      this.messageText = 'success';
      this.message = 'SUCCESS';
      this.code = 200;
      this.status = true;
    }
    else {
      let found = false;
      Object.keys(errorManager).find((key) => {
        if (errorManager[key].type === this.message) {
          this.messageText = errorManager[key]['message'];
          this.code = errorManager[key]['code'];
          found = true;
        }
      });

      if (!found) {
        this.message = 'UNKNOWN_ERROR';
        this.code = 500;
        this.messageText = options.messageText;
      }
    }

    this.makeResponse();
  }

  /**
   * making response format
   */
  makeResponse() {
    // TODO : think for the cors policy
    this.response.set('Access-Control-Allow-Origin', '*');
    this.response.status(this.code).send({
      status: this.status,
      messageCode: this.message,
      message: this.messageText,
      version: this.version,
      result: (this.result === null || this.result === 'null' || this.result === '') ? [] : this.result
    });
  }
}

// exporting all functions
export default CustomResponse;
