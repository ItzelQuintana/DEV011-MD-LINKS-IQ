const mdLinks = require('./functions');
const filePath = 'README.md';
const validate = true;


mdLinks(filePath,validate)
  .then(links => {
    console.log(links);
  })
  .catch(error => {
    console.error(error);
  });