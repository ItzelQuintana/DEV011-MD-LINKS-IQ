#!/usr/bin/env node
const { mdLinks, stats, validateLinks, statsWithValidate } = require('./functions');

function processCLI(filePath, validate, statsOption) {
  mdLinks(filePath, validate)
    .then(links => {
      if (validate && statsOption) {
        return validateLinks(links)
          .then(validatedLinks => {
            const result = statsWithValidate(validatedLinks);
            console.log(result);
          });
      } else if (validate) {
        return validateLinks(links)
          .then(validatedLinks => {
            console.log(validatedLinks);
          });
      } else if (statsOption) {
        const statistics = stats(links);
        console.log(statistics);
      } else {
        console.log(links);
      }
    })
    .catch(error => {
      console.error(error);
    });
}

// Verifica si se está ejecutando desde la línea de comandos
if (require.main === module) {
  // Obtén los argumentos de la línea de comandos
  const [, , filePath, ...flags] = process.argv;

  // Convierte los flags en un conjunto para facilitar la verificación
  const flagSet = new Set(flags);

  // Convierte los flags en booleanos
  const validate = flagSet.has("--validate");
  const statsOption = flagSet.has("--stats");

  // Llama a la función principal
  processCLI(filePath, validate, statsOption);
}

module.exports = { processCLI };