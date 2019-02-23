const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(cors({origin: "http://localhost:3000"}));

let nextId = 2;
let data = [
  {
    id: "0",
    name: 'Unites States of America',
    capital: 'Washington D.C.',
    languages: ['English'],
    flag: 'http://www.all-flags-world.com/country-flag/USA/flag-usa-XL.jpg',
  },
  {
    id: "1",
    name: 'Peru',
    capital: 'Lima',
    languages: ['Spanish', 'Aymara', 'Quechua'],
    flag: 'http://www.all-flags-world.com/country-flag/Peru/flag-peru-XL.jpg',
  },
];

app.post('/delete/:id', (req, res) => {
  if(!data[req.params.id]) {
    res.json({error: {message: "THAT ID DOES NOT EXIST"}});
  }
  data = data.filter(datum => datum.id !== req.params.id);
  res.json(data);
});

app.post('/deleteAll', (req, res) => {
  data = [];
  nextId = 0;
  res.json(data);
});

app.post('/update/:id', (req, res) => {
  if(!data[req.params.id]) {
    res.json({error: {message: "THAT ID DOES NOT EXIST"}});
  }
  data[req.params.id] = {...data[req.params.id], ...req.body};
  res.json(data);
});

app.get('/:id', (req, res) => res.json( !data[req.params.id]
  ? {error: {message: "THAT ID DOES NOT EXIST"}}
  : data[req.params.id]
));

app.get('/', (req, res) => res.json(data));

app.post('/', (req, res) => {
  data.push({...req.body, id: (nextId++).toString()});
  res.json(data)
});

app.listen(8090, () => console.log('listening on 8090...'));
