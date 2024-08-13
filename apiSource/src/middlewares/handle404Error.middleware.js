import PostawayError from "../suppliments/postawayError.js";

const handle404Error = (request, response, next) => {
  throw new PostawayError(
    404,
    `Requested ${request.method} api ${request.url} not found. Go through api documentation for more details - http://localhost:1298/docs`
  );
};

export default handle404Error;
