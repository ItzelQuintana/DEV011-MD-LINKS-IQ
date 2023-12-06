const { mdLinks } = require('./functions');

const filePath = 'README.md';

mdLinks(filePath)
  .then(links => {
    console.log(links);
  })
  .catch(error => {
    console.error(error);
  });