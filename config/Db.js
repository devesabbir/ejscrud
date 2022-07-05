const mongoose = require('mongoose');

const URL = 'mongodb+srv://devesabbir:<password>@cluster0.wyeww.mongodb.net/?retryWrites=true&w=majority'
const option = {
    user:'devesabbir',
    pass:'RAg3CHuwPr.kEUK',
    autoIndex: true,
}

const Db = async () => {
    try {
      const db = await mongoose.connect(URL, option);
      console.log(`Mongoose Connected to ${db.connection.host}`); 
    } catch (error) {
        console.log(error);
    }
}

module.exports = Db; 