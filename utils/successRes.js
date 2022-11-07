const successRes = (success, message, statusCode, res) => {
    res.status(statusCode).json({
        success,
        message
    })
}

export default successRes;