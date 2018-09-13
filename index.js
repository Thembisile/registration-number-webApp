const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const pg = require("pg");
// const Registry = require('./routes/reg.js')
// const RegNumbers = require('./services/registrations')
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

// let reg = RegNumbers(pool);
// let regRoute = Registry(reg)

app.get('/', async function (req, res) {
    let reg = await pool.query('SELECT regnumbers FROM reg;');
    let registrationNum = reg.rows;
    res.render('home', { registrationNum });
});
app.post('/reg_numbers', async function (req, res) {
    let reg = req.body.textField;;
    let RegNum = reg.toUpperCase();
    let code = RegNum.substring(0, 3).trim();

    if (reg.startsWith('CJ ') || reg.startsWith('CA ') || reg.startsWith('CY ') || reg.startsWith('CAW ')) {
        let outcome = await pool.query('SELECT * FROM reg WHERE regnumbers=$1', [RegNum]);
        if (outcome.rowCount === 0) {
            let regCode = await pool.query('SELECT id FROM towns WHERE reg=$1', [code]);
            result = await pool.query('INSERT INTO reg (regnumbers, reg) VALUES ($1, $2)', [RegNum, regCode.rows[0].id]);
        }
    }
    if (RegNum === '') {
        req.flash('info', 'Please Insert Registration Number To Add :')
    }
    res.redirect('/')
});


app.post('/clear', async function (req, res) {
    await pool.query('delete from reg;');
    res.redirect('/')
})


let PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
    console.log('App running on port', PORT);
});