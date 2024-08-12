import jwt from "jsonwebtoken";
import PostawayError from "../suppliments/postawayError.js";

// secret key for encrypting and decrypting jwt authentication tokens - md5 hash of 'postaway'
export const secretKey = `4efc8f1307370fe86431c12adb5903ff`;

export const jwtAuthMiddleware = (request, response, next) => {
  let token = null;
  if ("authorization" in request.headers) {
    token = request.headers["authorization"];
  }

  if (token) {
    try {
      const payload = jwt.verify(token, secretKey);
      request.user = payload;
      next();
    } catch (error) {
      throw new PostawayError(401, "Unauthorized Access - Invalid Token!");
    }
  } else {
    throw new PostawayError(401, "Unauthorized Access - No Token Provided !");
  }
};
