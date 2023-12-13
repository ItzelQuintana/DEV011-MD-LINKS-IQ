
const { mdLinks, stats } = require('./functions');
const cli = require('./cli');
const validate = process.argv.includes("--validate");
const statsOption = process.argv.includes("--stats");

const filePath = './ruta/al/archivo.md';

mdLinks(filePath, validate, statsOption)
  .then(links => {
    
    if (statsOption) {
      const statistics = stats(links);
      console.log(statistics);
    }
  })
  .catch(error => {
    console.error(error);
  });

