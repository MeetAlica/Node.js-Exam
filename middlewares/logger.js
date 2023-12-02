const logRequest = (req, res, next) => {
  console.log(`Method: ${req.method}, Path: ${req.path}`);
  next();
};

export default logRequest;
