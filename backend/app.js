require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const mngConfig = { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
};
// Need to copy link from mlab.com and replace username, password, port and database name
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PSW}@${process.env.DB_NAME_LINK}-cuhui.mongodb.net/${process.env.DB_NAME_LINK}?retryWrites=true&w=majority`;
mongoose.connect(uri, mngConfig);
mongoose.connection.once('open', () => {
    console.log('Successfully connected to cloud database');
})


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
