const config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite3',
    },
    migrations: {
      directory: './src/database/migrations',
    },
    useNullAsDefault: true,
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/test.sqlite3',
    },
    migrations: {
      directory: './src/database/migrations',
    },
    useNullAsDefault: true,
  }
};

module.exports = config;
export default config;