const mongoose = require('mongoose');

// --------------------- 1 ------------------------
const connect = () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }
  // ------------------- 2 -------------------------
  mongoose.connect('mongodb://eonji:e0j6k2o5!@localhost:27017/admin', {
    dbName: 'tskMongo',
    useNewUrlParser: true,
    useCreateIndex: true,
  }, (error) => {
    if (error) {
      console.log('몽고디비 연결 에러', error);
    } else {
      console.log('몽고디비 연결 성공');
    }
  });
};

// ---------------------- 3 --------------------------
mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  connect();
});
// ---------------------------------------------------

module.exports = connect;
