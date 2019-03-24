const readXlsxFile = require('read-excel-file/node');
const genSection = require('./transpiler');

// File path.
readXlsxFile('./excel/nitin.xlsx').then((rows) => {
    // `rows` is an array of rows
    // each row being an array of cells.
    let arr = genSection.genSection(rows);
    console.log(arr);
  })