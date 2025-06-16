var express = require('express');
const app = express();
app.use(express.json());
app.set('view engine', 'ejs');

const URL = process.env.BACKEND_URL || 'http://localhost:8000/api';
//const URL = 'http://localhost:8000/api';

const fetch = (...args) =>
        import('node-fetch').then(({default: fetch}) => fetch(...args));

app.get('/', async function(req, res) {
        const options = {
                method: 'GET'
        };
        fetch(URL, options)
                .then(res => res.json())
                .then(json => console.log(json))
                .catch(err => console.error('error:' + err));
        try {
                let response = await fetch(URL, options);
                response = await response.json();
        res.render('register', response)
        } catch (err) {
                console.log(err);
                res.status(500).json({msg: `Internal Server Error.`});
        }
});

// Handle registration form submission
app.post('/register', function(req, res) {
  var { username, password } = req.body;
  res.send(`User registered successfully!`);
});

app.listen(3000, function() {
    console.log('Ares listening on port 3000!');
});
