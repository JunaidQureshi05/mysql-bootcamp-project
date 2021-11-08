const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '9156560407',
  database: 'join_us',
});

db.connect((err) => {
  if (err) throw err;
  console.log('database connected');
});
app.get('/', function (req, res) {
  var q = 'SELECT COUNT(*) as count FROM users';
  db.query(q, function (error, results) {
    if (error) throw error;
    let count = results[0].count;
    res.render('home', { count });
  });
});
app.post('/register', (req, res) => {
  let user = req.body;
  db.query('INSERT INTO users set?', user, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.redirect('/');
  });
});

app.listen(3000, () => {
  console.log('server started on port 3000');
});
