let mongoose = require("mongoose");
let User = require("./userMDB");
let Profile = require("./profileMDB");
let Credentials = require("./credentialsMDB");

const uri = "mongodb+srv://Queen:Qu33n@cluster0.avrecto.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
.then(() => {
    console.log('Conectado a DB');

let userDocument = new User({
        login: 'juan',
        password: 'password123'
    });

    return userDocument.save();
})
.then(res => {
    console.log('User creado:', res);

let profileDocument = new Profile({
        name: 'Juan',
        surname: 'Pérez',
        dateOfBirth: new Date('2000-01-30'), 
        comments: [],
        rol: 'admin'
    });

    return profileDocument.save();
})
.then(res => {
    console.log('Profile creado:', res);

let credentialsDocument = new Credentials({
        address: '123 Calle Mayor',
        phone: 600000000,
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
