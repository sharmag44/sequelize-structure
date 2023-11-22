exports.handleError = (err, req, res, next) => {
    const name = process.env.NODE_ENV;
    console.log("Middleware Error Handling");
    const errStatus = err && err.statusCode || 500;
    const errMsg = err && err.message || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: name === 'develop' || name == "dev" ? err.stack : {}
    })
}

