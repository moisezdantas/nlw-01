import knex from 'knex';
import path from 'path';

const connection = knex({
    client: 'mysql2',
    connection: {
        host : 'vistodatabase',
        user : 'root',
        password : 'admin4infra',
        database : 'ecoleta'
    },
    useNullAsDefault: true,
});

export default connection;