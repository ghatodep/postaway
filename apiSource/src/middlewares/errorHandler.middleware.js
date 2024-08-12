import PostawayError from "../suppliments/postawayError.js";
import { logger } from "../middlewares/logger.middleware.js";

const errorHandler = (error, request, response, next) => {
  if (error instanceof PostawayError) {
    // handling custom errors
    console.log(`Error - ${error.statusCode} ~ ${error.message}`);
    logger.error({ statusCode: error.statusCode, errorMessage: error.message });
    return response
      .status(error.statusCode)
      .send({ success: false, message: error.message });
  } else {
    // handling unexpected errors
    console.log(`Unknown Error - ${error.message}`);
    logger.error({
      statusCode: 500,
      errorMessage: error.message,
      errorStack: error,
    });
    return response.status(500).send({
      success: false,
      message: "Oops! Something went wrong. Please try again after some time.",
    });
  }
};

export default errorHandler;
