//statusCode gets the value whatever the error has status if not default is 500 - server error
const errorHandler = (err, req, res, next) => {
    //err.stack helps usknow the error in detail
    console.error(err.stack);
  
    const statusCode = err.statusCode || 500;
  
    res.status(statusCode).json({
      success: false,
      message: err.message || 'Server Error'
    });
  };
  
  export default errorHandler;
  