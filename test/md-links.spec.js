
// Importa las funciones necesarias de Jest y tu archivo functions.js
const { mdLinks, extractLinks, validateLinks, validateLink, stats, statsWithValidate } = require('../src/functions');
const fs = require('fs').promises;
const path = require('path');


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

  
});


describe('stats', () => {
  it('debería devolver un objeto con las estadísticas correctas', () => {
    const links = [
      { href: 'http://example.com', text: 'Link 1', file: '/ruta/archivo.md' },
      { href: 'http://example.com', text: 'Link 2', file: '/ruta/archivo.md' },
      { href: 'http://example2.com', text: 'Link 3', file: '/ruta/archivo.md' },
    ];

    const result = stats(links);

    expect(result).toEqual({
      Total: 3,
      Unique: 2,
    });
  });
});


describe('statsWithValidate', () => {
  it('debería devolver un objeto con las estadísticas correctas', () => {
    const validatedLinks = [
      { href: 'http://example.com', text: 'Link 1', file: '/ruta/archivo.md', ok: 'ok' },
      { href: 'http://example.com', text: 'Link 2', file: '/ruta/archivo.md', ok: 'ok' },
      { href: 'http://example2.com', text: 'Link 3', file: '/ruta/archivo.md', ok: 'fail' },
    ];

    const result = statsWithValidate(validatedLinks);

    expect(result).toEqual({
      Total: 3,
      Unique: 2,
      Active: 2,
      Broken: 1,
    });
  });
});


// jest.mock('fs').promises;

// describe('mdLinks', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('debería devolver los enlaces sin validación cuando validate es false o undefined', () => {
//     const filePath = '/ruta/al/archivo.md';
//     const fileContent = '[Link1](http://example.com)\n[Link2](http://example2.com)';
    
//     // Establecer la implementación manual para fs.promises.readFile
//     fs.readFile = jest.fn().mockResolvedValue(fileContent);

//     return mdLinks(filePath, false).then(result => {
//       expect(result).toEqual([
//         { href: 'http://example.com', text: 'Link1', file: filePath },
//         { href: 'http://example2.com', text: 'Link2', file: filePath },
//       ]);
//       expect(fs.readFile).toHaveBeenCalledWith(path.resolve(filePath), 'utf-8');
//     });
//   });

//   it('debería devolver los enlaces con validación cuando validate es true', () => {
//     const filePath = '/ruta/al/archivo.md';
//     const fileContent = '[Link1](http://example.com)\n[Link2](http://example2.com)';
//     const validatedLinks = [
//       { href: 'http://example.com', text: 'Link1', file: filePath, status: 200, ok: 'ok' },
//       { href: 'http://example2.com', text: 'Link2', file: filePath, status: 404, ok: 'fail' },
//     ];

//     // Establecer la implementación manual para fs.promises.readFile y validateLinks
//     fs.readFile = jest.fn().mockResolvedValue(fileContent);
//     validateLinks.mockResolvedValue(validatedLinks);

//     return mdLinks(filePath, true).then(result => {
//       expect(result).toEqual(validatedLinks);
//       expect(fs.readFile).toHaveBeenCalledWith(path.resolve(filePath), 'utf-8');
//       expect(validateLinks).toHaveBeenCalledWith([
//         { href: 'http://example.com', text: 'Link1', file: filePath },
//         { href: 'http://example2.com', text: 'Link2', file: filePath },
//       ]);
//     });
//   });

//   // Otros casos de prueba...

// });

