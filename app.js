const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sessionsRouter = require('./src/routers/sessionsRouter');
const adminRouter = require('./src/routers/adminRouter');
const PORT = process.env.PORT || 3000;
const app = express();



app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.set('views', "./src/views");
app.set('view engine', 'ejs');

app.use('/sessions', sessionsRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
    res.render("index", { title: 'globomantics', data: ['a', 'b', 'c'] });
});

app.listen(PORT, () => {
    debug(`listening on port ${chalk.white(PORT)}`);
});