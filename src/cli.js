
const { mdLinks, stats, validateLinks, statsWithValidate } = require('./functions');
const filePath = 'README.md';
const validate = process.argv.includes("--validate");
const statsOption = process.argv.includes("--stats");

mdLinks(filePath, validate)
  .then(links => {
    if (validate && statsOption) {
      // Si paso ambas
      return validateLinks(links)
        .then(validatedLinks => {
          const result = statsWithValidate(validatedLinks);
          console.log(result);
        });
    } else if (validate) {
      // Si solo paso --validate
      return validateLinks(links)
        .then(validatedLinks => {
          console.log(validatedLinks);
        });
    } else if (statsOption) {
      //Si solo paso --stats
      const statistics = stats(links);
      console.log(statistics);
    } else {
      
      console.log(links);
    }
  })
  .catch(error => {
    console.error(error);
  });