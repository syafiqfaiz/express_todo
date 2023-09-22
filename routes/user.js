var express = require('express');
var router = express.Router();


var { Client } = require('pg')

const client = new Client({
  connectionString: 'postgresql://postgres:kgM5tKKfRg-Nh6E@db.klufrvpkklawzukwotej.supabase.co:5432/postgres'
})

client.connect((err) => {
  if (err) {
    console.log(err);

    return
  }

  console.log('db is connected')}
)



router.get('/', async function(req, res) {
  try {
    var query = await client.query('SELECT * FROM users')
  } catch (err){
    console.log(err);
  }
  

  res.render('users/index', {users: query.rows});
});

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('users/register');
});

router.post('/register', async function(req, res, next) {
  // create user
  try {
    const response = await client.query(
      'INSERT INTO users (name, username, password) VALUES ($1, $2, $3) RETURNING *',
      [req.body.name, req.body.username, req.body.password]
    )
    const user = response.rows[0]
    // redirect to login
    res.redirect('/users/login?user=' + user.name);
    return
  } catch (err){
    console.log(err);
  }
});

router.get('/login', async function(req, res) {
  const user = req?.query?.user
  const error = req?.query?.error
  res.render('users/login', {name: user, error: error});
});

router.post('/login', async function(req, res) {
  // validate user
  // kita check ada tak di database, user yg sama username
  await client.query('SELECT * FROM users WHERE username = $1', [req.body.username])
    .then((response) => {
      const user = response.rows[0]
      if (!user) {
        res.redirect('/users/login?error=invalid username');
        return
      } else if (user.password === req.body.password) {

        req.session.user = user
        req.session.dataKitaSendiri = 'hai'
        req.session.save(function(err) {
          // session saved
        })
        res.redirect('/todos?user=' + user.name);
        return
      } else {
        res.redirect('/users/login?error=invalid password');
        return
      }
    })
    .catch((err) => {
      debugger
    })
  // kalau ada, check password sama tak
  // else kita redirect ke login
  // if valid, redirect to todo
  // if invalid, redirect to login with error message
  // res.send('respond with a resource');
});


module.exports = router;
