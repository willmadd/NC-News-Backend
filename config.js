process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

const test = {
    DB_URL :'mongodb://localhost:27017/nc_news_test'
};

const dev = {
    DB_URL: 'mongodb://localhost:27017/nc_news'
}

const production= {
    DB_URL: 'mongodb://will1:password1@ds125372.mlab.com:25372/nc_news_will'
    }

const config = {test, dev, production};

module.exports = config[process.env.NODE_ENV];