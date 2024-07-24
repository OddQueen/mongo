const mongoose = require('mongoose');
const Photos = require('./photos');

const uri = "mongodb+srv://Queen:Qu33n@cluster0.avrecto.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
    .then(() => {
        console.log('Conectado a DB');
    })
    .catch(error => {
        console.log('Error al conectar a la DB:', error);
    });

async function subirFotos(nombre, url, titulo, descripcion) {
    let photosDocument = {
        nombre: nombre,
        url: url,
        titulo: titulo,
        descripcion: descripcion
    };

    try {
        let res = await Photos.create(photosDocument);
        console.log("Documento guardado correctamente");
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

async function obtenerFotos(nombre) {
    try {
        let res = await Photos.find({ nombre: nombre });
        console.log("Fotos encontradas");
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

async function modificarFotos(titulo, descripcion) {
    try {
        let res = await Photos.updateOne({ titulo: titulo }, { descripcion: descripcion });
        console.log("Foto modificada");
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

async function eliminarFoto(nombre, titulo) {
    try {
        let res = await Photos.deleteOne({ nombre: nombre, titulo: titulo });
        console.log("Foto eliminada");
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

async function eliminarTodas(nombre) {
    try {
        let res = await Photos.deleteMany({ nombre: nombre });
        console.log("Todas las fotos eliminadas");
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    subirFotos,
    obtenerFotos,
    modificarFotos,
    eliminarFoto,
    eliminarTodas
};
