const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const readXlsxFile = require('read-excel-file/node');
const genSection = require('./transpiler');

// default options
app.use(fileUpload());

app.post('/upload', function (req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  //console.log(req.files);

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  //console.log(sampleFile);
  sampleFile.forEach((file) => {
    console.log(file)
    // Use the mv() method to place the file somewhere on your server
    if(file.name.match(/.xlsx/)){
      file.mv(`./excel/${file.name}`, function (err) {
        if (err)
          return res.status(500).send(err);
  
        readXlsxFile(`./excel/${file.name}`).then((rows) => {
          // `rows` is an array of rows
          // each row being an array of cells.
          let arr = genSection.genSection(rows);
          console.log(arr);
        })
        
  
      });
    }
    
    else if(file.name.match(/.jpg/)||file.name.match(/.png/)){
      file.mv(`./image/${file.name}`, function (err) {
        if (err)
          return res.status(500).send(err);
  
        //res.send('File uploaded!');
  
      });
    }

    else if(file.name.match(/.mp3/)){
      file.mv(`./audio/${file.name}`, function (err) {
        if (err)
          return res.status(500).send(err);
  
        //res.send('File uploaded!');
  
      });
    }
  });
  res.send('File uploaded!');

});

app.listen(8000, function () {
  console.log("started in port 8000")
});