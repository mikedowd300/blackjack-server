const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const deck = require('./models/deck.model');
const defaultConditions = require('./utilities/default-conditions');

app.use(bodyParser.json());
app.use(cors({origin: "http://localhost:3000"}));

app.get('/single-screen', (req, res) => res.json({ deck, defaultConditions }));

app.listen(8090, () => console.log('blackjack server is listening on 8090...'));
