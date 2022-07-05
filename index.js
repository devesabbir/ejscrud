const express = require('express'); //
const app = express();
require('dotenv').config();
const port = '5050';
const path = require('path');
const router = require('./routes/StudentsRoutes');
const expressLayouts = require('express-ejs-layouts');
require('./config/Db')()

app.set('view engine' , 'ejs')
app.set('layout','layouts/app') 
app.use(expressLayouts)

app.use('/assets', express.static(path.join(__dirname, 'assets')));


app.use('/students', router)

app.listen(port, function (error) {
  error ? console.log(error) : console.log(`Server is listening on http://localhost:${port}`)
})