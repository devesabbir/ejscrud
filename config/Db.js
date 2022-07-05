const mongoose = require('mongoose');
require('dotenv').config()

const Db = async () => {
    try {
      const db = await mongoose.connect(process.env.DB_STRING);
      console.log(`Mongoose Connected to ${db.connection.host}`); 
    } catch (error) {
        console.log(error);
    }
}

module.exports = Db; 