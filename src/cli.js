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

module.exports = { processCLI };