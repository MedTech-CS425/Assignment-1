const ValidationError = require('../responses/validationError');

class LoginRequest {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    validate() {
        if (!this.email) {
            return new ValidationError('email', 'Missing email is required');
        }
        if (!this.password) {
            return new ValidationError('password', 'Missing password is required');
        }
        return null;
    }
}

module.exports = LoginRequest;