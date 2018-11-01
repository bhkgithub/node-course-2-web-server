const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const mypromise = require('./my-promise');

const app = express();
const isUnderMaintainace = false;

app.set('veiw engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCopyrightYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
});

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log('Unable to append log.');
    });
    next();
});

app.use((req, res, next) => {
    if (isUnderMaintainace) {
        res.render('maintainace.hbs');
    } else {
        next();
    }
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    mypromise.getValue(0)
        .then((data) => {
            console.log(data);
        })
        .catch((errorMessage) => {
            console.log(errorMessage);
        });
    console.log('Finish');
    res.send('Hello Aai!');
});

app.get('/home', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000...');
});