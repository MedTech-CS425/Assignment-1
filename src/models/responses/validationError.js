class validationError {
    constructor(field, message) {
        this.status = 'error';
        this.field = field;
        this.message = message;
    }
}

module.exports = validationError;