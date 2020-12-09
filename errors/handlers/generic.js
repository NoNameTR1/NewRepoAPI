import expressValidation from 'express-validation';
import { validationErrorHandler } from './validation';
import { ErrorCodes } from '../';
import $Error from '../../plugins/errors/$Error';

// as befits the name implies. Seems like little complex (at first glance) but actually easy to understand.

export function genericErrorHandler(error, exposeStackTrace) {
  const generalError = ErrorCodes.px_0000;
  if (error instanceof expressValidation.ValidationError) {
    return validationErrorHandler(error);
  } else if (error instanceof $Error) {
    let response = {
      code: error.getCode(),
      message: error.getMessage(),
    };

    if (exposeStackTrace) {
      response.stack = error.stack;
    }

    if (error.getPayload()) {
      response.payload = error.getPayload();
    }

    // res.status(error.getStatus()).json(response);
    return { status: error.getStatus(), response };
  } else {
    const errorResponse = {
      status: error.statusCode || 500,
      message: error.message || generalError.message,
      code: error.errorCode || generalError.errorCode,
      stackTrace: error.stack,
    };

    if (!exposeStackTrace) {
      delete errorResponse.stackTrace;
    }

    //  new ErrorLog({ ...errorResponse }, `errors_api:cry`).send();
    return { status: errorResponse.status, response: errorResponse };
  }
}