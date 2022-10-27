const express = require('express');
const{ graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const app = express(); // инициализация объекта приложения
const port = 1234; // номер порта
//выполнение серий функций req,res при совпадении корневого пути
app. use('/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    }))
app.listen(port); // прослушиваем порт 1234