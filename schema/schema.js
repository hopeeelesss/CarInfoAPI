const graphql = require('graphql');
const _ = require("lodash");
const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
} = graphql;

const cars = [
    {
        id: "1",
        title: "Mark 2 НЕ бит не крашен",
        brand: "Toyota",
        price: 666666,
        age: 1
    },
    {
        id: "2",
        title: "Вишневая семерка",
        brand: "ВАЗ",
        price: 50000,
        age: 5
    },
    {
        id: "3",
        title: "Гелик гусейна гасанова",
        brand: "Mercedes-Benz",
        price: 10000000,
        age: 7
    }];

const CarInfoType = new GraphQLObjectType({
    name:'CarInfo',
    fields: () =>({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        brand: {type: GraphQLString},
        price: {type: GraphQLInt},
        age: {type: GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        info:{
            type: GraphQLString,
            resolve(parent, args){
                return "Сервер запущен"
            }
        },
        car:{
            type: CarInfoType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return _.find(cars, {id: args.id});
            }
        },
        cars:{
            type: new GraphQLList(CarInfoType),
            resolve(parent, args) {
                return cars;
            }
        }
    }
});

const Mutations = new GraphQLObjectType({
    name: 'Mutations',
    fields:{
        addcar: {
            type: CarInfoType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                title: {type: new GraphQLNonNull(GraphQLString)},
                brand: {type: GraphQLString},
                price: {type: new GraphQLNonNull(GraphQLInt)},
                age: {type: GraphQLInt}
            },
            resolve(parent, args) {
                const arrLength = cars.push(args);
                return cars [arrLength - 1];
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
});