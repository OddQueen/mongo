const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(password) {
                return password.length >= 8;
            },
            message: 'La contraseña es demasiado corta'
        }
    }
});

userSchema.pre('save', function(next) {
    if (this.isModified('password') && this.password.length < 8) {
        console.log('La contraseña es demasiado corta');
    }
    next();
});

module.exports = mongoose.model('UserVal', userSchema);
