import _ from 'lodash';
import { ErrorCodes } from '../';

export function validationErrorHandler(err) {
  const validationError = ErrorCodes.px_0001;

  let errorResponse = {
    status: validationError.statusCode,
    message: validationError.message,
    code: validationError.errorCode,
    errors: [],
  };

  _.forEach(err.errors, (item) => {
    errorResponse.errors.push({
      field: item.field,
      messages: item.messages,
    });
  });

  // res.status(validationError.statusCode).json(errorResponse);
  return { statusCode: validationError.statusCode, errorResponse };
}
