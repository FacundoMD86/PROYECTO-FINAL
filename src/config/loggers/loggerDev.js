import { createLogger, format, transports, addColors } from "winston";
const { colorize, simple } = format;

const levels = {
  ERROR: 1,
  WARN: 2,
  INFO: 3,
  HTTP: 4,
};
const colors = {
  ERROR: "red",
  WARN: "yellow",
  INFO: "blue",
  HTTP: "white",
};
addColors(colors);

export default createLogger({
  levels: levels,
  format: colorize(),
  transports: [
    new transports.Console({
      level: "HTTP",
      format: simple(),
    }),
    new transports.File({
      filename: "./errors.log",
      level: "WARN",
      format: simple(),
    }),
  ],
});
