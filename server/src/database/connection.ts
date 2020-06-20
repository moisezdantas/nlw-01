import knex from 'knex';
import path from 'path';

const connection = knex({
    client: 'mysql2',
    connection: {
        host : 'localhost:3306',
        user : 'root',
        password : 'root',
        database : 'ecoleta'
    },
    useNullAsDefault: true,
});

export default connection;