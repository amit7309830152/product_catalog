
const Sequelize = require('sequelize');

export class Db {
    public static dbConnect() {
        const dbConnection = new Sequelize('product_catalog', 'postgres', 'root', {
            host: 'localhost',
            dialect: 'postgres',
            operatorsAliases: false,

            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
        });
        return dbConnection
    }
}
