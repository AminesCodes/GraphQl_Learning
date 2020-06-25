const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));



const port = process.env.PORT || '3131'
app.listen(port, () => {
    console.log('Listening on port', port);
})
