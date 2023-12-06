const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

function mdLinks(filePath, validate) {
  const absolutePath = path.resolve(filePath);

  return fs.readFile(absolutePath, 'utf-8')
    .then(data => {
      const links = extractLinks(data, absolutePath);
      if (validate) {
        // Si validate es true, realizar validación de los links
        return validateLinks(links);
      } else {
        // Si validate es false o undefined, devolver los links sin validación
        return links;
      }
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

function validateLinks(links) {
  const promises = links.map(link => validateLink(link));
  return Promise.all(promises);
}

function validateLink(link) {
  return axios.head(link.href)
    .then(response => {
      const status = response.status;
      const ok = status >= 200 && status < 300 ? 'ok' : 'fail';

      return {
        ...link,
        status,
        ok,
      };
    })
    .catch(error => {
      const status = error.response ? error.response.status : 404;
      const ok = 'fail';

      return {
        ...link,
        status,
        ok,
      };
    });
}

module.exports = mdLinks;