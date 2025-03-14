const errorHandler = (err, res) => {
  const statusCode = res.statusCode < 400 ? 500 : res.statusCode;
  res.status(statusCode).json({ message: err.message });
};

export { errorHandler };
