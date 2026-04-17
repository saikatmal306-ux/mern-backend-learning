const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 
    (res.statusCode && res.statusCode !== 200 ? res.statusCode : 500);

  let message = err.message;

  // 🔥 Handle Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;