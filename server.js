const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.static('public'));
app.use(express.json())

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) =>
   res.json(notes)
);

app.post('/api/notes', (req, res) => {
  req.body.id = uuidv4();
  notes.push(req.body);
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.json(notes);

});
app.delete('/api/notes/:id', (req, res) => {
  for (let i = 0; i < notes.length; i++) {
  if (notes[i].id== req.params.id) {
    notes.splice(i, 1)
  }
  }
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.json(notes);

});

app.listen(PORT, () => console.log(`App listening on  http://localhost:${PORT}`));
