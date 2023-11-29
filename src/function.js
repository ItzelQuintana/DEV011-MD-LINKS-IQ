const path = require("path");
const fs = require("fs");
const http = require("https");

const absolutePath = (route) => path.resolve(route);

const validar = (route) => fs.existsSync(route);


//Extraer enlances de un archivo

const extractLinks = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const links = [];
        let match;
        while ((match = regex.exec(data)) !== null) {
          links.push({
            href: match[2], // URL del enlace
            text: match[1], // Texto del enlace
            file: filePath, // Ruta del archivo
          });
        }
        resolve(links);
      }
    });
  });
};

const validateLinks = (link) => {
  return new Promise((resolve, reject) => {
    const request = http.get(link, response => {
      const { statusCode } = response;
      let status = statusCode;
      let ok = statusCode >= 200 && statusCode < 400 ? 'ok' : 'fail';

      resolve({
        href: link,
        status: status,
        ok: ok
      });
      request.on('error', error => {
        reject(new Error('not supported'));
      });
  });
})};

module.exports = { absolutePath, validar, extractLinks, validateLinks };