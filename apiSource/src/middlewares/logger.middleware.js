import winston from "winston";

const { combine, timestamp, label, prettyPrint } = winston.format;

const loggerOptions = {
  level: "http",
  format: combine(timestamp(), prettyPrint()),
  defaultMeta: {
    service: "postaway-api",
  },
  transports: [
    new winston.transports.File({ filename: "./logs/postaway.log" }),
  ],
};

export const logger = winston.createLogger(loggerOptions);

export const winstonLogger = (request, response, next) => {
  let url = request.url;
  let reqBody = "User Data can not be logged.";
  if (!url.includes("/api/user")) {
    reqBody = JSON.stringify(request.body);
  }
  logger.http({ url: url, requestMethod: request.method });
  logger.info({ requestBody: reqBody });
  next();
};
