
const { mdLinks, stats } = require('./functions');
const filePath = 'README.md';
const validate = true;
const statsOption = process.argv.includes("--stats");

mdLinks(filePath, validate)
  .then(links => {
    if (statsOption) {
      const statistics = stats(links);
      console.log(statistics);
    } else {
      console.log(links);
    }
  })
  .catch(error => {
    console.error(error);
  });