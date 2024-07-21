const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value <= new Date();
            },
            message: 'La fecha de nacimiento no puede ser futura'
        }
    },
    comments: {
        type: [String],
        default: []
    },
    rol: {
        type: String,
        enum: ['admin', 'teacher', 'student'],
        required: true
    }
});

profileSchema.pre('save', function(next) {
    const age = new Date().getFullYear() - this.dateOfBirth.getFullYear();
    if (age > 18) {
        console.log('Eres mayor de edad');
        next();
    } else {
        console.log('Solo mayores de 18');
        next(new Error('Solo mayores de 18'));
    }
});

module.exports = mongoose.model('ProfileVal', profileSchema);
