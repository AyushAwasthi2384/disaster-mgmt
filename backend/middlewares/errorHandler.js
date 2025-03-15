import process from "node:process";

const errorHandler = (err, req, res) => {
  const statusCode =
    res.statusCode && res.statusCode < 400 ? 500 : res.statusCode || 500;
    
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { errorHandler };
