#!/usr/bin/env node
const { processCLI } = require('./cli');

function mdLinks(filePath, options = { validate: false, stats: false }) {
  const { validate, stats } = options;
  processCLI(filePath, validate, stats);
}

module.exports = { mdLinks };