const express = require('express')
const path = require('path');
// const morgan = require('morgan')
const handlebars = require('express-handlebars');
const route = require('./src/routes')
const app = express()
const port = process.env.PORT || 3004

app.use(express.static(path.join(__dirname,'src','public')))
console.log(__dirname)

// config handlebars
app.engine('hbs', handlebars({
    extname: '.hbs',
}
));
app.set('view engine', '.hbs');

// set lại route handlebars
app.set('views', path.join(__dirname, 'src','resources', 'views'));
// cho phép http hiển thị json kiểu uncorder
app.use(express.urlencoded())


// route init
route(app)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})