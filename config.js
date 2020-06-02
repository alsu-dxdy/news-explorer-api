module.exports = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: 'mongodb://localhost:27017/newexplorerdb',

  JWT_SECRET: process.env.JWT_SECRET || 'JWT_SECRET',

};
