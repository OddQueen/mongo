const mongoose = require('mongoose');

const credentialsSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value.toString().length === 9;
            },
            message: 'El número de teléfono debe contener 9 dígitos'
        }
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/
    }
});

module.exports = mongoose.model('CredentialsVal', credentialsSchema);
