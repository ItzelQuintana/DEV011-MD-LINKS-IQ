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

function validateLinks (links) {
  const linkPromises = links.map((link) => {
    return axios.head(link.href)
      .then((response) => {
        link.status = response.status;
        link.ok = response.status >= 200 && response.status < 300 ? 'ok' : 'fail';
        return link;
      })
      .catch((error) => {
        link.status = error.response ? error.response.status : "N/A";
        link.ok = 'fail';
        return link;
      });
  });
  return Promise.all(linkPromises)
};

// function stats(links) {
//   const totalLinks = links.length;
//   const uniqueLinks = countUniqueLinks(links);

//   return `Total links: ${totalLinks}\nUnique links: ${uniqueLinks}`;
// }

// function countUniqueLinks(links) {
//   const uniqueLinksSet = new Set(links.map(link => link.href));
//   return uniqueLinksSet.size;
// }

function stats (links) {
  const uniqueLinks = links.filter((link, index) => {
     return links.indexOf(link) === index;
  })

    return {
      Total: links.length,
      Unique: uniqueLinks.length
    }
};
module.exports = { mdLinks, extractLinks, validateLinks, stats };

