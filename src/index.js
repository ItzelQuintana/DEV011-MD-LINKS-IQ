
const mdLinks = require('./functions');
const cli = require('./CLI');

const filePath = './ruta/al/archivo.md';

mdLinks(filePath)
  .then(links => {
    console.log(links);
  })
  .catch(error => {
    console.error(error);
  });

// Puedes agregar aquí llamadas a otras funciones o módulos según sea necesario