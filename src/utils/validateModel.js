const ValidationError = require('../models/responses/validationError');

function validateModel(model) {
    const error = model.validateSync();
    if (error) {
        const errorField = Object.keys(error.errors)[0];
        return new ValidationError(error.errors[errorField].path, error.errors[errorField].message);
    }
    return null;
}

module.exports = validateModel;