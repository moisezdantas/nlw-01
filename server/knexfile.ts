import path from 'path';

module.exports = {
    client: 'mysql2',
    connection: {
        host : 'localhost',
        user : 'root',
        password : 'root',
        database : 'ecoleta'
    },
    migrations: {
        directory : path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory : path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true,
};