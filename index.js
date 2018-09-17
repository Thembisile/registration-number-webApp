const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const pg = require("pg");
const Registry = require('./routes/reg.js')
const Reg_numbers = require('./services/registrations')
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://seandamon:Thando2008@localhost:5432/registration';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

let registrationNum = Reg_numbers(pool);
let regRoute = Registry(registrationNum)


let app = express();

app.use(session({
    secret: 'keyboard us3rs',
    resave: false,
    saveUninitialized: true
}));

app.engine('handlebars', exphbs(
    {
        defaultLayout: 'main'
    }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(flash());
app.use(session({
    secret: "bill",
    resave: false,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', regRoute.home)
app.post('/reg_numbers', regRoute.RegAddition)

app.post('/registrationnumber', async function (req, res) {
    try {
        let townsFilter = req.body.townRadio;

        if (townsFilter === 'All ') {
            res.redirect('/');
        }

        if (townsFilter === 'CA ') {
            outcome = await pool.query('SELECT id FROM towns WHERE reg=$1', ['CA ']);
            let result = outcome.rows[0].id;
            console.log(result);
            let townID = await pool.query('SELECT reg_numbers FROM reg WHERE town_id=$1', [result]);
            let reg = townID.rows;
            res.render('home', { reg })
        }
        if (townsFilter === 'CJ ') {
            outcome = await pool.query('SELECT id FROM towns WHERE reg=$1', ['CJ ']);
            let result = outcome.rows[0].id;
            console.log(result);
            let townID = await pool.query('SELECT reg_numbers FROM reg WHERE town_id=$1', [result]);
            let reg = townID.rows;
            res.render('home', { reg })
        }
        if (townsFilter === 'CY ') {
            outcome = await pool.query('SELECT id FROM towns WHERE reg=$1', ['CY ']);
            let result = outcome.rows[0].id;
            console.log(result);
            let townID = await pool.query('SELECT reg_numbers FROM reg WHERE town_id=$1', [result]);
            let reg = townID.rows;
            res.render('home', { reg })
        }
        if (townsFilter === 'CAW ') {
            outcome = await pool.query('SELECT id FROM towns WHERE reg=$1', ['CAW ']);
            let result = outcome.rows[0].id;
            console.log(result);
            let townID = await pool.query('SELECT reg_numbers FROM reg WHERE town_id=$1', [result]);
            let reg = townID.rows;
            res.render('home', { reg })
        }

    }
    catch (err) {
        res.send(err.stack)
    }
})

app.post('/clear', async function (req, res) {
    await pool.query('delete from reg;');
    res.redirect('/')
})


let PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
    console.log('App running on port', PORT);
});