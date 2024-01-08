import loggers from "../config/loggers/factory.js";

const errorHandler = (error, req, res, next) => {
  req.logger = loggers;
  if (`${error.statusCode}`.startsWith("4")) {
    loggers.ERROR(
      `${req.method} ${req.url} - ${new Date().toLocaleTimeString()} - ${
        error.message
      }`
    );
  } else {
    loggers.FATAL(
      `${req.method} ${req.url} - ${new Date().toLocaleTimeString()} - ${
        error.message
      }`
    );
  }
  return res.status(error.statusCode).json({
    method: req.method,
    path: req.url,
    message: error.message,
  });
};

export default errorHandler;

/*
export default (error, req, res, next) => {
  console.log(error);
  return res.status(500).json({
    success: false,
    messae: error.message,
  });
};*/