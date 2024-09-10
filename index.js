const express = require('express');
const cors = require('cors');
const multer = require('multer')
require('dotenv').config()

const upload = multer();

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {

  const file = req.file;
  const fileName = file.originalname;
  const fileType = file.mimetype;
  const fileSize = file.size;

  res.json({
    name: fileName,
    type: fileType,
    size: fileSize,
  });

});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
