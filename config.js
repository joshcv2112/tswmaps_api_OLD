// TODO - figure out how to configure different envs... use env files?
const host = process.env.TSWDBHOST_DEV;
const user = process.env.TSWDBUSER_DEV;
const password = process.env.TSWDBPASSWORD_DEV;
const database = process.env.TSWDB_DEV;

const config = {
    db: {
      host: host,
      user: user,
      password: password,
      database: database,
      connectTimeout: 60000
    },
    listPerPage: 10,
  };
  
  module.exports = config;