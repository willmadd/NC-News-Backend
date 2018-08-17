process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

const test = {
    DB_URL :'mongodb://localhost:27017/nc_news_test'
};

const dev = {
    DB_URL: 'mongodb://localhost:27017/nc_news'
}

const config = {test, dev};

module.exports = config[process.env.NODE_ENV];