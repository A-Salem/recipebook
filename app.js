
const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cons = require('consolidate'),
      dust = require('dustjs-helpers'),
      {Pool, Client} = require('pg'),
      app = express();


// DB Connect String
const connect = "postgress://eduonix:11111111@localhost/recipebookdb";

// Assign Dust Engine To .dust Files
app.engine('dust', cons.dust);

// Set Default Ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

// Set Public Folder
app.use(express.static(path.join(__dirname + '/public')));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  const client = new Client({
    connectionString: connect
  })

  await client.connect();

  let result = await client.query('SELECT * FROM recipes');
  res.render('index', {
    recipes: result.rows
  });
  await client.end();

});

app.post('/add', async (req, res) => {
  let reqBody = req.body;

  const client = new Client({
    connectionString: connect
  })

  await client.connect();

  let result = await client.query('INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3)',
      [reqBody.name, reqBody.ingredients, reqBody.directions]);

  res.redirect('/');
  await client.end();

});

app.post('/edit', async (req, res) => {
  let reqBody = req.body;

  const client = new Client({
    connectionString: connect
  })

  await client.connect();

  let result = await client.query('UPDATE recipes SET name=$1, ingredients=$2, directions=$3 WHERE id=$4',
      [reqBody.name, reqBody.ingredients, reqBody.directions, reqBody.id]);

  res.redirect('/');
  await client.end();

});

app.delete('/delete/:id', async (req, res) => {

  const client = new Client({
    connectionString: connect
  })

  await client.connect();

  let result = await client.query('DELETE FROM recipes WHERE id=$1',
      [req.params.id]);

  res.sendStatus(200);
  await client.end();

});

// Server
app.listen('3000', () => {
  console.log('Server Started On Port 3000');
})
