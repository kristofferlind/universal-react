import environment from '../config/environment';

const errorHandler = (err, req, res) => {
  let error = err;
  if (environment.isProduction) {
    error = {};
  }
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error
  });
};

export default errorHandler;
