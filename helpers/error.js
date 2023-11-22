exports.handleError = (err, req, res, next) => {
    console.log("Middleware Error Handling");
    const errStatus = err && err.statusCode || 500;
    const errMsg = err && err.message || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}

