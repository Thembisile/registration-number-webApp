const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const pg = require("pg");
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://seandamon:Thando2008@localhost:5432/user_greeted';

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

app.get('/', async function(req, res){
    res.render('home')
})










let PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
    console.log('App running on port', PORT);
});