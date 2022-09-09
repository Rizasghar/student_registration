const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";


    if (err && err.hasOwnProperty("code") && err.code === "ER_ACCESS_DENIED_ERROR") {
        err.statusCode = 403
        err.message = "Wrong DB Credientials"
    }




    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};


export default errorMiddleware;