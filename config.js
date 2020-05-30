module.exports = {
  // eslint-disable-next-line radix
  PORT: parseInt(process.env.PORT) || 3000,
  DATABASE_URL: 'mongodb://localhost:27017/newexplorerdb',

  // eslint-disable-next-line radix
  JWT_SECRET: process.env.JWT_SECRET || 'JWT_SECRET',

};
