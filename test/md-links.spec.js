const mdLinks = require('../src');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  //it('Debería devolver una promesa', () => {
  //  expect(mdLinks()).toBe(typeof Promise)
  //});
  it('Debería rechazar cuando la ruta no existe', () => {
    return mdLinks('/itzel/laboratoria/proyecto.md').catch((error) =>{
    expect(error).toBe('La ruta no existe')
  
  it('should replace relative path with absolute path ', () => {
    const filePath = './README.md'; // Reemplaza con la ruta a tu archivo
    const functionMdLinks = convertPaths(filePath)
    return functionMdLinks.then((result)=> {
      expect(result).toEqual(path.resolve(filePath));
    });
  });
});
});
})