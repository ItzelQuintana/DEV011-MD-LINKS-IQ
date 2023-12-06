
// Importa las funciones necesarias de Jest y tu archivo functions.js
const { mdLinks, extractLinks, validateLinks, validateLink } = require('../src/functions');
const fs = require('fs').promises;
const path = require('path');
// const axios = require('axios');
// const MockAdapter = require('axios-mock-adapter');

// Configura el adaptador de axios
// const mockAxios = new MockAdapter(axios);

describe('extractLinks', () => {
  it('should extract links from given data and file path', () => {
    // Datos de prueba
    const data = 'Este es un [enlace1](http://example.com) y aquí está otro [enlace2](http://example2.com)';
    const filePath = '/ruta/del/archivo.md';

    // Llama a la función extractLinks
    const result = extractLinks(data, filePath);

    // Verifica el resultado
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);

    // Verifica las propiedades del primer enlace
    expect(result[0]).toHaveProperty('href', 'http://example.com');
    expect(result[0]).toHaveProperty('text', 'enlace1');
    expect(result[0]).toHaveProperty('file', '/ruta/del/archivo.md');

    // Verifica las propiedades del segundo enlace
    expect(result[1]).toHaveProperty('href', 'http://example2.com');
    expect(result[1]).toHaveProperty('text', 'enlace2');
    expect(result[1]).toHaveProperty('file', '/ruta/del/archivo.md');
  });

  it('should handle no links in the data', () => {
    // Datos de prueba sin enlaces
    const data = 'Este es un texto sin enlaces';
    const filePath = '/ruta/del/archivo.md';

    // Llama a la función extractLinks
    const result = extractLinks(data, filePath);

    // Verifica que el resultado sea un array vacío
    expect(result).toEqual([]);
  });

  // Puedes agregar más casos de prueba según sea necesario
});

describe('validateLinks', () => {
  it('should validate an array of links and return an array of results', () => {
    // Datos de prueba
    const links = [
      { href: 'http://example.com', text: 'Link1', file: '/ruta/del/archivo.md' },
      { href: 'http://example2.com', text: 'Link2', file: '/ruta/del/archivo.md' },
    ];

    // Mock de la función validateLink
    jest.mock('../src/functions', () => ({
      validateLink: jest.fn(link => Promise.resolve({ ...link, status: 200, ok: 'ok' })),
    }));

    // Llama a la función validateLinks
    return validateLinks(links).then(results => {
      // Verifica que el resultado sea un array
      expect(results).toBeInstanceOf(Array);
      // Verifica que haya la misma cantidad de resultados que de enlaces
      expect(results).toHaveLength(2);
      // Verifica que cada resultado tenga las propiedades adecuadas
      results.forEach(result => {
        expect(result).toHaveProperty('href');
        expect(result).toHaveProperty('text');
        expect(result).toHaveProperty('file');
        expect(result).toHaveProperty('status');
        expect(result).toHaveProperty('ok');
      });
    });
  });

  it('should handle an empty array of links', () => {
    // Llama a la función validateLinks con un array vacío
    return validateLinks([]).then(results => {
      // Verifica que el resultado sea un array vacío
      expect(results).toEqual([]);
    });
  });

  // Puedes agregar más casos de prueba según sea necesario
});


// // Mock para fs.readFile
// jest.mock('fs').promises;

// describe('mdLinks', () => {
//   it('should handle file read error', () => {
//     // Datos de prueba
//     const filePath = '/ruta/del/archivo.md';
//     const expectedError = new Error('Error de lectura de archivo');

//     // Configura el mock para fs.readFile (simula error)
//     fs.readFile.mockImplementation(() => Promise.reject(expectedError));

//     // Llama a la función mdLinks
//     return mdLinks(filePath, false).catch(error => {
//       // Verifica que la función maneje adecuadamente el error de lectura de archivo
//       expect(error).toEqual(expectedError);
//     });
//   });

//   // Puedes agregar más casos de prueba según sea necesario
// });




// describe('validateLink', () => {
//   it('should validate a link and return the result', () => {
//     // Datos de prueba
//     const link = { href: 'http://example.com', text: 'Link1', file: '/ruta/del/archivo.md' };

//     // Configura el mock para simular una solicitud HEAD exitosa
//     mockAxios.onHead(link.href).reply(200);

//     // Llama a la función validateLink
//     return validateLink(link).then(result => {
//       // Verifica que el resultado tenga las propiedades adecuadas
//       expect(result).toHaveProperty('href', 'http://example.com');
//       expect(result).toHaveProperty('text', 'Link1');
//       expect(result).toHaveProperty('file', '/ruta/del/archivo.md');
//       expect(result).toHaveProperty('status', 200);
//       expect(result).toHaveProperty('ok', 'ok');
//     });
//   });

//   it('should handle a failed HEAD request and return the result', () => {
//     // Datos de prueba
//     const link = { href: 'http://nonexistent.com', text: 'Link2', file: '/ruta/del/archivo.md' };

//     // Configura el mock para simular una solicitud HEAD fallida
//     mockAxios.onHead(link.href).reply(404);

//     // Llama a la función validateLink
//     return validateLink(link).then(result => {
//       // Verifica que el resultado tenga las propiedades adecuadas
//       expect(result).toHaveProperty('href', 'http://nonexistent.com');
//       expect(result).toHaveProperty('text', 'Link2');
//       expect(result).toHaveProperty('file', '/ruta/del/archivo.md');
//       expect(result).toHaveProperty('status', 404);
//       expect(result).toHaveProperty('ok', 'fail');
//     });
//   });

//   // Puedes agregar más casos de prueba según sea necesario
// });