const fs = require('fs').promises;
const path = require('path');

function mdLinks(filePath) {
  const absolutePath = path.resolve(filePath);

  return fs.readFile(absolutePath, 'utf-8')
    .then(data => {
      const links = extractLinks(data, absolutePath);
      return links;
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

function extractLinks(data, filePath) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links = [];
  let match;

  while ((match = regex.exec(data)) !== null) {
    links.push({
      href: match[2],
      text: match[1],
      file: filePath,
    });
  }

  return links;
}

module.exports = { mdLinks }; // Cambiado para exportar un objeto con mdLinks

