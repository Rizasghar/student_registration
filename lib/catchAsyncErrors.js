const catchAsyncErrors = (catchAsyncErrors) => (req, res, next) => {
    Promise.resolve(catchAsyncErrors(req, res, next)).catch(next);
}

export default catchAsyncErrors;