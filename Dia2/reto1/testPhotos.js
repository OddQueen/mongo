const {
    subirFotos,
    obtenerFotos,
    modificarFotos,
    eliminarFoto,
    eliminarTodas
} = require('./funciones');

const testPhotos = [
    {
        nombre: 'juan',
        url: 'https://picsum.photos/id/27/200/300',
        titulo: 'Foto de Juan',
        descripcion: 'Tsunami'
    },
    {
        nombre: 'maria',
        url: 'https://picsum.photos/id/236/200/300',
        titulo: 'Foto de Maria',
        descripcion: 'Playa'
    },
    {
        nombre: 'pedro',
        url: 'https://picsum.photos/id/237/200/300',
        titulo: 'Foto de Pedro',
        descripcion: 'Yak'
    },
    {
        nombre: 'ana',
        url: 'https://picsum.photos/id/238/200/300',
        titulo: 'Foto de Ana',
        descripcion: 'Perrito'
    }
];

const pruebas = async () => {
    for (let photoData of testPhotos) {
        await subirFotos(photoData.nombre, photoData.url, photoData.titulo, photoData.descripcion);
    }

    console.log("Obteniendo fotos de 'juan'");
    await obtenerFotos('juan');

    console.log("Modificando descripción de 'Foto de Juan'");
    await modificarFotos('Foto de Juan', 'Nueva descripción para Tsunami');

    console.log("Obteniendo fotos de 'juan' después de modificar");
    await obtenerFotos('juan');

    console.log("Eliminando 'Foto de Juan'");
    await eliminarFoto('juan', 'Foto de Juan');

    console.log("Obteniendo fotos de 'juan' después de eliminar");
    await obtenerFotos('juan');

    console.log("Eliminando todas las fotos de 'maria'");
    await eliminarTodas('maria');

    console.log("Obteniendo fotos de 'maria' después de eliminar todas");
    await obtenerFotos('maria');

    console.log("Obteniendo fotos de 'pedro'");
    await obtenerFotos('pedro');

    console.log("Obteniendo fotos de 'ana'");
    await obtenerFotos('ana');
};

pruebas();
