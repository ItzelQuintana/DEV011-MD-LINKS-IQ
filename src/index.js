#!/usr/bin/env node
const { processCLI } = require('./cli');

const filePath = process.argv[2] || 'README.md';  // Cambio aquí para permitir una ruta dinámica
const validate = process.argv.includes("--validate");
const statsOption = process.argv.includes("--stats");

processCLI(filePath, validate, statsOption);
