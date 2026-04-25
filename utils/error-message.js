function createError(message, code = 500) {
        const err = new Error(message);
        err.status = code;
        return err;
    }


module.exports = createError;