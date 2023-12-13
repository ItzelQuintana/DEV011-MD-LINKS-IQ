
const { mdLinks, stats, validateLinks } = require('./functions');
const filePath = 'README.md';
const validate = true;
const statsOption = true; // Puedes cambiarlo según tus necesidades

mdLinks(filePath, validate, statsOption)
  .then(links => {
    
    if (validate) {
      const validatedLinks = validateLinks(links);
      console.log('\nValidated Links:');
      console.log(validatedLinks);
    }

    if (statsOption) {
      const statistics = stats(links);
      console.log('\nStatistics:');
      console.log(statistics);
    }
  })
  .catch(error => {
    console.error(error);
  });
