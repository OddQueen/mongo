let mongoose = require("mongoose");
let User = require("./userVal");
let Profile = require("./profileVal");
let Credentials = require("./credentialsVal");

const uri = "mongodb+srv://Queen:Qu33n@cluster0.avrecto.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
.then(() => {
    console.log('Conectado a DB');

let userDocument = new User({
        login: 'juan',
        password: 'password'  
    });

    return userDocument.save();
})
.then(res => {
    console.log('User creado:', res);

let profileDocument = new Profile({
        name: 'Juan',
        surname: 'Pérez',
        dateOfBirth: new Date('2010-01-30'),
        comments: [],
        rol: 'admin'
    });

    return profileDocument.save();
})
.then(res => {
    console.log('Profile creado:', res);

let credentialsDocument = new Credentials({
        address: '123 Calle Mayor',
        phone: 60000000,  
        email: 'juan@mail.com'
    });

    return credentialsDocument.save();
})
.then(res => {
    console.log('Credentials creado:', res);
})

.catch(err => {
    console.error('Error:', err);
});
