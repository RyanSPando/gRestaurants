module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgres://localhost:5432/grestaurants',
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  },
};
